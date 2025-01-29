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
	condition: string[];
	condtion_question: string[];
}

interface UserFeedbackInt {
	badge: string;
	feedback: string;
	condition: string[];
	condtion_question: string[];
}

type KeyValuePair = {
  key: string;
  value: string;
};

function Feedback() {
	const navigate = useNavigate();
	const { eligibility } = useVotingStore();
	const [feedbacks, setFeedbacks] = useState<FeedbackInt[]>([]);
	const [userback, setUserback] = useState<UserFeedbackInt>({ badge: '', feedback: '', condition: [], condtion_question: [] });
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
  
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "eligibility-question/feedback/get-all",
					method: "GET",
				});
				setFeedbacks(response.data.data);
				getEligibilityFeedback();
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false); // Ensure the loader is hidden after the request
			}
		};

		if (!hasFetchedData.current) {
			fetchData();
			hasFetchedData.current = true;
		}

		return () => {
			hasFetchedData.current = false; // Reset ref if the component unmounts
		};
		
	}, []);
  
	useEffect(() => {
		getEligibilityFeedback();
	}, [feedbacks]);
  
	/* Check eligibility based on selected answers and match against criteria */
	/*const getEligibilityFeedback = () => {
		for (let i = 0; i < feedbacks.length; i++) {
			const feedback = feedbacks[i];
			//console.log('feedback', feedback)
			const condition = feedback.condition;
			const condition_question = feedback.condtion_question;
			if (condition && condition_question && condition.length === condition_question.length && condition.length > 0) {
				const mergedArray: KeyValuePair[] = condition.map((value, index) => {
					return { key: condition_question[index], value: value };
				});
				//console.log('mergedArray', mergedArray);
				const saved_array: KeyValuePair[] = eligibility.map(item => {
						if (typeof item === 'string') {
						  // If item is a string, map it to an object with a default key
						  return { key: 'default_key', value: item };
						}
						return item; // Otherwise, it's already a KeyValuePair object
					  });
				const isEligible = areArraysMatchingWithFlexibility(mergedArray, saved_array);
				if (isEligible) {
					setUserback(feedback);
				}
			} else {
			  console.error('Arrays have different lengths or are empty.');
			}
		}
		
		//If no condition match then select default
		let default_feedback = feedbacks.filter((item) => item.badge === "Democracy Explorer")
		if(default_feedback.length > 0){
			setUserback(default_feedback[0]);
		}
	};*/
	
	const getEligibilityFeedback = () => {
		for (let i = 0; i < feedbacks.length; i++) {
			const feedback = feedbacks[i];
			const condition = feedback.condition;
			const condition_question = feedback.condtion_question;

			// Ensure both arrays exist and have the same length
			if (condition && condition_question && condition.length === condition_question.length && condition.length > 0) {
				// Merge condition and condition_question arrays into KeyValuePair[] format
				const mergedArray: KeyValuePair[] = condition.map((value, index) => {
					return { key: condition_question[index], value };
				});

				// Convert eligibility array to KeyValuePair[] format if it contains strings
				const saved_array: KeyValuePair[] = eligibility.map(item => {
					if (typeof item === 'string') {
						// If the item is a string, map it to an object with a default key
						return { key: 'default_key', value: item };
					}
					return item; // Otherwise, it's already a KeyValuePair object
				});

				// Check if the merged array and saved array match with flexibility
				const isEligible = areArraysMatchingWithFlexibility(mergedArray, saved_array);
				if (isEligible) {
					setUserback(feedback);
					return; // Exit the loop once a matching feedback is found
				}
			} else {
				console.error('Arrays have different lengths or are empty.');
			}
		}

		// If no condition match, select the default feedback
		const default_feedback = feedbacks.filter(item => item.badge === "Democracy Explorer");
		if (default_feedback.length > 0) {
			setUserback(default_feedback[0]);
		}
	};
	
	// Function to check if key-value pairs match with flexibility
	const areArraysMatchingWithFlexibility = (arr1: KeyValuePair[], arr2: KeyValuePair[]) => {
		if (arr1.length !== arr2.length) {
			return false; // Arrays of different length cannot match
		}
		// Sort arrays by the key for a consistent comparison
		arr1 = arr1.sort((a, b) => a.key.localeCompare(b.key));
		arr2 = arr2.sort((a, b) => a.key.localeCompare(b.key));
		// Compare key-value pairs in both arrays
		return arr1.every((item, index) => {
			const isFlexibleMatch = item.value === 'Any'; // If value is 'Any', it's flexible
			const valueMatches = isFlexibleMatch || item.value === arr2[index].value; // Match if flexible or exact

			return item.key === arr2[index].key && valueMatches;
		});
	};
  
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={false} total_steps={0} current_step={0} title="" subtitle="" />
						{/* Content Area */}
						<div className="feedback-main-container">
							<div className="feedback-custom-card">
								<div className="feedback-custom-card-top">
									<h5 className="feedback-title">Feedback</h5>
								</div>
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
											<div className="p-1">
												<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate('/understand-voting-method')}>NEXT MODULE</button>
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