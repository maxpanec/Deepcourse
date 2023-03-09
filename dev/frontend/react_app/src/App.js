import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import About from './Components/About/About'
import Footer from './Components/Footer/Footer';


function App() {
	const data = localStorage.getItem('data');
	const user = useMemo(() => {
		return JSON.parse(data);
	},[data])

	return (
		<BrowserRouter>
			<div className='container'>
				<div className='content'>
					<Navbar user={user}/>
						<Routes>
							<Route path="/" exact element={<Homepage/>}/>
							<Route path="/signin" exact element={<Signin/>}/>
							<Route path="/signup" exact element={<Signup/>}/>
							<Route path="/about" exact element={<About/>}/>
							{/*<Route path="/contact" exact element={<Contact/>}/>*/}
						</Routes>
					</div>
				<Footer/>
			</div>
		</BrowserRouter>
	);
}

export default App;
