import {Link, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components/utility/ProtectedRoute";
import Match from "./components/Match";
import {Login} from "./components/Login";
import Home from "./components/Home";
import {useAuth} from "./services/AuthService";
import {Logout} from "./components/Logout";

export function DoggerRoutes() {

	let context = useAuth();

	return (
		<div className="App">
			<nav>
				<div className="menu">
					<Link to="/">Home</Link>
					<Link to="/match">Match</Link>
					{
						context?.token != null ?
							<Link to="/logout">Logout</Link>
							: <Link to="/login">Login</Link>
					}


				</div>
			</nav>
			<Routes>
				<Route path="/match" element={<ProtectedRoute><Match/></ProtectedRoute>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/" element={<Home/>}/>
				<Route path="/logout" element={
					<Logout/>
				}/>
			</Routes>
		</div>
	);
}
