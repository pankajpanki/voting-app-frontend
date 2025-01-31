import React, { useEffect, useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import toast from "react-hot-toast";
import { Loader } from '../Common/Loader';
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import { Editor } from 'primereact/editor';
import axiosInstance from "../../helper/axiosInstance";


const UpdateJourneyData = () => {
	const [formData, setFormData] = useState({id: '', title: '', subtitle: '', info: '', tab_one_title: '', tab_two_title: '', 
												tab_three_title: '', tab_four_title: '', tab_five_title: '', tab_six_title: ''});
	const [imageone, setImageOne] = useState(null);
	const [imageonepreview, setImageOnePreview] = useState('');
	const [imagetwo, setImageTwo] = useState(null);
	const [imagetwopreview, setImageTwoPreview] = useState('');
	const [imagethree, setImageThree] = useState(null);
	const [imagethreepreview, setImageThreePreview] = useState('');
	const [imagefour, setImageFour] = useState(null);
	const [imagefourpreview, setImageFourPreview] = useState('');
	const [imagefive, setImageFive] = useState(null);
	const [imagefivepreview, setImageFivePreview] = useState('');
	const [imagesix, setImageSix] = useState(null);
	const [imagesixpreview, setImageSixPreview] = useState('');
	
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
					data: {page: 'start_journey'}
				});
				//console.log('response', response);
				
				//console.log('response.data', response.data);
				let pre_data = response.data.data;
				setFormData({
							...formData, 
							id: pre_data?.id, 
							title: pre_data?.title, 
							subtitle: pre_data?.subtitle, 
							info: pre_data?.info, 
							tab_one_title: pre_data?.tab_one_title, 
							tab_two_title: pre_data?.tab_two_title,
							tab_three_title: pre_data?.tab_three_title,
							tab_four_title: pre_data?.tab_four_title,
							tab_five_title: pre_data?.tab_five_title,
							tab_six_title: pre_data?.tab_six_title
						})
				
				if(pre_data.tab_one_image){
					let image_one_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_one_image;
					setImageOnePreview(image_one_path);
				}
				if(pre_data.tab_two_image){
					let image_two_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_two_image;
					setImageTwoPreview(image_two_path);
				}
				if(pre_data.tab_three_image){
					let image_three_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_three_image;
					setImageThreePreview(image_three_path);
				}
				if(pre_data.tab_four_image){
					let image_four_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_four_image;
					setImageFourPreview(image_four_path);
				}
				if(pre_data.tab_five_image){
					let image_five_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_five_image;
					setImageFivePreview(image_five_path);
				}
				if(pre_data.tab_six_image){
					let image_six_path = process.env.REACT_APP_SERVER_URL + pre_data?.tab_six_image;
					setImageSixPreview(image_six_path);
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
	
	const setEditorChange = (field, value) => {
		setFormData({
					...formData, 
					[field]: value
					})
	}
	
	const handleImageOneChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageOne(file);
				setImageOnePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleImageTwoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageTwo(file);
				setImageTwoPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleImageThreeChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageThree(file);
				setImageThreePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleImageFourChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageFour(file);
				setImageFourPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleImageFiveChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageFive(file);
				setImageFivePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleImageSixChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageSix(file);
				setImageSixPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	
	const saveData = async () => {
		setSubmitting(true); // Ensure the loader is shown before the request
		try {
			
			const form_Data = new FormData();
			form_Data.append('itemid', formData.id);
			form_Data.append('title', formData.title);
			form_Data.append('subtitle', formData.subtitle);
			form_Data.append('info', formData.info);
			form_Data.append('tab_one_title', formData.tab_one_title);
			form_Data.append('tab_two_title', formData.tab_two_title);
			form_Data.append('tab_three_title', formData.tab_three_title);
			form_Data.append('tab_four_title', formData.tab_four_title);
			form_Data.append('tab_five_title', formData.tab_five_title);
			form_Data.append('tab_six_title', formData.tab_six_title);
			form_Data.append('tab_one_image', imageone);
			form_Data.append('tab_two_image', imagetwo);
			form_Data.append('tab_three_image', imagethree);
			form_Data.append('tab_four_image', imagefour);
			form_Data.append('tab_five_image', imagefive);
			form_Data.append('tab_six_image', imagesix);
			
			const res = await axiosInstance({
				url: "content-manage/update-journey-page-date",
				method: "POST",
				data: form_Data,
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
								<p className="text-info">Update Begin Journey Page Data</p>
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
											<Editor value={formData.title} onTextChange={(e) => setEditorChange('title', e.htmlValue)} style={{ height: '70px' }} />
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">Page Sub Title</label>
											<Editor value={formData.subtitle} onTextChange={(e) => setEditorChange('subtitle', e.htmlValue)} style={{ height: '70px' }} />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<div className="mb-3">
											<label className="form-label">Description</label>
											<Editor value={formData.info} onTextChange={(e) => setEditorChange('info', e.htmlValue)} style={{ height: '70px' }} />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab One Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imageonepreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab1image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab1image" onChange={handleImageOneChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab One Title</label>
													<Editor value={formData.tab_one_title} onTextChange={(e) => setEditorChange('tab_one_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab Two Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imagetwopreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab2image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab2image" onChange={handleImageTwoChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab Two Title</label>
													<Editor value={formData.tab_two_title} onTextChange={(e) => setEditorChange('tab_two_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
											</div>
										</div>			
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab Three Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imagethreepreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab3image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab3image" onChange={handleImageThreeChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab Three Title</label>
													<Editor value={formData.tab_three_title} onTextChange={(e) => setEditorChange('tab_three_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
											</div>
										</div>		
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab Four Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imagefourpreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab4image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab4image" onChange={handleImageFourChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab Four Title</label>
													<Editor value={formData.tab_four_title} onTextChange={(e) => setEditorChange('tab_four_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab Five Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imagefivepreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab5image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab5image" onChange={handleImageFiveChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab Five Title</label>
													<Editor value={formData.tab_five_title} onTextChange={(e) => setEditorChange('tab_five_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
											</div>
										</div>		
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-4">
												<label className="form-label">Tab Six Image</label>
												<div className="border p-3">
													<div className="d-flex justify-content-center">
														<div className="position-relative">
															<img id="selectedImage" src={imagesixpreview} alt="example placeholder" style={{ width: '100px', height: '100px', boxShadow: '0px 0px 3px #888888' }} className="rounded-circle"/>
															<div className="position-absolute top-0 end-0 p-1">
																<button className="btn btn-secondary rounded-circle btn-sm" style={{ height: '30px', width: '30px', padding: '0', fontSize: '16px',}}	onClick={() => document.getElementById('tab6image').click()}>
																	<Pencil color="#FFF" size={18} />
																</button>
															</div>
														</div>
														<input type="file" className="form-control d-none" id="tab6image" onChange={handleImageSixChange} />
													</div>
												</div>
											</div>
											<div className="col-md-8">
												<div className="mb-3">
													<label className="form-label">Tab Six Title</label>
													<Editor value={formData.tab_six_title} onTextChange={(e) => setEditorChange('tab_six_title', e.htmlValue)} style={{ height: '70px' }} />
												</div>
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

export default UpdateJourneyData