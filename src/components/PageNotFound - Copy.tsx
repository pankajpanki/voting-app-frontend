import React from 'react';
import { CircleAlert } from 'lucide-react';
import { Link } from "react-router-dom";

function PageNotFound() {
	return (
		<main className="container">
			<div className="row justify-content-center">
			  <div className="col-12 col-md-8 col-lg-6">
				 {/*Top Header*/}	
				  <div className="h-20 p-4 p-md-5 text-center">
					<div className="d-flex align-items-center justify-content-center">
						<span className="display-1 fw-bold">4</span>
						<CircleAlert size={80}/>
						<span className="display-1 fw-bold bsb-flip-h">4</span>
					</div>
				  </div>
				  {/*Content Area*/}
				  <div className="h-80">
					  <div className="p-3">
							<div className="">
								<div className="text-center">
									<p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
									<p className="lead">
										The page you’re looking for doesn’t exist.
									</p>
									<Link className="btn btn-primary" to="/">Go Home</Link>
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