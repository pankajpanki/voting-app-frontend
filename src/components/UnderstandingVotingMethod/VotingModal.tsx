import React from "react";
import { X } from 'lucide-react';
import parse from 'html-react-parser';

interface SelectedData {
	image_url: string;
	title: string;
	description: string;
	date: string;
	location: string;
	requirements: string;
	content: React.ReactNode;
}

interface VotingModalProps {
	selectedData: SelectedData;
	currentIndex: string;
	isOpen: boolean;
	onClose: () => void;
	setSelected: (selectedIndex: string) => void;
}

export const VotingModal: React.FC<VotingModalProps> = ({ selectedData, currentIndex, isOpen, onClose, setSelected }) => {
	//console.log('selectedData', selectedData)
	// Temporarily render the modal regardless of the exit state
	if (!isOpen /* && animationClass === "modal-exit" */) return null;

	const handleClose = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setTimeout(onClose, 400); // Wait for the animation to complete
		}
	};

	const handleSelection = (index: string) => {
		setSelected(index);
	};
	
	return (
		<>
			{/* Modal Overlay */}
			<div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }} onClick={handleClose}></div>
			{/* Modal */}
			<div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex={-1}>
				<div className="modal-dialog custom-modal-width modal-dialog-centered">
					<div className="modal-content modal-lg border-0" style={{ backgroundColor: 'transparent' }}>
						{/* Close Button */}
						<button type="button" className="position-absolute end-0 m-3 vm-modal-close" aria-label="Close" onClick={() => {setTimeout(onClose, 400); }}><X size={24}/></button>
						<div className="modal-body mt-5">
							<div className="card rounded-5 p-3">
								{/* Header */}
								<div className="d-flex align-items-center gap-3 mb-4">
									<div className="rounded-circle p-3">
										<img src="/assets/vote-icon.png" alt="" style={{ width: '30px', height: '30px' }}/>
									</div>
									<h5 className="vm-modal-title mb-0">{selectedData.title || "Untitled Option"}</h5>
								</div>
								{/* Details */}
								<div className="mb-4">
									<div className="mb-3 d-flex align-items-center">
										<label className="vm-info-title me-2">What it is:</label>
										<p className="vm-info-text mb-0">{selectedData.description || "No description available"}</p>
									</div>
									<div className="mb-3 d-flex align-items-center">
										<label className="vm-info-title me-2">Date:</label>
										<p className="vm-info-text mb-0">{selectedData.date || "N/A"}</p>
									</div>
									<div className="mb-3 d-flex align-items-center">
										<label className="vm-info-title me-2">Location:</label>
										<p className="vm-info-text mb-0">{selectedData.location || "N/A"}</p>
									</div>
									<div className="mb-3 d-flex align-items-center">
										<label className="vm-info-title me-2">Requirements:</label>
										<p className="vm-info-text mb-0">{selectedData.requirements || "N/A"}</p>
									</div>
								</div>
								<hr />
								{/* Additional Information */}
								<div className="mb-2">
									{parse(String(selectedData.content))}
								</div>
							</div>
						{/* Action Button */}
						<div className="">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => handleSelection(currentIndex)}>CONTINUE</button>
						</div>
					  </div>
					</div>
				</div>
			</div>
		</>
	);
};