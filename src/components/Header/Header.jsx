import React, { Component } from 'react'
import '../Header/header.css'
import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.png'
import Cart from '../../images/cart.png'
import User from '../../images/user.png'
import axios from 'axios';


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

        //CASO USUARIO NAO ESTEJA LOGADO
        this.setState({link_url: '#/login'})


        this.mostraPainel();
        this.mostraCategorias();
        this.buscaProdutoPesquisa();
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


    mostraCategorias = () => {

        let conteudoDropCachorro = document.getElementById("div-dropdown-cachorro");
        let dropdownCachorro = document.getElementById("dropdownCachorro");

        let conteudoDropGato = document.getElementById("div-dropdown-gato");
        let dropdownGato = document.getElementById("dropdownGato");

        dropdownCachorro.disabled = true;
        dropdownGato.disabled = true;

        let URL = "http://patanajanta.test/api";
        let endPoint = "/produto/listarcategorias"

        URL+=endPoint;

        axios({
            method: 'get',
            url: URL,
            timeout: 15000
        }).then(function(resposta){

            for(let i=0;i<resposta.data.length;i++){
                conteudoDropCachorro.innerHTML += `<a class="dropdown-item linkNav" href="resultado-produto.html">${resposta.data[i].descricao}</a>`
                conteudoDropGato.innerHTML += `<a class="dropdown-item linkNav" href="resultado-produto.html">${resposta.data[i].descricao}</a>`;
            }
            dropdownCachorro.disabled = false;
            dropdownGato.disabled = false;

        }).catch(function(erro){

            if(erro.toString().includes('Network Error') || erro.toString().includes('timeout of')){
                alert('O banco de dados demorou muito para responder, por favor tente mais tarde!');
                dropdownCachorro.disabled = false;
                dropdownGato.disabled = false;
                return;
            }

            alert(erro);
            dropdownCachorro.disabled = false;
            dropdownGato.disabled = false;
        })
    }


    buscaProdutoPesquisa = () => {

        let txtPesquisa = document.getElementById('txtPesquisa');
        let btnPesquisar = document.getElementById('btnPesquisar');

        btnPesquisar.addEventListener('click', function(event){

            event.preventDefault();

            let URL = 'http://patanajanta.test/api'
            let endPoint = `/produto/buscarProdutoTermo/${txtPesquisa.value}`

            URL+=endPoint;
            
            axios({
                method: 'get',
                url: URL,
                timeout: 15000
            }).then(function(resposta){

    
                //CASO API RETORNE 404

                //Caso NÃO exista alguma consulta anterior guardada em LocalStorage
                if(localStorage.getItem('resultadoPesquisa') == null){
                    localStorage.setItem('resultadoPesquisa', JSON.stringify(resposta.data));
                    return
                }

                //Caso exista alguma consulta anterior guardada em LocalStorage
                localStorage.removeItem('resultadoPesquisa');
                localStorage.setItem('resultadoPesquisa', JSON.stringify(resposta.data));


                //CASO API RETORNE 201
                /* try{

                    //CASO API RETORNE NENHUM DADO
                    if(resposta.data.erro.length != 0){
                        return;
                    }

                }catch(e){

                    //Caso NÃO exista alguma consulta anterior guardada em LocalStorage
                    if(localStorage.getItem('resultadoPesquisa') == null){
                        localStorage.setItem('resultadoPesquisa', JSON.stringify(resposta.data));
                        return
                    }

                    //Caso exista alguma consulta anterior guardada em LocalStorage
                    localStorage.removeItem('resultadoPesquisa');
                    localStorage.setItem('resultadoPesquisa', JSON.stringify(resposta.data));
                } */

    
            }).catch(function(erro){
                if(erro.toString().includes('Network Error') || erro.toString().includes('timeout of')){
                    alert('O banco de dados demorou muito para responder, por favor tente mais tarde!');
                    return;
                }

                alert(`CATCH AXIOS = ${erro}`);
            })

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
                            <input id='txtPesquisa' className="form-control mr-2 mb-1 mt-4 searchBox" type="search" placeholder="Procure produtos para seu cachorro ou gato" aria-label="Search" />
                            <button className="btn btn-search" type="submit" id='btnPesquisar'>
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
                                    style={{ backgroundColor: '#b86360' }} id='dropdownCachorro'>Cachorro</a>

                                <div class="dropdown-menu menu" id="div-dropdown-cachorro">
                                    
                                    {/* CONSUMO API AQUI mostraCategorias*/}
                                
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-12 btn-nav">
                        <ul class="nav nav-pills">
                            <li class="nav-item dropdown text-center menu" style={{ textDecoration: 'none', alignItems: 'center' }}>
                                <a class="nav-link dropdown-toggle mt-2 linksNavTitulo " data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="false"
                                    style={{ backgroundColor: '#b86360' }} id='dropdownGato'>Gato</a>

                                <div class="dropdown-menu menu" id='div-dropdown-gato'>
                                    
                                    {/* CONSUMO API AQUI mostraCategorias */}

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