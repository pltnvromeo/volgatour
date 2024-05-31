import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css"

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <Content/>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
