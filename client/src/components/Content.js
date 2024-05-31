import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import About from "../pages/About";
import Excursion from "../pages/Excursion";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PersonalPage from "../pages/PersonalPage";

const Content = () => {
    return (
        <div className="content-wrapper">
            <div className="content">
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/excursion/:id" element={<Excursion/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/mypage" element={<PersonalPage/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Content;