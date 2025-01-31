import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { LoaderNoBackground } from './Common/LoaderNoBackground';
import { ModuleItem } from './Common/ModuleItem';
import { Header } from "./Common/Header";
import axiosInstance from "../helper/axiosInstance";

/*const tabs = [
	{ imgSrc: '/assets/eligibility-icon.png', title: 'Eligibility Determination' },
	{ imgSrc: '/assets/votting-method-icon.png', title: 'Understanding Voting Methods' },
	{ imgSrc: '/assets/poling-station-icon.png', title: 'Find My Polling Station' },
	{ imgSrc: '/assets/id-icon.png', title: 'What ID to bring' },
	{ imgSrc: '/assets/fun-fact.png', title: 'Election Fun Facts' },
	{ imgSrc: '/assets/final-checklist-icon.png', title: 'Final Checklist' },
];*/

/*const tabs = [
	{ imgSrc: '/assets/icons-bullseye.png', title: 'Customize Your Checklist:' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Confirm eligibility' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Choose how you want to vote' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Find your polling station' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Consider the ID you’ll bring' },
	{ imgSrc: '/assets/icons-tick.png', title: 'Discover fun facts' },
];*/

interface JourneyData {
	id: string;
	title: string;
	subtitle: string;
	info: string;
	tab_one_title: string;
	tab_two_title: string;
	tab_three_title: string;
	tab_four_title: string;
	tab_five_title: string;
	tab_six_title: string;
	tab_one_image?: string;
	tab_two_image?: string;
	tab_three_image?: string;
	tab_four_image?: string;
	tab_five_image?: string;
	tab_six_image?: string;
}

function BeginJourney() {
	const navigate = useNavigate();
	const [journeydata, setJourneyData] = useState<JourneyData>({id: '', title: '', subtitle: '', info: '', tab_one_title: '', tab_one_image: '', tab_two_title: '', 
														tab_two_image: '', tab_three_title: '', tab_three_image: '', tab_four_title: '', tab_four_image: '', 
														tab_five_title: '', tab_five_image: '', tab_six_title: '', tab_six_image: ''});
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "content-manage/get-page-data",
					method: "POST",
					data: {page: 'start_journey'}
				});
				//console.log('response', response);
				//console.log('response.data', response.data);
				let pre_data = response.data.data;
				let journey_data: JourneyData = {
					id: pre_data.id, 
					title: pre_data.title,
					subtitle: pre_data.subtitle,
					info: pre_data.info,
					tab_one_title: pre_data.tab_one_title,
					tab_two_title: pre_data.tab_two_title,
					tab_three_title: pre_data.tab_three_title,
					tab_four_title: pre_data.tab_four_title,
					tab_five_title: pre_data.tab_five_title,
					tab_six_title: pre_data.tab_six_title,
				};
				// Conditionally add the background and main image URLs if they exist
				if (pre_data.tab_one_image) {
					journey_data.tab_one_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_one_image;
				}
				if (pre_data.tab_two_image) {
					journey_data.tab_two_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_two_image;
				}
				if (pre_data.tab_three_image) {
					journey_data.tab_three_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_three_image;
				}
				if (pre_data.tab_four_image) {
					journey_data.tab_four_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_four_image;
				}
				if (pre_data.tab_five_image) {
					journey_data.tab_five_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_five_image;
				}
				if (pre_data.tab_six_image) {
					journey_data.tab_six_image = process.env.REACT_APP_SERVER_URL + pre_data.tab_six_image;
				}
				setJourneyData(journey_data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false); // Ensure the loader is hidden after the request
			}
		};

		if (!hasFetchedData.current) {
			fetchData();
			hasFetchedData.current = true;
		}

		return () => {
			hasFetchedData.current = false; // Reset ref if the component unmounts
		};
	}, []);
	
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main-journey">
					{loading ? (
						<LoaderNoBackground />
					) : (
						<div className="mb-3 mt-3">
							{/* Top Header */}
							<Header showprogress={false} total_steps={0} current_step={0} title={journeydata.title} subtitle={journeydata.subtitle}/>
							{/*Content Area*/}
							<div className="p-3">
								<div className="mb-4">
									<ModuleItem key={1} imgSrc={journeydata?.tab_one_image} title={journeydata?.tab_one_title} />
									<ModuleItem key={2} imgSrc={journeydata?.tab_two_image} title={journeydata?.tab_two_title} />
									<ModuleItem key={3} imgSrc={journeydata?.tab_three_image} title={journeydata?.tab_three_title} />
									<ModuleItem key={4} imgSrc={journeydata?.tab_four_image} title={journeydata?.tab_four_title} />
									<ModuleItem key={5} imgSrc={journeydata?.tab_five_image} title={journeydata?.tab_five_title} />
									<ModuleItem key={6} imgSrc={journeydata?.tab_six_image} title={journeydata?.tab_six_title} />
								</div>
								<p className="text-center">{parse(String(journeydata.info))}</p>
								<div className="p-1">
									<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/eligibility-check")}>LET’S GET STARTED!</button>
								</div>
							</div>
						</div>
					)}	
				</div>
			</div>
		</main>  
	);
}

export default BeginJourney;