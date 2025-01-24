import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import { Loader } from '../Common/Loader';
import { Header } from '../Common/Header';
import { QuizConfirmModal } from './QuizConfirmModal';
import SpecialCasesAccordian from './SpecialCasesAccordian';
import useVotingStore from '../../redux/store';
import axiosInstance from "../../helper/axiosInstance";

// Define the structure of a faq object
interface PollingOptionFaq {
	id: string;
	title: string;
	content: string;
}

interface PollingOptionFaq {
	id: string;
	title: string;
	content: string;
}

function SpecialCases() {
  const navigate = useNavigate();
	const { addOrUpdateSpecialCaseFAQ } = useVotingStore();
	const [specialCases, setSpecialCases] = useState<PollingOptionFaq[]>([]);
	const [selectedoptions, setSelectedOptions] = useState<string[]>([]);
	const [checklistadded, setChecklistAdded] = useState<boolean>(false);
	const [openSection, setOpenSection] = useState<string | null>(''); 
	const [modal, setModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const hasFetchedData = useRef(false);
	
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "polling-station/faq/get-all",
					method: "GET",
				});
				setSpecialCases(response.data.data || []);
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
	
	const addToMyCheckList = () => {
		if (selectedoptions.length > 0) {
			// Update the state in the store
			addOrUpdateSpecialCaseFAQ(selectedoptions);
		}else{
			const ids = specialCases.map(item => item.id);
			addOrUpdateSpecialCaseFAQ(ids);
		}
		setChecklistAdded(true);
		// Reset checklist added state after 5 seconds
		setTimeout(() => {
			setChecklistAdded(false);
		}, 5000);
		setModalOpen(true);
	}
  
	const setSelectedOption = (value: string) => {
		//console.log('modal selected value', value)
		if(value === 'yes'){
			navigate('/gamified-quiz');
		}else{
			navigate('/special-cases-feedback')
		}
	};
	
	const setModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<main className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
						<div className="content-area">
							{/* Top Header */}
							<Header showprogress={true} total_steps={6} current_step={3} title="Special cases"/>
							{/* Content Area */}
							<div className="question-card-custom">
								<div className="col-12">
									{loading ? (
										<Loader />
									) : specialCases.length === 0 ? (
										<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
									) : (
										<SpecialCasesAccordian showcheckbox={true} specialCases={specialCases} selectedoptions={selectedoptions} setSelectedOptions={setSelectedOptions} />
									)}	
								</div>
							</div>
							{/* Success Message */}
							{!loading && checklistadded && (
								<div className="row p-3 mt-2">
									<div className="alert alert-success" role="alert">
										<h6 className="alert-heading">Added!</h6>
										<p>Selected item added to your checklist successfully</p>
									</div>
								</div>
							)}
							{/* Action Buttons */}
							{!loading && (
								<div className="row p-3 mt-auto">
									<div className="col-12">
										<button className="next-button btn fw-bold w-100 mb-3 py-3 button-text" onClick={() => addToMyCheckList()}>ADD TO MY CHECKLIST</button>
										<button className="btn btn-link text-dark fw-bold w-100 button-text" onClick={() => navigate('/gamified-quiz')}>SKIP FOR NOW</button>
									</div>
								</div>
							)}	
						</div>
					</div>
				</div>
			</main>
			<QuizConfirmModal isOpen={modal} onClose={setModalClose} setSelected={setSelectedOption}/>
		</>	
	);
}

export default SpecialCases;