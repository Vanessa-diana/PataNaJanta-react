import React, { Component } from 'react'
import '../Header/header.css'
import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.png'
import Cart from '../../images/cart.png'
import User from '../../images/user.png'
import HeaderController from './HeaderController'



export default class Header extends Component {

    state = {
        lbl_titulo: HeaderController.titulo
    }

    componentDidMount()
    {
        let dropSair = document.getElementById('dropSair')
        HeaderController.self = this;

        dropSair.addEventListener('click', function(){
            localStorage.clear();
        })
    }

    render() {
        return (
            <div id='header-pataNaJanta'>
                <div className='row header' >
                    <div className="col-12 col-sm-2 text-center mt-2">
                        <a href="#/home"><img src={Logo} width="170px" /></a>
                    </div>
                    <div className="col-12 col-sm-7 text-center">
                        <form className="form">
                            <input className="form-control mr-2 mb-1 mt-4 searchBox" type="search" placeholder="Procure produtos para seu cachorro ou gato" aria-label="Search" />
                            <button className="btn btn-search" type="submit">
                                <img src={Lupa} width="22px" />
                            </button>
                        </form>
                    </div>
                    <div class="col-12 col-sm-3">
                        <div class="row">
                            <div className="col-6 text-center carrinho mt-3">
                                <a href="#/carrinho" style={{ color: '#b7773f' }}><img src={Cart} className="img-fluid" width="33px" />
                                    <h6 className='titulo-carrinho'>Meu carrinho</h6></a>
                            </div>
                            <div class="col-6 text-center mt-4">
                                <a href="#/login">
                                    <img src={User} width="30px" />
                                </a>
                                <div class="container-fluid" style={{ display: 'block' }}>
                                    <ul class="nav d-flex justify-content-center">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link linksNavTitulo" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                                <small style={{ display: 'inline-block' }}>{this.state.lbl_titulo}</small>
                                            </a>
                                            <div class="dropdown-menu mr-2">
                                                <a class="dropdown-item linkNav" href="#/historicopedido">Pedidos</a>
                                                <a class="dropdown-item linkNav" href="#/login" id='dropSair'>Sair</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row navBar" >
                    <div class="col-md-2 col-12 btn-nav">
                        <ul class="nav nav-pills">
                            <li class="nav-item dropdown text-center menu" style={{ textDecoration: 'none', alignItems: 'center' }}>
                                <a class="nav-link dropdown-toggle mt-2 linksNavTitulo" data-toggle="dropdown" href="#"
                                    role="button" aria-haspopup="true" aria-expanded="false"
                                    style={{ backgroundColor: '#b86360' }}>Cachorro</a>

                                <div class="dropdown-menu menu" >
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Alimentação</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Conforto</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Brinquedos</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Passeio</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-12 btn-nav">
                        <ul class="nav nav-pills">
                            <li class="nav-item dropdown text-center menu" style={{ textDecoration: 'none', alignItems: 'center' }}>
                                <a class="nav-link dropdown-toggle mt-2 linksNavTitulo " data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="false"
                                    style={{ backgroundColor: '#b86360' }}>Gato</a>

                                <div class="dropdown-menu menu">
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Alimentação</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Conforto</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Brinquedos</a>
                                    <a class="dropdown-item linkNav" href="resultado-produto.html">Ambiente</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2 offset-md-4 col-12 text-center pt-3">
                        <a class="text-center link-menu" href="adote-pet.html">Adote um pet</a>
                    </div>
                    <div class="col-md-2 col-12 text-center pt-3">
                        <a class="text-center link-menu" href="#/faleconosco">Contatos</a>
                    </div>
                </div>
            </div>
        )
    }
}


