import {useCallback, useState} from "react";
import React from "react";
import {useAuth} from "../services/AuthService";

export function Login() {

	const context = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitFailed, setSubmitFailed] = useState(false);

	const onSubmitLogin = useCallback(
		async () => {
			if (context) {
				let loginSuccess = await context.handleLogin(email, password);
				if (!loginSuccess) {
					console.log("Setting submit failed");
					setSubmitFailed(true);
				}
			} else {
				console.log("Context is null");
			}
		}
		, [email, password, context, setSubmitFailed])


	return (
		<div>
			<div>Login</div>
			<div>
				{submitFailed ? (
						<div>Your password or email was incorrect!</div>
					)
					: null}
			</div>
			<div>
				<label htmlFor="email">Email: </label>

				<input
					type="text"
					id="email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
					name="email"
				/>
			</div>

			<div>
				<label htmlFor="password">Password: </label>
				<input
					type="text"
					id="password"
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
					name="password"
				/>
			</div>

			<div>
				<button onClick={onSubmitLogin}>
					Submit
				</button>
			</div>
		</div>
	);
}
