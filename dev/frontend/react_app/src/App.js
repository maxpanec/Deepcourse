import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// imported paths
import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import About from './Components/About/About'
import Footer from './Components/Footer/Footer';
import NotSignedIn from './Components/NotSignedIn/NotSignedIn';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ForgetPassword/ResetPassword/ResetPassword';
import ForgetUsername from './Components/ForgetUsername/ForgetUsername';
import ResetUsername from './Components/ForgetUsername/ResetUsername/ResetUsername';
import FlashcardView from './Components/FlashcardView/FlashcardView';
import CreateSet from './Components/CreateSet/CreateSet';
import Error from './Components/Error/Error';
import ViewStudySets from './Components/ViewStudySets/ViewStudySets';
import Quiz from './Components/Quiz/Quiz'
import QuizScores from './Components/QuizScores/QuizScores';
import EditSet from './Components/EditSet/EditSet';

function App() {
	// get user information from localStorage (for login usage)
	const data = localStorage.getItem('data');
	const user = useMemo(() => {
		return JSON.parse(data);
	}, [data])

	return (
		<BrowserRouter>
			<div className='container'>
				<div className='content'>
					{/* Navigation bar that always sticks on top */}
					<Navbar user={user} />
					{/* all exists routes(pages) with specific link*/}
					<Routes>
						<Route path="/" exact element={<Homepage />} />
						<Route path="/signin" exact element={<Signin />} />
						<Route path="/needtosignin" exact element={<NotSignedIn />} />
						<Route path="/signup" exact element={<Signup />} />
						<Route path="/about" exact element={<About />} />
						<Route path="/forget-password" exact element={<ForgetPassword />} />
						<Route path="/forget-password/reset" exact element={<ResetPassword />} />
						<Route path="/forget-username" exact element={<ForgetUsername />} />
						<Route path="forget-username/reset" exact element={<ResetUsername />} />
						<Route path="flashcard-view/:id" exact element={<FlashcardView user={user} />} />
						<Route path="view-studysets" exact element={<ViewStudySets user={user} />} />
						<Route path="/forget-username/reset" exact element={<ResetUsername user={user} />} />
						<Route path="/create-set" exact element={<CreateSet user={user} />} />
						<Route path="/view-quiz/:id" exact element={<Quiz user={user}/>} />
						<Route path="/scores/:id" exact element={<QuizScores user={user} />} />
						{/* <Route path="/scores" exact element={<QuizScores />} />*/}
						<Route path="/flashcard-view/:id/edit" exact element={<EditSet user={user}/>}/>
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
				{/* footer that always stick on the buttom */}
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
