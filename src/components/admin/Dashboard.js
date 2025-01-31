import React from "react"
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'

const Dashboard = () => {

	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-10 ml-sm-auto col-lg-10" style={{ height: '100vh', marginLeft: '317px', background: 'linear-gradient(180deg, #F2F2F2 4.91%, #F2F2F2 20%,  #E9E9E9 100%)' }}>
						<div className="text center">
							<div className="p-1 text-center mt-5" >
								<h1 className="text center mt-5">Welcom To Election Canada</h1>
								{/* Map and Bear Images */}
								<div className="map-container position-relative">
									<div>
									<img src="/assets/canada_blank_map.png" className="map-image" alt="Canada-Blank-Map" />
									</div>
									<img src="/assets/canada_bear.png" className="bear-image" alt="Canada-Bear" />
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>	
	)
}

export default Dashboard
