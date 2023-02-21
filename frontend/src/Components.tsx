import React, {useState} from 'react';

export const Header = () => {
	return (<div>
			<h1>Doggr</h1>
			<h3>Where your pets finds love(tm)</h3>
			<br />
		</div>
	);
}

export const Users = () => {
	const [users, setUsers] = useState([]);


}

export const Button = () => {
	let [clicks, setClicks] = useState(0);

	return (
		<button onClick={() => {
			setClicks(clicks + 1);
		}
		}>
			Clicks: {clicks}
		</button>
	);
}
