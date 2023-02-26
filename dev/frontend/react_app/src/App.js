import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Components/Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
			<div>Temp place for nav bar component</div>
			<Routes>
				<Route path="/" exact element={<Homepage/>}/>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
