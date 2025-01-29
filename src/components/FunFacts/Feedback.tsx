import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Loader } from '../Common/Loader';
import { Header } from '../Common/Header';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';

// Define the structure of a feedback object
interface FeedbackInt {
	badge: string;
	feedback: string;
	earned_by: string;
}

interface UserFeedbackInt {
	badge: string;
	feedback: string;
	earned_by: string;
}

// Define the structure of a Fun Fact object
interface FunFactsQuestion {
	id: string;
	question: string;
	answer: string;
}

function Feedback() {
	const navigate = useNavigate();
	const { selectedFunFact, viewedFunFact, funFactShowMore, checkListFunFact } = useVotingStore();
	const [questions, setQuestions] = useState<FunFactsQuestion[]>([]);
	const [feedbacks, setFeedbacks] = useState<FeedbackInt[]>([]);
	const [userback, setUserback] = useState<UserFeedbackInt>({ badge: '', feedback: '', earned_by: '' });
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
  
	useEffect(() => {
		const fetchFeedbackData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "fun-facts/feedback/get-all",
					method: "GET",
				});
				//console.log('response', response)
				setFeedbacks(response.data.data);
				getFunFactFeedback();
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false); // Ensure the loader is hidden after the request
			}
		};
		
		const fetchFunFactData = async () => {
			try {
				const response = await axiosInstance({
				  url: "fun-facts/get-all",
				  method: "GET",
				});
				//console.log('response', response);
				setQuestions(response.data.data || []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
			}
		};

		if (!hasFetchedData.current) {
			fetchFeedbackData();
			fetchFunFactData();
			hasFetchedData.current = true;
		}

		return () => {
			hasFetchedData.current = false; // Reset ref if the component unmounts
		};
		
	}, []);
  
	useEffect(() => {
		getFunFactFeedback();
	}, [feedbacks]);
  
	/* Check eligibility based on selected answers and match against criteria */
	const getFunFactFeedback = () => {
		//console.log('viewedFunFact.length', viewedFunFact.length)
		//console.log('questions.length', questions.length)
		for (let i = 0; i < feedbacks.length; i++) {
			const feedback = feedbacks[i];
			if(feedback.earned_by === 'viewed_every_question' && (viewedFunFact.length === questions.length && questions.length > 0)){
				console.log('viewed_every_question');
				setUserback(feedback);
			}else if(feedback.earned_by === 'one_clicked' && (viewedFunFact.length === 1 && checkListFunFact.length === 0 && !funFactShowMore)){
				console.log('one_clicked');
				setUserback(feedback);
			}else if(feedback.earned_by === 'add_to_ckecklist_once' && checkListFunFact.length > 0){
				console.log('add_to_ckecklist_once');
				setUserback(feedback);
			}else if(feedback.earned_by === 'show_more_selected_once' && (funFactShowMore && checkListFunFact.length === 0 && !funFactShowMore)){
				console.log('show_more_selected_once');
				setUserback(feedback);
			}
		}
		// Default to the last feedback
		//var default_feedback = feedbacks[feedbacks.length - 1];
		//console.log('default_feedback', default_feedback);
		//setUserback(default_feedback);
	};
  
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
								<div className="feedback-custom-card-top"><h5 className="feedback-title">Feedback</h5></div>
								<div className="feedback-custom-card-content">
									{loading ? (
										<Loader />
									) : feedbacks.length === 0 ? (
											<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
									) : (
										<div className="text-center p-2">
											<>
											{userback.badge !== '' ? (
												<div className="mb-2">
													<div className="d-inline-block">
														<div className="p-2">
															<img src="/assets/silver-badge.png" alt="Silver Badge" height="210px" width="172px"/>
														</div>
													</div>
												</div>
											) : (
												<div className="mb-2">
													<div className="d-inline-block">
														<div className="p-2">
															<p>No Feedback</p>
														</div>
													</div>
												</div>
											)}	
											</>
											<h4 className="mb-3 feedback-badge">{userback?.badge}</h4>
											<p className="mb-2 feedback-text">{userback?.feedback}</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<p className="mt-5 mb-2 feedback-text">Now that you’ve explored these facts, let’s move on to your voting checklist!</p>
						<div className="p-1">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate('/final-check-list')}>NEXT MODULE</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Feedback;