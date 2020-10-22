import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import Routes from './Routes'
import AltereSeuCadastro from '../pages/AltereSeuCadastro/AltereSeuCadastro'
import Checkout from '../pages/Checkout/Checkout'

export default props => 
    <div className="container-fluid">
        <Header/>
        {/* <AltereSeuCadastro/> */}
        <Checkout />
        <Routes />
        <Footer/>
    </div>


