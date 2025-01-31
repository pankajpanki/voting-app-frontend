import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '../Common/Loader';
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import { Editor } from 'primereact/editor';
import axiosInstance from "../../helper/axiosInstance";




const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']                                         // remove formatting button
];

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
			const response = await axiosInstance({
				url: "content-manage/update-home-page-date",
				method: "POST",
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (error) {
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
							<div className="btn-toolbar mb-2 mb-md-0">
								<p className="text-info">Update Home Page Data</p>
							</div>
						</div>
						{loading ? (
							<Loader />
						) : (
							<div>
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
											<Editor value={info} onTextChange={(e) => setInfo(e.htmlValue)} style={{ height: '150px' }} toolbar={toolbarOptions} />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Choose Background Image</label>
											<input type="file" className="form-control" id="imageInput" accept="image/*" onChange={handleBackImageChange} />
										</div>
										{backgroundpreview !== '' && (
											<div className="mb-3">
												<label className="form-label">Background Image Preview</label>
												<div id="imagePreview" className="d-flex justify-content-center">
													<img id="backgroundpreview" src={backgroundpreview} alt="Image Preview" className="img-fluid" height="100px" width="100px" style={{ backgroundColor: '#DCDCDC' }} />
												</div>
											</div>
										)}
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Choose Main image</label>
											<input type="file" className="form-control" id="imageInput" accept="image/*" onChange={handleMainImageChange} />
										</div>
										{mainpreview !== '' && (
											<div className="mb-3">
												<label className="form-label">Main Image Preview</label>
												<div id="imagePreview" className="d-flex justify-content-center">
													<img id="mainpreview" src={mainpreview} alt="Image Preview" className="img-fluid" height="100px" width="100px" />
												</div>
											</div>
										)}
									</div>
								</div>
								<div className="border-bottom mb-4"></div>
								{submitting ? (
									<button className="btn btn-success">
										<span className="spinner-border spinner-border-sm"></span>
										Wait..
									</button>
								) : (
									<button className="btn btn-block btn-success" onClick={() => saveData()}>
										SUBMIT
									</button>
								)}
							</div>
						)}
					</main>
				</div>
			</div>
		</>	
	)
}

export default UpdateHomeData
