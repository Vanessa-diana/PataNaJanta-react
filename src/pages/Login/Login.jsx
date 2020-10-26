import React, { Component } from 'react';
import './login.css';
import Title from '../../components/Titulo/Title';
import axios from 'axios';

let URL = 'http://patanajanta.test/api'

class Login extends React.Component {

    constructor(props){
        super(props);

    this.state =  {
        valid:true,
        lblBotao: "Entrar"
    };

    this.validade = this.validaSenha.bind(this);

    this.validade2 = this.validaDados.bind(this);

   
}

     msgDados() {
    alert("Formato de cpf ou email inválidos!");
    return
  }

  msgSenha() {
    alert("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número!");
    return
  }


   validaSenha = (event) => {

      
       const rules = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
         const valid = rules.test(event.target.value);

      this.setState({valid})  

    }



    validaDados = (event) => {

      
 const dados = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})|^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/; 
 
/*  const cpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
 */
        if(dados)
           
            {
                const valid = dados.test(event.target.value);
 
                this.setState({valid})  
            }
                 /* const valid = cpf.test(event.target.value);
 
            this.setState({valid})    */


        }


       
    

        
 
     

    componentDidMount() {

        const homeURI = '#/home'

        let txtSenha = document.getElementById('senhaUsuario')
        let txtUsuario = document.getElementById('txtUsuario')
        let btnEntrar = document.getElementById('btnEntrar')
        var self = this

        btnEntrar.addEventListener('click', function () {
            URL += `/login/${txtUsuario.value}/${txtSenha.value}`

            btnEntrar.disabled = true;
            txtUsuario.disabled = true;
            txtSenha.disabled = true;

            self.setState({ lblBotao: 'Entrando...' })


            axios({
                method: 'get',
                url: URL,
                timeout: 20000
            })
                .then(function (resp) {
                    if (resp.data.status === 'Usuário ou senha inválidos') {
                        alert('Usuário ou senha inválidos')
                        btnEntrar.disabled = false;
                        txtUsuario.disabled = false;
                        txtSenha.disabled = false;
                        self.setState({ lblBotao: 'Entrar' })
                        return
                    }

                    //fazer local storage


                    try {
                        localStorage.setItem('usuario', JSON.stringify(resp.data[0]));

                        let currentURL = window.location.href;
                        let domain = currentURL.split("/");

                        window.location.replace(domain[0] + homeURI);
                        window.location.reload(false);

                        console.log('GRAVADO COM SUCESSO')

                    } catch (e) {
                        console.log('ERRO AO GRAVAR LOCAL STORAGE')
                    }







                    btnEntrar.disabled = false;
                    txtUsuario.disabled = false;
                    txtSenha.disabled = false;
                    self.setState({ lblBotao: 'Entrar' })

                }).catch(function (erro) {

                    if (erro.toString().includes('Network Error') || erro.toString().includes('timeout of')) {
                        alert('O banco de dados demorou muito para responder, por favor tente novamente mais tarde!')
                        btnEntrar.disabled = false;
                        txtUsuario.disabled = false;
                        txtSenha.disabled = false;
                        self.setState({ lblBotao: 'Entrar' })
                        return
                    }
                    alert('Houve um erro ao fazer o login, tente novamente mais tarde')
                    btnEntrar.disabled = false;
                    txtUsuario.disabled = false;
                    txtSenha.disabled = false;
                    self.setState({ lblBotao: 'Entrar' })
                })
            URL = 'http://patanajanta.test/api';

        })
    }

    render() {
        return (

            <div>
                <div className="container formulario">
                    <form id="formulario-cadastro">
                        <div className="row">
                            <div className="col-12">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">


                                            <div className="form-group">

                                             <Title title="Faça seu login" style="seuloguin text-center" /> 
                                                 
                                             <div>
                                                <input type="text" id="txtUsuario" className={`form-control cpf-form ${this.state.valid ? "valid" : "invalid"}` } placeholder="Digite seu CPF ou Email"  onChange={this.validaDados}/>
                                             
                                                </div>
                                               

                                                <div>
                                                <input type="password" className={`form-control senha-form ${this.state.valid ? "valid" : "invalid"}`}
                                                    placeholder="Digite sua senha" id="senhaUsuario" onChange={this.validaSenha}  required />
                                             {!this.state.valid && <span><a href="url" onClick={this.msgDados}>Email</a> ou <a href="url" onClick={this.msgSenha}>Senha</a> inválidos!! Clique no nome para mais informações!!</span>}
                                            
                                             </div>
                                           
                                            
                                            
                                                <div className="text-center">
                                                    <button id="btnEntrar" type="submit" className="btn-lg btn-entrar">{this.state.lblBotao}</button>
                                                </div>



                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6 text-center">
                                        
                                            <div className="form-group">
                                            
                                            <Title title="Ainda não é nosso cliente?" style="cadastre text-center" /> 
                                                <a href="cadastro.html"><button type="button" className="btn-lg btn-search1">Cadastre-se</button></a>
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