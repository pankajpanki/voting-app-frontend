import React from 'react';
import { useNavigate } from "react-router-dom";
import { Dot, CircleAlert } from 'lucide-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ReactPlayer from 'react-player';
import { Header } from '../Common/Header';
import useVotingStore from '../../redux/store';

function FindPollingStation() {
	const { videoFullyWachted, addOrUpdateVideoFullyWachted } = useVotingStore();
	const navigate = useNavigate();
	const handleReady = () => {
		console.log('Media is ready');
	};

	const handleStart = () => {
		console.log('Media starts playing');
	};

	const handleEnd = () => {
		console.log('Media has ended');
		if(!videoFullyWachted){
			addOrUpdateVideoFullyWachted(true);
		}
	};
	const videoUrl = 'https://www.youtube.com/watch?v=kB2_pZAc2eM';  // Replace with your desired YouTube URL
	
	//console.log('videoFullyWachted', videoFullyWachted);
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={true} total_steps={6} current_step={3} title="Find My Polling Station"/>
						{/* Content Area */}
						{/* Video Section */}
						<div className='player-wrapper'>
							<ReactPlayer onReady={handleReady} onStart={handleStart} onEnded={handleEnd} className='react-player' url={videoUrl} width="100%" height="100%" controls={true}/>
						</div>
						{/* Introduction */}
						<div className="card mt-2">
							<div className="row px-3 rounded p-1">
								<div className="col-12">
									<h6 className="mt-3 mb-3 fps-info-title">Introduction</h6>
									<ul className="list-unstyled mb-3">
										<li className="ms-3 mb-2 fps-info-info">
											<Dot /> Where do you vote? Finding your polling station will be quick and easy!
										</li>
										<li className="ms-3 mb-2 fps-info-info">
											<Dot /> We{"'"}ll guide you to the right resources to ensure you{"'"}re ready on Election Day.
										</li>
									</ul>
									<p className="fps-info-subtitle">Do you want to learn about voting when a voter is</p>
								</div>
							</div>
						</div>
						<div className="p-1">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/polling-special-cases")}>
								CLICK TO LEARN MORE
							</button>
						</div>
						<div className="p-1 mt-3">
							<OverlayTrigger
								placement="top"
								delay={{ hide: 450, show: 300 }}
								overlay={(props) => (
									<Tooltip {...props} className="tooltip-disclaimer">
										<>
											<h4 className="disclaimer-title">Why Not Include the Search Here?</h4>
											<p className="disclaimer-info">This game does NOT collect personal information! Instead, we’ll guide you to Elections Canada’s official website to find your polling station. For convenience, the link will also be included in your final checklist!</p>
										</>
								  </Tooltip>
								)}
							>
								<div className="disclaimer">
									Disclaimer <CircleAlert size={20} className="ms-1"/>
								</div>
							</OverlayTrigger>
						</div>
					</div>
				</div>
			</div>
		</main> 
	);
}

export default FindPollingStation;