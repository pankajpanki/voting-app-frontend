import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { QuestionCard } from '../Common/QuestionCard';
import { Loader } from '../Common/Loader';
import { Header } from '../Common/Header';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';

// Define the structure of a question object
interface Question {
	id: string;
	question: string;
	options: string[];
}

function EligibilityCheck() {
	const { eligibility, addOrUpdateEligibility } = useVotingStore();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
			  const response = await axiosInstance({
				url: "eligibility-question/get-all",
				method: "GET",
			  });
			  setQuestions(response.data.data || []); // Safeguard in case data is null or undefined
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

	

	const handleNext = () => {
		const totalQuestions = questions.length;
		if (currentStep === totalQuestions) {
		  // All questions answered, navigate to feedback page
		  navigate("/eligibility-feedback");
		} else {
		  setCurrentStep((prev) => Math.min(prev + 1, totalQuestions));
		}
	};

	const currentQuestion = questions[currentStep - 1];
	
	// Set the selected option for the current question
	const setSelectedOption = (value: string) => {
		//addOrUpdateEligibility(value, currentStep - 1);
		//console.log("currentQuestion", currentQuestion);
		addOrUpdateEligibility(currentQuestion.id, value);
	};
	//console.log("Loading state:", loading);
	//console.log("eligibility:", eligibility);
	const checkSelectedAnswer = () => {
		const selected = eligibility.filter((item) => {
			// Ensure that item is an object and has a 'key' property
			return typeof item !== 'string' && item.key === currentQuestion.id;
		});

		if (selected.length > 0 && typeof selected[0] !== 'string') {
			// Now TypeScript knows that selected[0] is an object with 'key' and 'value'
			return selected[0].value;
		}

		return '';
	}
	
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={true} total_steps={6} current_step={1} title="Eligibility Determination" subtitle="" />
						{/* Content Area */}
						<div className="question-card-custom">
							{loading ? (
								<Loader />
							) : questions.length === 0 ? (
								<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
							) : (
								<div>
									<QuestionCard
										question={currentQuestion?.question}
										options={currentQuestion?.options}
										currentQuestion={currentStep}
										totalQuestions={questions.length}
										selectedOption={checkSelectedAnswer()}
										onOptionSelect={setSelectedOption}
									/>
									<div className="p-1">
										<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={handleNext} disabled={eligibility[currentStep - 1] === undefined}>
											{currentStep === questions.length ? 'SUBMIT ANSWERS' : 'NEXT QUESTION'}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default EligibilityCheck;