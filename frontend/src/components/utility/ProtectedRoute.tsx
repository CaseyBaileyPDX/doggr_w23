import {Navigate} from "react-router-dom";
import {useAuth} from "../../services/AuthService";

// We use 'any' here because typing react's children is fraught with peril
export const ProtectedRoute = ({children}: any) => {
	const context = useAuth();
	if (!context?.token) {
		// user is not authenticated
		return <Navigate to="/login"/>;
	}
	return children;
};
