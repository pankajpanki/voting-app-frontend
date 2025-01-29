import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CFormText, CRow, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import 'react-toastify/dist/ReactToastify.css' // import first
import { ToastContainer, toast } from 'react-toastify' // then this
//import sideImage from 'src/assets/images/login-side.png'
import helpers from '../../helper/common'
import axiosInstance from "../../helper/axiosInstance";

const Login = () => {
	const validated = false;
	const [issubmiting, setisSubmiting] = useState(false)
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: '', password: '', email_error: '', password_error: '' });

	useEffect(() => {
		//Check if user token exist then redirect him to dashboard
		checkUserIsLoggedIn();
	}, [])

	const checkUserIsLoggedIn = () => {
		if (localStorage.getItem("token")) {
			//navigate('/admin/dashboard');
		}
	}

	const valueChanged = (e) => {
		const { name, value } = e.target;
		let newEdit = { ...form };
		newEdit[name] = value;
		newEdit[name + '_error'] = '';
		setForm(newEdit);
	}

	const validateForm = () => {
		let newEdit = { ...form };
		let validateData = true;
		if (form.email === '') {
			newEdit.email_error = 'The email field is required.';
			validateData = false;
		} else {
			newEdit.email_error = '';
			if (!helpers.isValidEmail(form.email)) {
				newEdit.email_error = 'Email is invalid';
				validateData = false;
			}
		}
		if (form.password === '') {
			newEdit.password_error = 'The password field is required.';
			validateData = false;
		} else {
			let msg = helpers.isValidFormatForPassword(form.password);
			newEdit.password_error = '';
			if (msg !== '') {
				newEdit.password_error = msg;
				validateData = false;
			}
		}
		setForm(newEdit);
		return validateData;
	}

	const handleSubmit = (e) => {
		//Before submit validate form
		if (validateForm()) {
			submitForm({ email: form.email, password: form.password })
		}
	}

	const submitForm = async (formData) => {
		setisSubmiting(true); // Ensure the loader is shown before the request
		try {
			const res = await axiosInstance({
				url: "users/login",
				method: "POST",
				data: formData
			});
			console.log('res', res);
			if (res.data.type === "success") {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				toast.success("Logged-in Successfully!")
				navigate("/admin/dashboard")
			} else if (res.type === "validation_error") {
				toast.error(res.message)
				setisSubmiting(false)
			} else {
				toast.error(res.message)
				setisSubmiting(false)
			}
		} catch (error) {
		  console.error("Error fetching data:", error);
		} finally {
		  setisSubmiting(false); // Ensure the loader is hidden after the request
		}
	}
	
	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={8}>
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody>
									<CForm noValidate validated={validated} >
										<h1>Login</h1>
										<p className="text-medium-emphasis">Sign In to your account</p>
										<ToastContainer />
										<CRow className="mb-3">
											<CInputGroup>
												<CInputGroupText>
													<CIcon icon={cilUser} />
												</CInputGroupText>
												<CFormInput type="text" placeholder="Email" autoComplete="off" name="email" id="email" onChange={valueChanged} />
											</CInputGroup>
											<CFormText className="text-danger">{form.email_error}</CFormText>
										</CRow>
										<CRow className="mb-4">
											<CInputGroup>
												<CInputGroupText>
													<CIcon icon={cilLockLocked} />
												</CInputGroupText>
												<CFormInput type="password" placeholder="Password" autoComplete="off" name="password" id="password" onChange={valueChanged} />
											</CInputGroup>
											<CFormText className="text-danger">{form.password_error}</CFormText>
										</CRow>
										{/*<CRow>
											<CCol xs={12} className="text-center">
												<p>
												  Forgot your password ? No need to <a href="/forgot-password">panic!</a>
												</p>
											</CCol>
										</CRow>*/}
										<CRow>
											{issubmiting ?
												(
													<div className="d-grid gap-2">
														<CButton disabled color="primary" className="px-4" >
															<CSpinner component="span" size="sm" aria-hidden="true" />
															Wait...
														</CButton>
													</div>
												)
												:
												(
													<div className="d-grid gap-2">
														<CButton color="primary" className="px-4" onClick={handleSubmit}>
															Login
														</CButton>
													</div>
												)
											}
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard className="" style={{ width: '44%', background: 'linear-gradient(180deg, #0A0F1F 4.91%, #F2F2F2 20%,  #E9E9E9 100%)' }}>
								<CCardBody className="text-center">
									<div className="text-center">
										{/* Map and Bear Images */}
										<div className="map-container position-relative" >
											<div>
											<img src="/assets/canada_blank_map.png" className="map-image" alt="Canada-Blank-Map" />
											</div>
											<img src="/assets/canada_bear.png" className="bear-image" alt="Canada-Bear" />
										</div>
									</div>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default Login
