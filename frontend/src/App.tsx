import './App.css'
import {AuthProvider} from "./services/AuthService";
import {DoggerRoutes} from "./Router";

function App() {
	return (
		<AuthProvider>
			<DoggerRoutes/>
		</AuthProvider>
	)
}

export default App
