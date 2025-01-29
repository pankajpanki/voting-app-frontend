import React, { useState, useEffect, useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import { Link, useNavigate } from "react-router-dom";
import { Header } from '../Common/Header';
import { Loader } from '../Common/Loader';
import { TopSlider } from './TopSlider';
import SpecialCasesAccordian from './SpecialCasesAccordian';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';

// Define the structure of a Voting Option object
interface VotingMethod {
	id: string;
	title: string;
	description: string;
	location: string;
	requirements: string;
	date: string;
	image_url: string;
	content: string;
}

interface PollingStationSpecialCases {
	id: string;
	title: string;
	content: string;
}

interface FunFactsQuestion {
	id: string;
	question: string;
	answer: string;
}

function FinalCheckList() {
	const navigate = useNavigate();
	const { selectedUVM, specialcaseFAQ, selectedFunFact } = useVotingStore();
	const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
	//Voting Method Section
	const [votingmethods, setVotingMethods] = useState<VotingMethod[]>([]);
	const [selectedvotingmethods, setSelectedVotingMethods] = useState<VotingMethod[]>([]);
	const [vmloading, setVMLoading] = useState<boolean>(true);
	//Voting Special Cases
	const [specialCases, setSpecialCases] = useState<PollingStationSpecialCases[]>([]);
	const [selectedspecialcases, setSelectedSpecialCases] = useState<PollingStationSpecialCases[]>([]);
	const [selectedoptions, setSelectedOptions] = useState<string[]>([]);
	const [scloading, setSCLoading] = useState<boolean>(true);
	//Voting Fun Facts
	const [questions, setQuestions] = useState<FunFactsQuestion[]>([]);
	const [selectedquestions, setSelectedQuestions] = useState<FunFactsQuestion[]>([]);
	const [ffloading, setFFLoading] = useState<boolean>(true);
	
	const fetchedVotingMethod = useRef(false);
	const fetchedStationSpecialCases = useRef(false);
	const fetchedQuestion = useRef(false);

	useEffect(() => {
		if (!fetchedVotingMethod.current) {
			getAllVotingMethod();
			fetchedVotingMethod.current = true;
		}
		
		if (!fetchedStationSpecialCases.current) {
			getAllSpecialCase();
			fetchedStationSpecialCases.current = true;
		}
		
		if (!fetchedQuestion.current) {
			getFunFactQuestion();
			fetchedQuestion.current = true;
		}
		
		return () => {
			fetchedVotingMethod.current = false;
			fetchedStationSpecialCases.current = false;
			fetchedQuestion.current = false;
		};
		
	}, []);
	
	const getAllVotingMethod = async() => {
		try {
			setVMLoading(true);
			const response = await axiosInstance({
				url: "voting-method/get-all",
				method: "GET",
			});
			
			let voting_methods = response.data.data || [];
			if(voting_methods.length > 0){
				setVotingMethods(voting_methods);
				const filteredVotingMethod = voting_methods.filter((item: VotingMethod, index: number) => selectedUVM.includes(item.id));
				setSelectedVotingMethods(filteredVotingMethod);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setVMLoading(false);
		}
	}
	
	const getAllSpecialCase = async () => {
		setSCLoading(true); // Ensure the loader is shown before the request
		try {
			const response = await axiosInstance({
				url: "polling-station/faq/get-all",
				method: "GET",
			});
			let special_cases = response.data.data || [];
			if(special_cases.length > 0){
				setSpecialCases(special_cases);
				const filteredSpecialCases = special_cases.filter((item: PollingStationSpecialCases, index: number) => specialcaseFAQ.includes(item.id));
				setSelectedSpecialCases(filteredSpecialCases);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setSCLoading(false);
		}
	};
	
	const getFunFactQuestion = async () => {
		setFFLoading(true);
		try {
			const response = await axiosInstance({
			  url: "fun-facts/get-all",
			  method: "GET",
			});
			//console.log('response', response);
			setQuestions(response.data.data || []);
			let questions = response.data.data || [];
			if(questions.length > 0){
				setQuestions(questions);
				const filteredFunFact = questions.filter((item: FunFactsQuestion, index: number) => selectedFunFact.includes(item.id));
				setSelectedQuestions(filteredFunFact);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setFFLoading(false);
		}
	};
	
	return (
		<main className="container" ref={targetRef}>
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={true} total_steps={6} current_step={6} title="Final Checklist"/>
						{/* Content Area */}
						<div className="card mt-2 border-0">
							<div className="row px-3 p-1">
								<div className="col-12">
									<div className="p-3">
										<TopSlider />
									</div>
									<div>
										<h6 className="mt-3 mb-3 fc-title">You’re Ready to Vote</h6>
										<p className="fc-sub-title">Here’s your custom voting prep summary for your reference.</p>
										<h4 className="mt-4 mb-3 fc-section-title">Voting Methods</h4>
										<p className="fc-section-sub-title">Here’s how you plan to vote:</p>
										<div>
											{vmloading ? (
												<Loader />
											) : (
												<div>
													{selectedvotingmethods.map((option, index) => (
														<div className="mb-3 d-flex flex-row align-items-center">
															<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
																<img src={option.image_url} width='22px' height='22px' alt={option.title} />
															</div> 
															<p className="ms-3 mb-0 fc-list-item">{option.title}</p>
														</div>
													))}
												</div>
											)}
										</div>
										<p className="mt-4 fc-section-sub-title">Unselected Method:</p>
										<p className="mt-1 mb-2 fc-list-item">Remember, you can always vote on Election Day if plans change.</p>
									</div>
									<hr />
									<div>
										<h4 className="mt-4 mb-3 fc-section-title">Polling Station</h4>
										<p className="fc-section-sub-title">Find where to vote:</p>
										<div>
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/station-locator.png" width='22px' height='22px' alt="" />
												</div> 
												<Link to="https://www.elections.ca/" className="ms-3 mb-0 fc-link" target={"_blank"}>Polling Station Locator</Link>
											</div>
										</div>
										<h6>Take a look at the special cases you selected:</h6>	
										{scloading ? (
											<Loader />
										) : (
											<SpecialCasesAccordian showcheckbox={false} showicon={true} specialCases={selectedspecialcases} selectedoptions={selectedoptions} setSelectedOptions={setSelectedOptions} />
										)}
										<h6>Reminder:</h6>
										<p className="mt-1">Don’t forget to check your polling station and hours before heading out.</p>
									</div>
									<hr />
									<div>
										<h4 className="mt-4 mb-3 fc-section-title">ID Requirements</h4>
										<p className="fc-section-sub-title">Make sure you bring the right ID:</p>
										<div className="mt-3">
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/govt-issue-id.png" width='22px' height='22px' alt="" />
												</div>
												<div>	
													<strong className="ms-3 mb-0">Option 1</strong>
													<p className="ms-3 mb-0">Government-issued photo ID with your name and address</p>
												</div>
											</div>
											<p className="text-center" style={{ marginTop: '0px', marginBottom: '0px' }}>OR</p>
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/two-piece-id-icon.png" width='22px' height='22px' alt="" />
												</div> 
												<div>
													<strong className="ms-3 mb-0">Option 2</strong>
													<p className="ms-3 mb-0">Two pieces of ID showing your name, one with your address</p>
												</div>
											</div>
											<p className="text-center" style={{ marginTop: '0px', marginBottom: '0px' }}>OR</p>
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/no-id-icon.png" width='22px' height='22px' alt="" />
												</div> 
												<div>
													<strong className="ms-3 mb-0">Option 3</strong>
													<p className="ms-3 mb-0">No ID? Ask someone you know who is voting at the same place to vouch for you.</p>
												</div>
											</div>
										</div>
									</div>
									<hr />
									<div>
										<h4 className="mt-4 mb-3 fc-section-title">Final Preparation Checklist</h4>
										<p className="fc-section-sub-title">Before Election Day, remember to:</p>
										<div className="list-unstyled mb-3">
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/vote-early-icon.png" width='22px' height='22px' alt="" />
												</div> 
												<p className="ms-3 mb-0">Mark your calendar for [Election Day or advance polling dates].</p>
											</div>
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/id-icon-final.png" width='22px' height='22px' alt="" />
												</div> 
												<p className="ms-3 mb-0">Prepare your ID and voter registration card.</p>
											</div>
											<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
												<div className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background">
													<img src="/assets/watch-icon.png" width='22px' height='22px' alt="" />
												</div> 
												<p className="ms-3 mb-0">Double-check polling station hours.</p>
											</div>
										</div>
									</div>
									<hr />
									{!ffloading && selectedquestions.length > 0 ? (
										<div>
											<h4 className="mt-4 mb-3 fc-section-title">Fun Facts Recap</h4>
											<p className="fc-section-sub-title">Did you know?</p>
											{ffloading ? (
												<Loader />
											) : (
												<div className="list-unstyled mb-3">
												  {selectedquestions.map((item, index) => (
													<div className="mb-3 fps-info-info d-flex flex-row align-items-center">
													  <div 
														className="rounded-circle d-flex align-items-center justify-content-center final-checklist-background my-3"
														style={{ minWidth: '32px', minHeight: '32px', width: '32px', height: '32px', overflow: 'hidden', flexShrink: 0 }} // Ensure the container stays at 40px
													  >
														<img 
														  src="/assets/question-icon.png" 
														  alt="Question Icon" 
														  style={{ width: '22px', height: '22px', objectFit: 'contain' }} // Ensures image fits within the container
														/>
													  </div>
													  <div className="ms-4">
														<p className="mb-0"><strong>Question: </strong>{item.question}</p>
														<p className="mb-0"><strong>Answer: </strong>{item.answer}</p>
													  </div>
													</div>
												  ))}
												</div>
											)}
										</div>
									) : (
										null
									)}	
								</div>
							</div>
						</div>
						{/*<div className="p-1">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/complete-feedbck")} style={{ marginBottom: '0px' }}>
								NEXT
							</button>
						</div>
						<div className="p-1">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/")} style={{ marginTop: '0px' }}>
								REPLAY
							</button>
						</div>*/}
						<div className="row p-3 mt-auto">
							<div className="col-12">
								<button className="next-button btn w-100 py-3 mb-3 button-text" onClick={() => navigate("/complete-feedbck")}>NEXT</button>
								<button className="next-button-two btn w-100 py-3 button-text" onClick={() => navigate("/")}>REPLAY</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main> 
	);
}

export default FinalCheckList;