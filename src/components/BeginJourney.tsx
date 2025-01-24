import React from 'react';
import { useNavigate } from "react-router-dom";
import { ModuleItem } from './Common/ModuleItem';

const tabs = [
	{ imgSrc: '/assets/eligibility-icon.png', title: 'Eligibility Determination' },
	{ imgSrc: '/assets/votting-method-icon.png', title: 'Understanding Voting Methods' },
	{ imgSrc: '/assets/poling-station-icon.png', title: 'Find My Polling Station' },
	{ imgSrc: '/assets/id-icon.png', title: 'What ID to bring' },
	{ imgSrc: '/assets/fun-fact.png', title: 'Election Fun Facts' },
	{ imgSrc: '/assets/final-checklist-icon.png', title: 'Final Checklist' },
];

function BeginJourney() {
	const navigate = useNavigate();
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main-journey">
					<div className="">
						{/*Top Header*/}
						<div className="mb-5 mt-5">
							<p className="text-center begin-info-text" >
								This app will give you a complete understanding <br/>of the following:
							</p>
						</div>
						{/*Content Area*/}
						<div className="p-3">
							<div className="mb-4">
								{tabs.map((item, index) => (
									<ModuleItem key={index} imgSrc={item.imgSrc} title={item.title} />
								))}
							</div>
							<div className="p-1">
								<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/eligibility-check")}>GET STARTED</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>  
	);
}

export default BeginJourney;