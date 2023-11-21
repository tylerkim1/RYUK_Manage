import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Details from './components/Details';
import Errror from './components/Errror';
import MainPage from './components/MainPage';
import Board from './components/Board';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/details' element={<Details />} />
        <Route path='/mainpage/*' element={<MainPage />} />
        <Route path='/board/*' element={<Board />} />
        <Route path='*' element={<Errror />} />
      </Routes>
    </div>
  );
}

export default App;