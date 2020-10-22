import React, { Component } from 'react';
import './login.css';

import axios from 'axios';
import LocalStorage from '../../main/LocalStorage';

let URL = 'http://patanajanta.test/api'

class Login extends React.Component {

        state = {
            lblBotao: "Entrar"
        }


        componentDidMount(){
            let txtSenha=document.getElementById('senhaUsuario')
            let txtUsuario=document.getElementById('txtUsuario')
            let btnEntrar=document.getElementById('btnEntrar')
            var self = this

            btnEntrar.addEventListener('click', function(){
                URL+=`/login/${txtUsuario.value}/${txtSenha.value}`
                
                btnEntrar.disabled=true;

                self.setState({lblBotao:'Entrando...'})


                axios({
                    method: 'get',
                    url:URL,
                    timeout:10000
                })
                .then(function(resp){
                    if(resp.data.status==='Usuário ou senha inválidos' ){
                        alert ('Usuário ou senha inválidos')
                        btnEntrar.disabled=false;
                        self.setState({lblBotao:'Entrar'})
                        return 
                    }
                    //fazer local storage
                    LocalStorage.usuario = resp.data[0];
                    console.log(LocalStorage.usuario);
                    

                    btnEntrar.disabled=false;
                    self.setState({lblBotao:'Entrar'})

                }).catch(function(erro){
                   
                        if(erro.toString().includes('Network Error') || erro.toString().includes('timeout of') ){
                            alert('O banco de dados demorou muito para responder, por favor tente mais tarde!')
                            btnEntrar.disabled=false;
                            self.setState({lblBotao:'Entrar'})
                            return
                        }
                        alert('Houve um erro ao fazer o login, tente novamente mais tarde')
                        btnEntrar.disabled=false;
                        self.setState({lblBotao:'Entrar'})
                })
                   URL='http://patanajanta.test/api';
                   
            })
        }

    render() {
        return (

            <div>
                <div class="container formulario">
                    <form id="formulario-cadastro">
                        <div class="row">
                            <div class="col-12">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 col-lg-6">

                                           <div class="form-group">
                                                <h2 class="seuloguin text-center">Faça seu login</h2>

                                                <input type="text" id="txtUsuario" class="form-control cpf-form" placeholder="Digite seu CPF ou Email" />

                                                <div class="alert alert-danger alert-cpf" style={{ display: "none" }}>
                                                    Digite um CPF válido
                                                </div>


                                                <input type="password" class="form-control senha-form"
                                                    placeholder="Digite sua senha" id="senhaUsuario" />
                                                <div class="alert alert-danger alert-Senha" style={{ display: "none" }}>
                                                    Digite uma senha válida
                                                </div>



                                                <div class="text-center">
                                                    <button id="btnEntrar" type="submit" class="btn-lg btn-entrar">{this.state.lblBotao}</button>
                                                </div>

                                           </div>
                                        </div>

                                        <div class="col-12 col-sm-6 col-lg-6 text-center">
                                            <div class="form-group">
                                                <h2 class="cadastre">Ainda não é nosso cliente?</h2>
                                                <a href="#/cadastro"><button type="button" class="btn-lg btn-search1">Cadastre-se</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login