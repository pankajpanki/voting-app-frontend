import React from 'react';
import { CircleAlert } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function PageNotFound() {
	const navigate = useNavigate();
	return (
		<main className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
					<div className="content-area">
						<div className="feedback-main-container">
							<div className="">
								{/*Top Header*/}	
								<div className="h-20 p-4 p-md-5 text-center">
									<div className="d-flex align-items-center justify-content-center text-white">
										<span className="display-1 fw-bold top-title">4</span>
										<CircleAlert size={80}/>
										<span className="display-1 fw-bold top-title">4</span>
									</div>
								</div>
								{/*Content Area*/}
								<div className="h-80" style={{ marginTop: '10px' }}>
									<div className="p-3">
										<div className="text-center" >
											<p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
											<p className="">The page you’re looking for doesn’t exist.</p>
											<div className="p-1">
												<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/")}>Go Home</button>
											</div>
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

export default PageNotFound;