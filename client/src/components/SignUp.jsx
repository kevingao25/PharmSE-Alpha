import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import { isEmail } from "validator";
import AuthService from "../services/auth.server";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};
const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};
const vusername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};
const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 6 and 40 characters.
			</div>
		);
	}
};
const Register = (props) => {
	const form = useRef();
	const checkBtn = useRef();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");
	const [role, setRole] = useState("");
	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};
	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};
	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};
	const onChangeRole = (e) => {
		const role = e.target.value;
		setRole(role);
	};
	const handleRegister = (e) => {
		e.preventDefault();
		setMessage("");
		setSuccessful(false);
		form.current.validateAll();
		if (checkBtn.current.context._errors.length === 0) {
			AuthService.register(username, email, password).then(
				(response) => {
					setMessage(response.data.message);
					setSuccessful(true);
				},
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) ||
						error.message ||
						error.toString();
					setMessage(resMessage);
					setSuccessful(false);
				}
			);
		}
	};
	return (
		<div className="text-center m-5-auto">
			<h2>Join us!</h2>
			<h5>Create a account</h5>
			<Form className="col-md-3 form" onSubmit={handleRegister} ref={form}>
				{!successful && (
					<div>
						<div className="form-group mb-3">
							<label htmlFor="username">Username</label>
							<Input
								type="text"
								className="form-control"
								name="username"
								value={username}
								onChange={onChangeUsername}
								validations={[required, vusername]}
							/>
						</div>
						<div className="form-group mb-3">
							<label htmlFor="email">Email</label>
							<Input
								type="text"
								className="form-control"
								name="email"
								value={email}
								onChange={onChangeEmail}
								validations={[required, validEmail]}
							/>
						</div>
						<div className="form-group mb-3">
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								className="form-control"
								name="password"
								value={password}
								onChange={onChangePassword}
								validations={[required, vpassword]}
							/>
						</div>
						<div className="form-group mb-3">
							<FormControl fullWidth sx={{ height: 60 }}>
								<InputLabel id="demo-simple-select-label">Role</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={role}
									label="Role"
									onChange={onChangeRole}>
									<MenuItem value={10}>Patient</MenuItem>
									<MenuItem value={20}>Doctor</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="form-group mb-3">
							<button className="btn btn-primary btn-block">Sign Up</button>
						</div>
					</div>
				)}
				{message && (
					<div className="form-group mb-3">
						<div
							className={successful ? "alert alert-success" : "alert alert-danger"}
							role="alert">
							{message}
						</div>
					</div>
				)}
				<CheckButton style={{ display: "none" }} ref={checkBtn} />
			</Form>
			<footer>
				<p>
					<Link to="/">Back to Homepage</Link>.
				</p>
			</footer>
		</div>
	);
};
export default Register;