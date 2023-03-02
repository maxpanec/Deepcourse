import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';


function App() {
	const data = localStorage.getItem('data');
	const user = useMemo(() => {
		return JSON.parse(data);
	},[data])

	return (
		<BrowserRouter>
			<Navbar user={user}/>
			<Routes>
				<Route path="/" exact element={<Homepage/>}/>
				<Route path="/signin" exact element={<Signin/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
