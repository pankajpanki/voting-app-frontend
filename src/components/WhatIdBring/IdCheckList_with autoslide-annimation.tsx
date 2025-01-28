import React, { useState, useEffect, useRef } from "react";
import parse from 'html-react-parser';
import { DocumentListModal } from "./DocumentListModal";
import { Header } from "../Common/Header";
import axiosInstance from "../../helper/axiosInstance";

interface VotingDocumentOption {
	id: string;
	title: string;
	content: string;
	image_url: string;
}

function IdCheckList() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [documentOptions, setDocumentOptions] = useState<VotingDocumentOption[]>([]);
	const [modal, setModalOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [animationClass, setAnimationClass] = useState(""); // For animations
	const [direction, setDirection] = useState("next"); // Track slide direction
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	let interval: NodeJS.Timeout;
  
	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await axiosInstance({
					url: "voting-document/options/get-all",
					method: "GET",
				});
				//if (isMounted) {
					setDocumentOptions(response.data.data);
					//console.log("response.data", response.data.data);
				//}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (!hasFetchedData.current) {
			setLoading(true);
			fetchData();
			hasFetchedData.current = true;
		} else {
			// Ensure the loader is turned off even if fetchData doesn't run
			setLoading(false);
		}
		return () => {
			isMounted = false;
		};
		
	}, []);
	
	// Handle the onClick event after rendering HTML
	useEffect(() => {
		// Add event listeners for all elements that need to trigger setModalOpen
		const elements = document.querySelectorAll('[data-id="modal-trigger"]');
		
		elements.forEach((element) => {
		  element.addEventListener('click', () => {
			setModalOpen(true); // Open the modal when clicked
		  });
		});

		// Cleanup the event listeners when the component unmounts or content changes
		return () => {
		  elements.forEach((element) => {
			element.removeEventListener('click', () => {
			  setModalOpen(true);
			});
		  });
		};
	}, []); // Re-run this effect whenever htmlContent changes

	const goToNextSlide = () => {
		setDirection("next");
		setAnimationClass("slide-out-left");
		setTimeout(() => {
		  setActiveSlide((prevSlide) => (prevSlide + 1) % documentOptions.length);
		  setAnimationClass("slide-in-right");
		}, 300); // Match CSS animation duration
	};

	const goToPreviousSlide = () => {
		setDirection("prev");
		setAnimationClass("slide-out-right");
		setTimeout(() => {
		  setActiveSlide(
			(prevSlide) => (prevSlide - 1 + documentOptions.length) % documentOptions.length
		  );
		  setAnimationClass("slide-in-left");
		}, 300);
	};

	const startAutoSlide = () => {
		interval = setInterval(() => {
		  if (!isHovered) {
			goToNextSlide();
		  }
		}, 5000); // 5 seconds interval
	};

	const stopAutoSlide = () => {
		clearInterval(interval);
	};

	useEffect(() => {
		startAutoSlide();
		return () => stopAutoSlide();
	}, [isHovered]);

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
				  <Header showprogress={false}
					total_steps={6}
					current_step={4}
					title="What ID to bring"
					subtitle=""
				  />
				  {/* Content Area */}
				  <div className="card p-4">
					{/* Introduction */}
					<div className="mb-4">
					 <p className="find-title mb-4">Introduction</p>
						<ul className="">
							<li className="find-check-list mb-2">Do you have the right ID to bring to vote? Let's make sure you're prepared.</li>
							<li className="find-check-list mb-2">We'll show you what ID works and what to do if you don't have the required pieces.</li>
						</ul>
						<p className="find-info-p mb-0">
							You may be surprised to learn how many ways there are to identify yourself!
						</p>
					</div>
					{/* Carousel */}
					<div id="idCarousel" className="carousel"
					  onMouseEnter={() => {
						setIsHovered(true);
						stopAutoSlide();
					  }}
					  onMouseLeave={() => {
						setIsHovered(false);
						startAutoSlide();
					  }}
					>
						<div className="carousel-inner">
							{documentOptions.map((option, index) => (
								<div key={index}
									className={`carousel-item ${
									  index === activeSlide ? "active" : ""
									} ${animationClass}`}
								>
									<div className="mb-3">
										<h6 className="find-option-title mb-3">{option.title}</h6>
										<div>{parse(String(option.content))}</div>
										<div className="text-center">
											<img src={option.image_url} alt={`ID Option ${index + 1}`}	width={320}	height={200} className="rounded-2" />
										</div>
									</div>
								</div>
							))}
						</div>
						{/* Navigation Dots */}
						<div className="carousel-indicators position-relative mb-0">
							{documentOptions.map((_, index) => (
								<button key={index} type="button"	className={`carousel-dots ${activeSlide === index ? 'bg-warning active' : ''}`} 
									onClick={() => setActiveSlide(index)} aria-label={`Slide ${index + 1}`} />
							))}
						</div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </main>
		  <DocumentListModal isOpen={modal} onClose={setModalClose} />
		</>
	);
}

export default IdCheckList;
