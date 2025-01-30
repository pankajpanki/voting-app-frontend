import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '../Common/Loader';
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import { Editor } from 'primereact/editor';
import axiosInstance from "../../helper/axiosInstance";


const UpdateHomeData = () => {
	const [title, setTitle] = useState('');
	const [subtitle, setSubTitle] = useState('');
	const [dateinfo, setDateInfo] = useState('');
	const [info, setInfo] = useState('');
	const [loading, setLoading] = useState(true);
	const hasFetchedData = useRef(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Ensure the loader is shown before the request
			try {
				const response = await axiosInstance({
					url: "manage-page/get-home-page-data",
					method: "GET",
				});
				console.log('response', response);
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
	
	const fetchData = async () => {
		setLoading(true); // Ensure the loader is shown before the request
		try {
			const response = await axiosInstance({
				url: "eligibility-question/get-all",
				method: "GET",
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false); // Ensure the loader is hidden after the request
		}
	};
	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-10 ml-sm-auto col-lg-10 px-4 mt-5" style={{ marginLeft: '320px' }}>
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<div className="btn-toolbar mb-2 mb-md-0">
								<p className="text-info">Update Home Page Data</p>
							</div>
						</div>
						<div>
							<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Page Title</label>
								<Editor value={title} onTextChange={(e) => setTitle(e.htmlValue)} style={{ height: '70px' }} />
							</div>
							<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Page Sub Title</label>
								<Editor value={subtitle} onTextChange={(e) => setSubTitle(e.htmlValue)} style={{ height: '70px' }} />
							</div>
							<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Date Info</label>
								<Editor value={dateinfo} onTextChange={(e) => setDateInfo(e.htmlValue)} style={{ height: '70px' }} />
							</div>
							<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">Date Info</label>
								<Editor value={info} onTextChange={(e) => setInfo(e.htmlValue)} style={{ height: '250px' }} />
							</div>
						  <button type="button" className="btn btn-primary">Submit</button>
						</div>
					</main>
				</div>
			</div>
		</>	
	)
}

export default UpdateHomeData
