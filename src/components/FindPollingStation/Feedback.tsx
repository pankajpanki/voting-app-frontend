import { useNavigate } from "react-router-dom";
import useVotingStore from '../../redux/store';
import { Header } from '../Common/Header';

function Feedback() {
	const navigate = useNavigate();
	const { videoFullyWachted, gamifiedQuizPlayed } = useVotingStore();
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						{/* Top Header */}
						<Header showprogress={false} total_steps={0} current_step={0} title=""/>
						{/* Content Area */}
						<div className="feedback-main-container">
							<div className="feedback-custom-card">
								<div className="feedback-custom-card-top">
									<h5 className="feedback-title">Feedback</h5>
								</div>
								<div className="feedback-custom-card-content">
									<div className="text-center p-2">
										<div className="mb-2">
											<div className="d-inline-block">
												<div className="p-4">
													<img src="/assets/silver-badge.png" alt="Silver Badge" height="210px" width="172px"/>
												</div>
											</div>
										</div>
										{videoFullyWachted || gamifiedQuizPlayed ? (
											<>
												<h4 className="mb-3 feedback-badge">Polling Pro</h4>
												<p className="mb-4 feedback-text">You re eligible to vote! Let s explore the must knows for you to vote during this upcoming election.</p>
											</>
										):(
											<p></p>
										)}
									</div>
								</div>
							</div>
							<div className="feedback-custom-card mt-3">
								<div className="feedback-custom-card-top">
									<h5 className="feedback-title">Summary</h5>
								</div>
								<div className="feedback-custom-card-content">
									<div className="p-2">
										<p className="feedback-summery-text mb-3">Great. You know how to locate your polling station using Elections Canada s official tools.</p>
										<p className="feedback-summery-text mb-0">We ve also included this link in your final checklist for easy access when you need it.</p>
										<div className="p-1">
											<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate('/id-check-list')}>NEXT MODULE</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Feedback;