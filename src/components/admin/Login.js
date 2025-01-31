import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
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
		<div id="login" style={{ height: '100vh', background: 'linear-gradient(180deg, #E9E9E9 4.91%, #F2F2F2 20%, #E9E9E9 100%)' }} className="d-flex justify-content-center align-items-center">
			<div>
				<h3 className="text-center text-dark pt-5 mb-5">Login form</h3>
				<div className="container">
					<div className="row justify-content-center">
						<div className="card" style={{ width: '400px' }}>
							<div className="col-md-12">
								<div className="p-3">
									<div className="form-group mb-4">
										<label htmlFor="email">Email address</label>
										<input
										  type="email"
										  className="form-control"
										  id="email"
										  name="email"
										  placeholder="Enter email"
										  value={form.email} 
										  onChange={valueChanged}
										/>
										{form.email_error !== '' ? <span className="text-danger">{form.email_error}</span> : ''}
									</div>
									<div className="form-group mb-4">
										<label htmlFor="password">Password</label>
										<input
										  type="password"
										  className="form-control"
										  id="password"
										  name="password"
										  placeholder="Password"
										  value={form.password} 
										  onChange={valueChanged}
										/>
										{form.password_error !== '' ? <span className="text-danger">{form.password_error}</span> : ''}
									</div>
									<div className="form-group mt-5 mb-4">
										{issubmiting ? (
											<button className="btn btn-primary">
												<span className="spinner-border spinner-border-sm"></span>
												Wait..
											</button>
										) : (
											<button className="btn btn-block btn-primary" onClick={(e) => handleSubmit(e)}>
												SUBMIT
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
