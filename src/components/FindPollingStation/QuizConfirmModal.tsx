import React from "react";

interface QuizConfirmProps {
	isOpen: boolean;
	onClose: () => void;
	setSelected: (selectedIndex: string) => void;
}

export const QuizConfirmModal: React.FC<QuizConfirmProps> = ({ isOpen, onClose, setSelected }) => {
	if (!isOpen) return null;

	const handleClose = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setTimeout(onClose, 400); // Wait for the animation to complete
		}
	};

	const handleSelection = (index: string) => {
		setSelected(index);
		onClose();
	};

	return (
		<>
			{/* Modal Overlay */}
			<div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }} onClick={handleClose}></div>
			{/* Modal */}
			<div className="modal fade show" tabIndex={-1}>
				<div className="modal-dialog position-fixed bottom-0 start-50 translate-middle-x mb-0 custom-modal-bottom">
					<div className="modal-content border-0 shadow modal-content-bottom">
						<div className="modal-body p-4 mt-5">
							<div className="text-center gap-3 mb-4">
								<h5 className="fw-bolder mb-0">{"Gamified Quiz"}</h5>
							</div>
							<p className="text-center gap-3 mb-4">Want to take a short quiz to test your learning?</p>
							{/* Action Button */}
							<div className="row p-3 mt-auto">
								<div className="col-12">
									<button className="next-button btn fw-bolder w-100 mb-3 py-3" onClick={() => handleSelection("yes")}>YES PLEASE</button>
									<button className="btn btn-link text-dark fw-bold w-100" onClick={() => handleSelection("skip")}>SKIP FOR NOW</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};