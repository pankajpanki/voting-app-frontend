import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { EmailShareButton, FacebookShareButton, RedditShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { Header } from '../Common/Header';
import { Loader } from '../Common/Loader';
import PDFCheckList from './PDFCheckList';
import axiosInstance from "../../helper/axiosInstance";
import useVotingStore from '../../redux/store';



function Feedback() {
	const navigate = useNavigate();
	const [isContentReady, setIsContentReady] = useState(false);
	const hashtags = [
		'#CanadaElection2025',
		'#Election2025',
		'#VoteCanada2025',
		'#YourVoteMatters2025',
		'#MakeYourVoiceHeard',
		'#CanadaVotes2025',
		'#GetOutAndVote2025',
		'#ShapeTheFutureCanada',
		'#VoteForChange2025',
		'#CanadaElectionMatters'
	];
    const urlToShare = "http://localhost:3000/final-check-list";  // Example URL
	const share_title = "Get Ready for the Canada Election 2025 – Make Your Voice Heard!";
	const share_description = "Your vote matters! Share this and encourage everyone to stay informed and participate in the upcoming Canada Election 2025.";
	
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={true} total_steps={6} current_step={7} title="Your Voting Plan: Complete." subtitle="Explore voting options by flipping the cards. Select the methods you’re interested in—it’s quick and easy!"/>
						<div className="feedback-main-container">
							<div className="feedback-custom-card">
								<div className="feedback-custom-card-top"><h5 className="feedback-title">Feedback</h5></div>
								<div className="feedback-custom-card-content">
									<div className="text-center p-2">
										<div className="mb-2">
											<div className="d-inline-block">
												<div className="p-2"><img src="/assets/silver-badge.png" alt="Silver Badge" height="210px" width="172px"/></div>
											</div>
										</div>
										<h4 className="mb-3 feedback-badge">Prepared to Vote</h4>
										<p className="mb-2 feedback-text">You’re fully prepared for voting day! Great work.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="p-1">
							<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate('/save-as-pdf')}>SAVE AS PDF</button>
						</div>
						<div className="mt-4 text-center">
							<h6>Share Via</h6>
							<div className="mt-3 d-flex justify-content-center gap-3 flex-wrap">
								{/* Facebook Share Button */}
								<FacebookShareButton url={urlToShare} hashtag={hashtags[0]}>
									<img src="/assets/facebook-icon.png" alt="facebook-icon" className="share-icon" />
								</FacebookShareButton>
								{/* Twitter Share Button */}
								<TwitterShareButton title={share_title} url={urlToShare} hashtags={hashtags}>
									<img src="/assets/x-icon.png" alt="x-icon" className="share-icon" />
								</TwitterShareButton>
								{/* Whatsapp Share Button */}
								<WhatsappShareButton title={share_title} url={urlToShare}>
									<img src="/assets/whatsapp-icon.png" alt="whatsapp-icon" className="share-icon" />
								</WhatsappShareButton>
								{/* Reddit Share Button */}
								<RedditShareButton title={share_title} url={urlToShare}>
									<img src="/assets/reddit-icon.png" alt="Reddit Icon" className="share-icon" />
								</RedditShareButton>
								{/* Email Share Button */}
								<EmailShareButton subject={share_title} body={share_description} url={urlToShare}>
									<img src="/assets/mail-share-icon.png" alt="mail-icon" className="share-icon" />
								</EmailShareButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Feedback;