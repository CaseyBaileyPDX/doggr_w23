function Greeting() {
	return (<h1>Hi pet daters</h1>);
}

function Footer() {
	return (<h3>Copyright Github Copilot</h3>);
}

let foo = (
	<div className="fooClass">IM JSX FOLKS</div>
);
console.log(foo);


const rootContainer = document.getElementById('root');
const root = ReactDOM.createRoot(rootContainer);
root.render(
	foo
);

