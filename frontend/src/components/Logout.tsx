import {useEffect} from "react";
import React from "react";
import {useAuth} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

export function Logout() {

	const context = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		async function processLogout() {
			if (context) {
				await context.handleLogout();
				navigate("/");

			} else {
				console.log("Context is null");
				navigate("/");
			}
		}

		processLogout()
			.then(() => {
				console.log("Logout completed successfully")
			});
	}, [context]);

	return null;
}
