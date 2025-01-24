import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../Common/Header';
import { Loader } from '../Common/Loader';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';

// Define the structure of a Voting Option object
interface VotingOption {
	id: string;
	title: string;
	description: string;
	location: string;
	requirements: string;
	date: string;
	image_url: string;
	content: string;
}

interface UserFeedbackInt {
	badge: string;
	feedback: string;
	earned_by: string;
}

function Feedback() {
	const navigate = useNavigate();
	const { selectedUVM } = useVotingStore();
	const [votingOptions, setVotingOptions] = useState<VotingOption[]>([]);
	const [userback, setUserback]   = useState<UserFeedbackInt>({ badge: '', feedback: '', earned_by: '' });
	const [loading, setLoading]     = useState<boolean>(true);
	const [feedbackloading, setFeedbackLoading] = useState<boolean>(true);
	const hasFetchedFeedback = useRef(false);
	const hasFetchedUserback = useRef(false);

	useEffect(() => {
		if (!hasFetchedFeedback.current) {
			getAllVotingMethod();
			hasFetchedFeedback.current = true;
		}
		
		if (!hasFetchedUserback.current) {
			getAllVotingMethodFeedback();
			hasFetchedUserback.current = true;
		}

		return () => {
			hasFetchedFeedback.current = false;
			hasFetchedUserback.current = false;
		};
	}, []);
	
	const getAllVotingMethod = async() => {
		try {
			const response = await axiosInstance({
				url: "voting-method/get-all",
				method: "GET",
			});
			setVotingOptions(response.data.data || []);
			//let filteredVotingOptions = response.data.data.filter((item: VotingOption) => selectedUVM.includes(item.id));
			//setUserOptions(filteredVotingOptions);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setFeedbackLoading(false);
		}
	}
	
	const getAllVotingMethodFeedback = async () => {
		try {
			const response = await axiosInstance({
				url: "voting-method/feedback/get-all",
				method: "GET",
			});
			// Initialize check_user_feedback with default values
			let check_user_feedback = { badge: '', feedback: '', earned_by: '' };
			// Cast response data to an array of UserFeedbackInt objects
			const feedbacks: UserFeedbackInt[] = response.data.data;
			// Check if selectedUVM is empty
			if (selectedUVM.length === 0) {
				if (feedbacks.length > 0) {
					// Correctly filter based on 'earned_by'
					let filtered_data = feedbacks.filter((item: UserFeedbackInt) => item.earned_by === 'all_open');
					check_user_feedback = filtered_data[0] || check_user_feedback;  // Set the first result or default if empty
				}
			} else {
				if (feedbacks.length > 0) {
					// Handle case when selectedUVM has one or more values
					if (selectedUVM.length === 1) {
						let filtered_data = feedbacks.filter((item: UserFeedbackInt) => item.earned_by === 'single_selected');
						check_user_feedback = filtered_data[0] || check_user_feedback;
					} else if (selectedUVM.length === 2 || selectedUVM.length > 2) {
						let filtered_data = feedbacks.filter((item: UserFeedbackInt) => item.earned_by === 'two_selected');
						check_user_feedback = filtered_data[0] || check_user_feedback;
					}
				}
			}
			// Update the state with the selected feedback
			setUserback(check_user_feedback);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	
	const filteredVotingOptions = votingOptions.filter((item, index) => selectedUVM.includes(item.id));
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={false} total_steps={0} current_step={0} title=""/>
						{/* Content Area */}
						<div className="feedback-main-container">
							<div className="feedback-custom-card">
								<div className="feedback-custom-card-top">
									<h5 className="feedback-title">Feedback</h5>
								</div>
								<div className="feedback-custom-card-content">
									{feedbackloading ? (
										<Loader />
									) : userback.badge === '' ? (
											<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
									) : (
										<div className="text-center p-2">
											<div className="mb-2">
												<div className="d-inline-block">
													<div className="p-2">
														<img src="/assets/silver-badge.png" alt="Silver Badge" height="210px" width="172px"/>
													</div>
												</div>
											</div>
											<h4 className="feedback-badge mb-4">{userback.badge}</h4>
											<p className="feedback-text mb-2">{userback.feedback}</p>
										</div>
									)}
								</div>
							</div>
							<div className="feedback-custom-card mt-3">
								<div className="feedback-custom-card-top">
									<h5 className="feedback-title">Summary</h5>
								</div>
								<div className="feedback-custom-card-content">
									{loading ? (
										<Loader />
									) : votingOptions.length === 0 ? (
											<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
									) : (
										<div className="p-2">
											<div className="p-2">
												<p className="feedback-summery-title">You’ve selected the method(s) you’re considering:</p>
												<ul className="list-unstyled mb-4">
													{filteredVotingOptions.map((method, index) => (
													  <li key={index} className="feedback-summery-text mb-2 ms-3">
														• {method.title}
													  </li>
													))}
												</ul>
												<p className="feedback-summery-text mb-1">At the end of the game, we’ll provide a personalized checklist summarizing your choices to help you get ready.</p>
												<div className="p-1">
													<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate('/find-my-polling-station')}>NEXT MODULE</button>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Feedback;