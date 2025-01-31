import React from 'react';
import { useNavigate } from "react-router-dom";
import { ModuleItem } from './Common/ModuleItem';
import { Header } from "./Common/Header";

/*const tabs = [
	{ imgSrc: '/assets/eligibility-icon.png', title: 'Eligibility Determination' },
	{ imgSrc: '/assets/votting-method-icon.png', title: 'Understanding Voting Methods' },
	{ imgSrc: '/assets/poling-station-icon.png', title: 'Find My Polling Station' },
	{ imgSrc: '/assets/id-icon.png', title: 'What ID to bring' },
	{ imgSrc: '/assets/fun-fact.png', title: 'Election Fun Facts' },
	{ imgSrc: '/assets/final-checklist-icon.png', title: 'Final Checklist' },
];*/

const tabs = [
	{ imgSrc: '/assets/icons-bullseye.png', title: 'Customize Your Checklist:' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Confirm eligibility' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Choose how you want to vote' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Find your polling station' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Consider the ID you’ll bring' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Discover fun facts' },
];

function BeginJourney() {
	const navigate = useNavigate();
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main-journey">
					<div className="mb-3">
						{/* Top Header */}
						<Header showprogress={false} total_steps={0} current_step={0} title="Get Ready to Vote – Your Way!" subtitle="This interactive tool helps you create a personalized voting checklist in just a few minutes."/>
						{/*Content Area*/}
						<div className="p-3">
							<div className="mb-4">
								{tabs.map((item, index) => (
									<ModuleItem key={index} imgSrc={item.imgSrc} title={item.title} />
								))}
							</div>
							<p className="text-center mb-0">At the end, you’ll get a customized checklist based on your choices!</p>
							<div className="p-1">
								<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/eligibility-check")}>LET’S GET STARTED!</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>  
	);
}

export default BeginJourney;