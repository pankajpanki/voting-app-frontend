import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { CircleCheck, ArrowRight, Dot } from 'lucide-react';
import { Header } from '../Common/Header';
import { Loader } from '../Common/Loader';
import axiosInstance from "../../helper/axiosInstance";
import useLongPress from "../../helper/useLongPress";
import useVotingStore from '../../redux/store';

// Define the structure of a Fun Fact object
interface FunFactsQuestion {
	id: string;
	question: string;
	answer: string;
}

const VotingFunFacts = () => {
	const navigate = useNavigate();
	const { selectedFunFact, viewedFunFact, addOrUpdateSelectedFunFact, addOrUpdateViewedFunFact, funFactShowMore, addFunFactShowMore, checkListFunFact, addOrUpdateFunFactCheckList } = useVotingStore();
	const [currentIndex, setCurrentIndex] = useState<string>(''); // To track the currently flipped card
	const [questions, setQuestions] = useState<FunFactsQuestion[]>([]);
	const [currentquestions, setCurrentQuestions] = useState<FunFactsQuestion[]>([]);
	const [pendingquestions, setPendingQuestions] = useState<FunFactsQuestion[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const hasFetchedData = useRef(false);

	const onLongPress = (event: React.MouseEvent | React.TouchEvent) => {
		console.log("Long press triggered!");
		const itemId = (event.target as HTMLElement).getAttribute('data-item-id');
		if (itemId && !selectedFunFact.includes(itemId)) {
		  console.log('Long pressed item ID:', itemId);
		  addOrUpdateSelectedFunFact(itemId); // Assuming this function expects a string as parameter
		}
	};

	const onClick = (event: React.MouseEvent | React.TouchEvent) => {
		console.log("Click triggered!");
		const itemId = (event.target as HTMLElement).getAttribute('data-item-id');
		if (itemId) {
			console.log('Clicked item ID:', itemId);
			setCurrentIndex(itemId); // Flip the clicked card
			if (!viewedFunFact.includes(itemId)) {
				addOrUpdateViewedFunFact(itemId);  // Assuming this function expects a string as parameter
			}
		}
	};

	const longPressEvents = useLongPress(onLongPress, onClick, { delay: 500 });

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance({
				  url: "fun-facts/get-all",
				  method: "GET",
				});
				//console.log('response', response);
				setQuestions(response.data.data || []);
				setPendingQuestions(response.data.data || []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (!hasFetchedData.current) {
		  fetchData();
		  hasFetchedData.current = true;
		}

		return () => {
		  hasFetchedData.current = false;
		};
	}, []);

	useEffect(() => {
		getNextRandomQuestion('inital');
	}, [questions]);

	const getNextRandomQuestion = (ques_type: string) => {
		if (pendingquestions.length > 0) {
		  if (ques_type === 'func' && !funFactShowMore) {
			addFunFactShowMore(true);
		  }
		  const copiedQuestions = [...pendingquestions];
		  const randomItems = getRandomItems(copiedQuestions, 3);
		  setCurrentQuestions(randomItems);
		  const pendingItems = pendingquestions.filter(item =>
			!randomItems.some(randomItem => randomItem.id === item.id)
		  );
		  setPendingQuestions(pendingItems);
		}
	};

	const getRandomItems = (arr: FunFactsQuestion[], numItems: number): FunFactsQuestion[] => {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr.splice(0, numItems);
	};
	
	const addItemToCheckList = () => {
		currentquestions.map((item) =>{
			if (!checkListFunFact.includes(item.id)) {
				addOrUpdateFunFactCheckList(item.id); 
			}
		})
	}
	
	const checkItemInCheckList = (id: string) => {
		if (checkListFunFact.includes(id)) {
			return true;
		}
		return false;
	}

	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={false} total_steps={6} current_step={5} title="Election Fun Facts" subtitle=""/>
						{/* Content Area */}
						<div className="">
							{loading ? (
								<Loader />
							) : questions.length === 0 ? (
								<div className="no-content-found"><p>No content found. Please try again later.</p></div>
							) : (
								<div>
									{currentquestions.length > 0 ? (
										<>
											{currentquestions.map((item) => (
												<div key={item.id} style={{ perspective: "1000px" }}>
												  <div className={`card mb-3 border-0 flip-card ${currentIndex === item.id ? 'flipped' : ''}`} style={{ backgroundColor: checkItemInCheckList(item.id) ? '#FFF9E9' : '' }}>
													<div className="flip-card-front" data-item-id={item.id} {...longPressEvents}>
														{selectedFunFact.includes(item.id) ? (
															<div className="d-flex justify-content-end v-m-check">
																<div style={{ color: "#FFC107" }}>
																	<CircleCheck color={'#ffc107'} size={24} />
																</div>
															</div>
														) : (
															<div className="d-flex justify-content-end v-m-check">
																<Dot strokeWidth={22} color="#DCDCDC"/>
															</div>
														)}
													  <div className={`d-flex flex-column align-items-center justify-content-center ${selectedFunFact.includes(item.id) ? 'mt-4' : 'mt-5'}`}>
														<h6 className="vm-card-title mt-2 mb-0">{item.question}</h6>
													  </div>
													</div>
													<div className="flip-card-back" onClick={() => setCurrentIndex('')}>
													  <div>
														<div className="mt-4 d-flex align-items-center justify-content-center">
														  <h6 className="vm-card-title mt-2 mb-0">{item.answer}</h6>
														</div>
													  </div>
													</div>
												  </div>
												</div>
											))}
										</>
									) : (
										<div className="card mb-3 border-0 flip-card">
											<div className="d-flex flex-column align-items-center justify-content-center">
												<h6 className="vm-card-title mt-2 mb-0">No More Questions Left.</h6>
											</div>
										</div>
									)}
									{pendingquestions.length > 0 && (
										<div className="p-1">
											<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => getNextRandomQuestion('func')}>
												FASCINATING. SHOW ME MORE!
											</button>
										</div>
									)}
									<div className="p-1 mt-3">
										<button className="btn w-100 py-3 border-secondary rounded-4 button-text" onClick={() => addItemToCheckList()} style={{ border: '2px solid #1B1313' }}>
											SAVE FACTS TO THE CHECKLIST
										</button>
									</div>
									<div className="p-1">
										<button className="btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/fun-fact-feedback")}>
											Skip to the Feedback <ArrowRight />
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
};

export default VotingFunFacts;