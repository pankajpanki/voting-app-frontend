import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { LoaderNoBackground } from './Common/LoaderNoBackground';
import parse from 'html-react-parser';
import axiosInstance from "../helper/axiosInstance";

interface HomeData {
	id: string;
	title: string;
	subtitle: string;
	dateinfo: string;
	info: string;
	background_image?: string;
	main_image?: string;
}
function Home() {
	const navigate = useNavigate();
	const [homedata, setHomeData] = useState<HomeData>({id: '', title: '', subtitle: '', dateinfo: '', info: '', background_image: '', main_image: ''});
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);
	
	
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "content-manage/get-page-data",
					method: "POST",
					data: {page: 'home'}
				});
				//console.log('response', response);
				//console.log('response.data', response.data);
				let pre_data = response.data.data;
				let home_data: HomeData = {
					id: pre_data.id, 
					title: pre_data.title,
					subtitle: pre_data.subtitle,
					dateinfo: pre_data.dateinfo,
					info: pre_data.info,
				};
				// Conditionally add the background and main image URLs if they exist
				if (pre_data.background_image) {
					home_data.background_image = process.env.REACT_APP_SERVER_URL + pre_data.background_image;
				}
				if (pre_data.main_image) {
					home_data.main_image = process.env.REACT_APP_SERVER_URL + pre_data.main_image;
				}
				setHomeData(home_data);
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
				<div className="col-12 col-md-8 col-lg-6 min-vh-100 position-relative content-area-main-home">
					{loading ? (
						<LoaderNoBackground />
					) : (
						<div className="">
							{/* Top Header */}
							<div className="p-1 text-center mt-5">
								{/* Map and Bear Images */}
								<div className="map-container position-relative">
									<div>
									<img src={homedata.background_image} className="map-image" alt="Canada-Blank-Map" />
									</div>
									<img src={homedata.main_image} className="bear-image" alt="Canada-Bear" />
								</div>
							</div>
							{/* Content Area */}
							<div className="">
								<div className="text-center p-3">
									<h2 className="mt-2 home-title">{parse(String(homedata.title))}</h2>
									<h5 className="home-sub-title">{parse(String(homedata.subtitle))}</h5>
									<p className="mb-4 home-date-title">{parse(String(homedata.dateinfo))}</p>
									<p className="mb-0 home-info-text">{parse(String(homedata.info))}</p>
									<div className="p-1">
										<button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/begin-journey")}>GET STARTED</button>
									</div>
								</div>
							</div>	
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

export default Home;