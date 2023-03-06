import {httpClient} from "./HttpService";
import React from "react";
import {useNavigate} from "react-router-dom";

// https://www.robinwieruch.de/react-router-authentication/
// PLEASE SEE HERE FOR IN-DEPTH EXPLANATIONS

export type AuthContextProps = {
	token: string | null,
	handleLogin: (email: string, password: string) => Promise<boolean>,
	handleLogout: () => void,
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);

const updateAxios = async (token: string) => {
	console.log("In update axios");
	httpClient.interceptors.request.use(
		async config => {

			// @ts-ignore
			config.headers = {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			};

			return config;
		},
		error => {
			console.log("REJECTED PROMISE");
			Promise.reject(error);
		});
}

const initialToken: string | null = getTokenFromStorage();

if (initialToken) {
	await updateAxios(initialToken);
}


export const AuthProvider = ({children}: any) => {

	const navigate = useNavigate();

	const [token, setToken] = React.useState(initialToken);

	const handleLogin = async (email: string, password: string) => {
		console.log("in handle login with email: {} and pw {}", email, password);
		try {
			let token = await getLoginTokenFromServer(email, password);
			console.log("Got token in handle login", token);
			saveToken(token);
			console.log("After saving token");
			await updateAxios(token);
			console.log("After updating axios");
			/* logged in now, so we can go somewhere that requires auth!
			 we'll either go back to wherever the user was before being
			 redirected to login, or default to match-history
			 */
			navigate(-1);
			return true;
		} catch (err) {
			console.log("Failed handle login", err);
			navigate("/login");
			return false;
		}
	};

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem("token");
		// Don't need a navigate here, as our Protected Route will defend us
	};

	const saveToken = (token: string) => {
		console.log("Saving token");
		setToken(token);
		localStorage.setItem("token", JSON.stringify(token));
	};

	return (
		<AuthContext.Provider value={{
			token,
			handleLogin,
			handleLogout
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	//console.log("In useAuth about to create react context with AuthContext:");
	//console.log(AuthContext);
	return React.useContext(AuthContext);
};

export function getTokenFromStorage() {
	const tokenString = localStorage.getItem('token');
	// @ts-ignore
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

export async function getLoginTokenFromServer(email: string, password: string) {
	console.log("In get login token from server", email, password);
	let res = await httpClient.post("/login", {
		email,
		password
	});

	return res.data;
}

export function getPayloadFromToken(token: string) {
	const base64Url = token.split('.')[1];
	if (base64Url == null) {
		console.log("Yikes, your token has no payload and this should be impossible");
		return;
	}
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	let payload = JSON.parse(jsonPayload);
	console.log(payload);
	return payload;
};
