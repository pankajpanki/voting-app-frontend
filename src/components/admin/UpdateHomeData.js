import React, { useEffect, useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import toast from "react-hot-toast";
import { Loader } from '../Common/Loader';
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import { Editor } from 'primereact/editor';
import axiosInstance from "../../helper/axiosInstance";




const toolbarOptions = [];

const UpdateHomeData = () => {
	const [itemid, setItemID] = useState('');
	const [title, setTitle] = useState('');
	const [subtitle, setSubTitle] = useState('');
	const [dateinfo, setDateInfo] = useState('');
	const [info, setInfo] = useState('');
	const [backgroundimage, setBackgroundImage] = useState(null);
	const [backgroundpreview, setBackgroundPreview] = useState('');
	const [mainimage, setMainImage] = useState(null);
	const [mainpreview, setMainPreview] = useState('');
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
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
				setItemID(pre_data?.id);
				setTitle(pre_data?.title);
				setSubTitle(pre_data?.subtitle);
				setDateInfo(pre_data?.dateinfo);
				setInfo(pre_data?.info);
				if(pre_data.background_image){
					let backgound_path_complete = process.env.REACT_APP_SERVER_URL + pre_data?.background_image;
					setBackgroundPreview(backgound_path_complete);
				}
				if(pre_data.main_image){
					let main_path_complete = process.env.REACT_APP_SERVER_URL + pre_data?.main_image;
					setMainPreview(main_path_complete);
				}
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
	
	const handleBackImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBackgroundImage(file);
				setBackgroundPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleMainImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setMainImage(file);
				setMainPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const saveData = async () => {
		setSubmitting(true); // Ensure the loader is shown before the request
		try {
			const formData = new FormData();
			formData.append('itemid', itemid);
			formData.append('backgroundimage', backgroundimage);
			formData.append('mainimage', mainimage);
			formData.append('title', title);
			formData.append('subtitle', subtitle);
			formData.append('dateinfo', dateinfo);
			formData.append('info', info);
			const res = await axiosInstance({
				url: "content-manage/update-home-page-date",
				method: "POST",
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (res.data.type === "success") {
				toast.success(res.data.message)
			} else if (res.type === "validation_error") {
				toast.error(res.data.message)
			} else {
				toast.error(res.data.message)
			}
		} catch (error) {
			toast.error(error.message)
			console.error("Error fetching data:", error);
		} finally {
			setSubmitting(false); // Ensure the loader is hidden after the request
		}
	};
	
	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-10 ml-sm-auto col-lg-10" style={{ height: '100vh', marginLeft: '317px'}}>
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<div className="btn-toolbar mt-4 mb-md-0">
								<p className="text-info">Update Home Page Data</p>
							</div>
						</div>
						{loading ? (
							<Loader />
						) : (
							<div className="card p-3">
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Page Title</label>
											<Editor value={title} onTextChange={(e) => setTitle(e.htmlValue)} style={{ height: '70px' }} toolbar={toolbarOptions} />
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Page Sub Title</label>
											<Editor value={subtitle} onTextChange={(e) => setSubTitle(e.htmlValue)} style={{ height: '70px' }} toolbar={toolbarOptions} />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Date Info</label>
											<Editor value={dateinfo} onTextChange={(e) => setDateInfo(e.htmlValue)} style={{ height: '70px' }} toolbar={toolbarOptions} />
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Description</label>
											<Editor value={info} onTextChange={(e) => setInfo(e.htmlValue)} style={{ height: '70px' }} toolbar={toolbarOptions} />
										</div>
									</div>
								</div>
								<div className="row">
								{/*<div className="col-md-6">
										<label className="form-label">Background Image</label>
										<div className="border p-3">
											<div className="d-flex justify-content-center">
												<div className="position-relative">
													<img id="selectedImage" src={backgroundpreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
													<div className="position-absolute top-0 end-0 p-1">
														<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('backgroundimage').click()}>
															<Pencil color="#FFF" size={18} />
														</button>
													</div>
												</div>
												<input type="file" className="form-control d-none" id="backgroundimage" onChange={handleBackImageChange} />
											</div>
										</div>
								</div>*/}
									<div className="col-md-6">
										<label className="form-label">Main Image(Bear Image)</label>
										<div className="border p-3">
											<div className="d-flex justify-content-center">
												<div className="position-relative">
													<img id="selectedImage" src={mainpreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
													<div className="position-absolute top-0 end-0 p-1">
														<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('mainimage').click()}>
															<Pencil color="#FFF" size={18} />
														</button>
													</div>
												</div>
												<input type="file" className="form-control d-none" id="mainimage" onChange={handleMainImageChange} />
											</div>
										</div>
									</div>
								</div>
								<div className="border-bottom mt-2 mb-4"></div>
								<div className="mb-3 form-check d-flex justify-content-end">
								  {submitting ? (
									<button className="btn btn-primary">
									  <span className="spinner-border spinner-border-sm"></span>
									  Wait..
									</button>
								  ) : (
									<button className="btn btn-primary" onClick={() => saveData()}>
									  SUBMIT
									</button>
								  )}
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</>	
	)
}

export default UpdateHomeData
