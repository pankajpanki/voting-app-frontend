import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
		<div id="login">
			<h3 className="text-center text-white pt-5">Login form</h3>
			<div className="container">
				<div id="login-row" className="row justify-content-center align-items-center">
					<div id="login-column" className="col-md-6">
						<div id="login-box" className="col-md-12">
							<form id="login-form" className="form" action="" method="post">
								<h3 className="text-center text-info">Login</h3>
								<div className="form-group">
									<label for="email" className="text-info">Email:</label><br />
									<input type="text" name="email" id="email" className="form-control" value={form.email} onChange={valueChanged} />
									{form.email_error !== '' ? <span className="text-danger">{form.email_error}</span> : ''}
								</div>
								<div className="form-group">
									<label for="password" className="text-info">Password:</label><br />
									<input type="password" name="password" id="password" className="form-control" value={form.password} onChange={valueChanged} />
									{form.password_error !== '' ? <span className="text-danger">{form.password_error}</span> : ''}
								</div>
								<div className="form-group mt-5">
									{/*<label for="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br>*/}
									<input type="button" name="submit" className="btn btn-info btn-md" value="SUBMIT" onClick={(e) => handleSubmit(e)} />
								</div>
								{/*<div id="register-link" className="text-right">
									<a href="#" className="text-info">Register here</a>
								</div>*/}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
