import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../Common/Header';
import { QuestionCard } from '../Common/QuestionCard';
import { Loader } from '../Common/Loader';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';

// Define the structure of a question object
interface Question {
	id: string;
	question: string;
	options: string[];
	answer: number;
	correct_feedback: string;
	incorrect_feedback: string;
}

function GamifiedQuiz() {
	const { gamifiedQuiz, addOrUpdateGamifiedQuiz, addOrUpdateGamifiedQuizPlayed } = useVotingStore();
	const navigate = useNavigate();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currentStep, setCurrentStep]       = useState(1);
	const [correctSeleted, setCorrectSeleted] = useState('');
	const [loading, setLoading] = useState<boolean>(true);
	const hasFetchedData = useRef(false);
  
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "polling-station/gamified-quiz/get-all",
					method: "GET",
				});
				setQuestions(response.data.data);
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
  
	
	//Set the selected option for the current question
	const setSelectedOption = (value: string) => {
		addOrUpdateGamifiedQuiz(value, currentStep - 1);
		setCorrectSeleted('');
	};
	
	//function to check if correct option is selected for question
	const checkSelected = () => {
		//check if answer is correct or not
		var check_from = questions[currentStep - 1];
		//console.log('check_from options', check_from.options);
		var options = check_from.options;
		var selectedOption = gamifiedQuiz[currentStep - 1];
		//console.log('options', options)
		//console.log('selectedOption', selectedOption)
		let answer_index = options.findIndex(obj => obj === selectedOption);
		//console.log('answer_index', answer_index)
		if(answer_index === check_from.answer){
			setCorrectSeleted('yes');
		}else{
			setCorrectSeleted('no');
		}
	}
  
	//function to handle next question or to next step
	const handleNext = () => {
		if (correctSeleted !== '' && correctSeleted === 'yes') {
			const totalQuestions = questions.length;
			if (currentStep === totalQuestions) {
				//Update state when quiz is complete
				addOrUpdateGamifiedQuizPlayed(true);
				//All questions answered, navigate to feedback page
				navigate("/special-cases-feedback")
			} else {
				setCurrentStep((prev) => Math.min(prev + 1, totalQuestions));
				setSelectedOption('');
				setCorrectSeleted('');
			}
		}
	};

	const currentQuestion = questions[currentStep - 1];
	
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={true} total_steps={6} current_step={3} title="Gamified Quiz"/>
						{/* Content Area */}
						<div className="question-card-custom">
							{loading ? (
								<Loader />
							) : questions.length === 0 ? (
								<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
							) : (
								<div>
									<QuestionCard
									  question={currentQuestion.question}
									  options={currentQuestion.options}
									  currentQuestion={currentStep}
									  totalQuestions={questions.length}
									  selectedOption={gamifiedQuiz[currentStep - 1]}
									  onOptionSelect={setSelectedOption}
									/>
									<div className="d-flex flex-column gap-2">
										{correctSeleted !== '' && (
											<div className={`${correctSeleted === 'yes' ? 'alert alert-success' : 'alert alert-danger'}`} role="alert">
												{/*<h6 className="alert-heading">{correctSeleted === 'yes' ? 'Correct!' : 'Not quite!'}</h6>*/}
												<p>{correctSeleted === 'yes' ? currentQuestion.correct_feedback : currentQuestion.incorrect_feedback}</p>
											</div>
										)}
										<div className="p-1">
											{(correctSeleted === '' || correctSeleted === 'no') ? (
												<button className="next-button btn w-100 py-3 rounded-4 fw-bolder" onClick={checkSelected} disabled={gamifiedQuiz[currentStep - 1] === undefined}>
													CHECK ANSWERS
												</button>
											):(
												<button className="next-button btn w-100 py-3 rounded-4 fw-bolder" onClick={handleNext} disabled={gamifiedQuiz[currentStep - 1] === undefined}>
													NEXT QUESTION
												</button>
											)}
										</div>
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

export default GamifiedQuiz ;