import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App";
import { AuthProvider } from './context/AuthProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
	   <AuthProvider>
		   <App />
	   </AuthProvider>
	</React.StrictMode>, 
	document.getElementById('root')
);

// npx json-server -p 5500 -w data/db.json
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
