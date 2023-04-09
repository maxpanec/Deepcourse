import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import About from './Components/About/About'
import Footer from './Components/Footer/Footer';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ForgetPassword/ResetPassword/ResetPassword';
import ForgetUsername from './Components/ForgetUsername/ForgetUsername';
import ResetUsername from './Components/ForgetUsername/ResetUsername/ResetUsername';
import FlashcardView from './Components/FlashcardView/FlashcardView';
import CreateSet from './Components/CreateSet/CreateSet';
import Error from './Components/Error/Error';
import ViewStudySets from './Components/ViewStudySets/ViewStudySets';

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
							<Route path="/forget-password" exact element={<ForgetPassword/>}/>
							<Route path="/forget-password/reset" exact element={<ResetPassword/>}/>
							<Route path="/forget-username" exact element={<ForgetUsername/>}/>
							<Route path="forget-username/reset" exact element={<ResetUsername/>}/>
							<Route path="flashcard-view/:id" exact element={<FlashcardView/>}/>
							<Route path="view-studysets" exact element={<ViewStudySets user={user}/>}/>
							<Route path="/forget-username/reset" exact element={<ResetUsername/>}/>
							<Route path="/create-set" exact element={<CreateSet/>} />
							<Route path="*" element={<Error/>}/>
						</Routes>
					</div>
				<Footer/>
			</div>
		</BrowserRouter>
	);
}

export default App;
