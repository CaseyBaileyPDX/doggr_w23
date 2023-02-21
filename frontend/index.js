function Greeting() {
	return (<h1>Hi pet daters</h1>);
}

function Footer() {
	return (<h3>Copyright Github Copilot</h3>);
}

const rootContainer = document.getElementById('root');
const root = ReactDOM.createRoot(rootContainer);
root.render(
	<div>
		<Greeting/>
		<Footer/>
	</div>
);

