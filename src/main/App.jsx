import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import Cards from '../components/Conteudo/cardsHome';

export default props => 
    <div className="container-fluid">
        <Header/>
        <Menu/>
        <Cards/>
        <Footer/>
    </div>


