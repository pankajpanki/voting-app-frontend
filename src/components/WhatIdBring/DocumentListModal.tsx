import React, { useState, useEffect } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import parse from 'html-react-parser';
import { Loader } from '../Common/Loader';
import axiosInstance from "../../helper/axiosInstance";

interface VotingModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface VotingDocumentList {
	id: string;
	title: string;
	documents: string;
}

export const DocumentListModal: React.FC<VotingModalProps> = ({ isOpen, onClose }) => {
	const [openSection, setOpenSection] = useState<string | null>(null);
	const [documentLists, setDocumentLists] = useState<VotingDocumentList[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await axiosInstance({
				  url: "voting-document/list/get-all",
				  method: "GET",
				});

				if (isMounted) {
				  setDocumentLists(response.data.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (isOpen) {
			setLoading(true); // Show loading state when the modal opens
			setDocumentLists([]); // Reset previous data if needed
			fetchData(); // Fetch data every time the modal opens
		} else {
			setLoading(false); // Hide loader if modal is closed
		}

		return () => {
			isMounted = false;
		};
	}, [isOpen]);
	
	if (!isOpen) return null;

	const toggleSection = (section: string) => {
		setOpenSection(openSection === section ? null : section);
	};

	const handleClose = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setTimeout(onClose, 400); // Wait for the animation to complete
		}
	};

	return (
		<>
			<div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }} onClick={handleClose}></div>
			<div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex={-1}>
				<div className="modal-dialog custom-modal-width modal-dialog-centered">
					<div className="modal-content modal-lg border-0" style={{ backgroundColor: "transparent" }}>
						<button type="button" className="position-absolute end-0 m-3 vm-modal-close close-position-id" aria-label="Close" style={{ marginTop: "-37px" }} onClick={() => {setTimeout(onClose, 400);}}>
						  <X size={24} />
						</button>
						<div className="modal-body p-4 mt-2">
							<div className="card rounded-5 p-3">
								<div>
									{!loading ? (
										<h5 className="find-modal-title mb-3 ms-3">List of Accepted ID</h5>
									) : (
										null
									)}
								</div>
								<div>
									{loading ? (
										<Loader />
									) : documentLists.length === 0 ? (
										<div className="no-content-found"><p className="">No content found. Please try again later.</p></div>
									) : (
										<div className="accordion">
											{documentLists.map((item, index) => (
												<div key={item.id} className={`accordion-item ${documentLists.length > index + 1 ? "border-bottom" : "" }`}>
													<button className="btn w-100 d-flex align-items-center justify-content-between p-3" onClick={() => toggleSection(item.id)} >
														<span className="find-modal-list-title">{item.title}</span>
														{openSection === item.id ? ( <Minus size={20} /> ) : ( <Plus size={20} /> )}
													</button>
													<div className={`accordion-content ${openSection === item.id ? "open" : ""}`} style={{ maxHeight: openSection === item.id ? `${document.getElementById(item.id)?.scrollHeight}px` : "0", overflow: "hidden", transition: "max-height 0.4s ease", }} id={item.id}>
														<div className="p-3 pt-0">{parse(String(item.documents))}</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};