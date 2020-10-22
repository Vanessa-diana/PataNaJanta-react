import React, { Component } from 'react'
import '../Header/header.css'
import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.png'
import Cart from '../../images/cart.png'
import User from '../../images/user.png'


export default class Header extends Component {

    state = {
        lbl_titulo: 'Entre ou Cadastre-se',
        link_url: '#'
    }

    componentDidMount()
    {
        var self = this;

        //CASO USUARIO ESTEJA LOGADO
        if(localStorage.getItem('usuario') != null){

            let toJSON = JSON.parse(localStorage.getItem('usuario'));
            let nome = toJSON.nome;

            this.setState({lbl_titulo: nome})
            this.setState({link_url: '#'})


            let dropSair = document.getElementById('dropSair')

            dropSair.addEventListener('click', function(){
                localStorage.clear();
                self.setState({lbl_titulo: 'Entre ou Cadastre-se'})
                window.location.reload(false);
            })

            return;
        }

        this.setState({link_url: '#/login'})

        //CASO USUARIO NAO ESTEJA LOGADO
    }


    mostraPainel = () => {

        if(localStorage.getItem('usuario') != null){

            return(
                <>
                <div class="dropdown-menu mr-2 menu-dropdown">
                    <a class="dropdown-item linkNav" href="#/historicopedido">Pedidos</a>
                    <a class="dropdown-item linkNav" href="#/login" id='dropSair'>Sair</a>
                </div>
                </>
            )
        }
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
                                    <h6 className='carrinho-header'>Meu carrinho</h6></a>
                            </div>
                            <div class="col-6 text-center mt-4">
                                <a href={this.state.link_url}>
                                    <img src={User} width="30px" />
                                </a>
                                <div class="container-fluid" style={{ display: 'block' }}>
                                    <ul class="nav d-flex justify-content-center">
                                        <li class="nav-item dropdown lihover">
                                            <a class="nav-link linksNavTitulo" href={this.state.link_url} role="button" aria-haspopup="true" aria-expanded="false">
                                                <small style={{ display: 'inline-block' }}>{this.state.lbl_titulo}</small>
                                            </a>
                                            {this.mostraPainel()}
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