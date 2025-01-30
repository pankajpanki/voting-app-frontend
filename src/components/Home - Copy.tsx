import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 position-relative content-area-main-home">
					<div className="">
						{/* Top Header */}
						<div className="p-1 text-center mt-5">
							{/* Map and Bear Images */}
							<div className="map-container position-relative">
								<div>
								<img src="/assets/canada_blank_map.png" className="map-image" alt="Canada-Blank-Map" />
								</div>
								<img src="/assets/canada_bear.png" className="bear-image" alt="Canada-Bear" />
							</div>
						</div>
						{/* Content Area */}
						<div className="">
							<div className="text-center p-3">
								<h2 className="mt-2 home-title">VoteReady</h2>
								<h5 className="home-sub-title">Get ready for the 45th Federal Election</h5>
								<p className="mb-4 home-date-title">Date to be announced!</p>
								<p className="mb-0 home-info-text">This game will guide you through the voting process, so you’re informed and ready to participate in the upcoming Federal Election. Your participation matters!</p>
								<div className="p-1">
									<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/begin-journey")}>GET STARTED</button>
								</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</main>
	);
}

export default Home;