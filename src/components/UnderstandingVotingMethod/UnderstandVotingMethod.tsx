import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../Common/Header';
import { VotingModal } from './VotingModal';
import { Loader } from '../Common/Loader';
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

const UnderstandVotingMethod = () => {
    const navigate = useNavigate();
	const { selectedUVM, viewedUVM, addOrUpdateSelectedUVM, addOrUpdateViewedUVM } = useVotingStore();
	const [currentIndex, setCurrentIndex] = useState<string>('');
	const [votingOptions, setVotingOptions] = useState<VotingMethod[]>([]);
	const [modal, setModalOpen] = useState<boolean>(false);
	const [modalIndex, setModalIndex] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const hasFetchedData = useRef(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "voting-method/get-all",
					method: "GET",
				});
				setVotingOptions(response.data.data || []);
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

	const setSelectedOption = (value: string) => {
		if(!selectedUVM.includes(value)){
			addOrUpdateSelectedUVM('add', value);
		}
		setModalOpen(false);
		setCurrentIndex('');
	};

	const setModalClose = () => {
		setModalOpen(false);
	};
	
	const handleModelOpen = (itemId: string) => {
		setModalIndex(itemId);
		setModalOpen(true);
	}
	
	const toggleFlip = (index: string) => {
		if(index !== currentIndex){
			setCurrentIndex(index);
		}else{
			setCurrentIndex('');
		}
		if(!viewedUVM.includes(index)){
			addOrUpdateViewedUVM(index);
		}
	};
	
	const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>, itemId: string) => {
		event.stopPropagation(); // Prevent the event from propagating to the parent
		//console.log('checkbox item id', itemId)
		if (!selectedUVM.includes(itemId)) {
			addOrUpdateSelectedUVM('add', itemId);
		}else{
			addOrUpdateSelectedUVM('remove', itemId);
		}
	};
	
	const getCurrentOption = () => {
		if(modalIndex !== ''){
			let filter = votingOptions.filter((item: VotingMethod) => {
				return item.id === modalIndex;
			})
			if(filter.length > 0){
				return filter[0];
			}else{
				return {title: '', description: '', location: '', requirements: '', date: '', image_url: '', content: '',};
			}
		}
		return {title: '', description: '', location: '', requirements: '', date: '', image_url: '', content: '',};
	}
	
	return (
		<>
			<main className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
						<div className="content-area">
							{/* Top Header */}
							<Header showprogress={true} total_steps={6} current_step={2} title="Understanding Voting Methods" subtitle="Explore voting options by flipping the cards. Select the method you&apos;re interested in—it&apos;s quick and easy!" disclaimer="These are the modules that need to be completed"/>
							{/* Content Area */}
							<div className="">
								{loading ? (
									<Loader />
								) : votingOptions.length === 0 ? (
									<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
								) : (
									<div>
										{votingOptions.map((option, index) => (
											<div key={option.id} style={{ perspective: "1000px" }} onClick={() => toggleFlip(option.id)}>
												<div className={`card mb-3 border-0 flip-card ${currentIndex === option.id ? 'flipped' : ''}`}>
													{/* Front of the card */}
													<div className="flip-card-front">
														<div className="d-flex justify-content-end v-m-check">
															<div className="custom-checkbox">
																<label className="checkbox-container">
																	<input
																		type="checkbox"
																		checked={selectedUVM.includes(option.id)}
																		onMouseDown={(event) => event.stopPropagation()}
																		onClick={(event) => {
																			event.stopPropagation(); // Prevent this click from bubbling to the parent
																			handleCheckboxClick(event, option.id);
																		}}
																	/>
																	<span className="checkmark-round-tab"></span>
																</label>
															</div>
														</div>
														<div className={`d-flex flex-column align-items-center justify-content-center mt-3`}>
															<div className="rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#0A0F1F', width: '70px', height: '70px' }}>
																<img src={option.image_url} alt={option.title} />
															</div>
															<h6 className="vm-card-title mt-2 mb-0">{option.title}</h6>
														</div>
													</div>
													{/* Back of the card */}
													<div className="flip-card-back">
														<div>
															<div className="mb-2 d-flex align-items-center">
																<label className="vm-info-title me-2">What it is:</label>
																<span className="vm-info-text mb-0">{option.description}</span>
															</div>
															<div className="mb-2 d-flex align-items-center">
																<label className="vm-info-title me-2">Date:</label>
																<span className="vm-info-text mb-0">{option.date}</span>
															</div>
															<div className="mb-2 d-flex align-items-center">
																<label className="vm-info-title me-2">Location:</label>
																<span className="vm-info-text mb-0">{option.location}</span>
															</div>
															<div className="mb-2 d-flex align-items-center">
																<label className="vm-info-title me-2">Requirements:</label>
																<span className="vm-info-text mb-0">{option.requirements}</span>
															</div>
														</div>
														{option.content !== 'N/A' && (
															<button className="btn w-100 py-2 mt-2 vm-detail-button" onClick={() => handleModelOpen(option.id)}>MORE DETAILS</button>
														)}
													</div>
												</div>
											</div>
										))}
										{/*{(viewedUVM.length === votingOptions.length || selectedUVM.length > 0) && (
										<div className="p-1">
											<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/understand-feedback")}>
												Continue
											</button>
										</div>
										)}*/}
										<div className="p-1">
											<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/understand-feedback")}>
												Continue
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>	
		  </main>
		  {/* Voting Modal */}
		  <VotingModal
			selectedData={getCurrentOption()}
			currentIndex={currentIndex}
			isOpen={modal}
			onClose={setModalClose}
			setSelected={setSelectedOption}
		  />
		</>
	);
};

export default UnderstandVotingMethod;