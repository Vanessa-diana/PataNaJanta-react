import React, { Component } from 'react'
import '../Cadastro/cadastro.css'
import User from '../../images/user.png'
import axios from 'axios';


export default class Cadastro extends Component {


    componentDidMount()
    {
        let btnCadastrar = document.getElementById("btnCadastrar");
        let self = this;

        btnCadastrar.addEventListener('click', function(event){
            event.preventDefault();

            self.gravaDados();
        })
    }

    gravaDados = () =>{

        let URL = 'http://patanajanta.test/api';
        let endPoint = '/usuario/cadastrar';

        URL += endPoint;

        let nome = document.getElementById('txtNome');
        let sobrenome = document.getElementById('txtSobrenome');
        let CPF = document.getElementById('txtCPF');
        let cbbGenero = document.getElementById('cbbGenero');
        let txtDataNasciemnto = document.getElementById('dataNascimento');
        let txtCelular = document.getElementById('txtCelular');
        let txtEmail = document.getElementById('txtEmail');
        let txtSenha = document.getElementById('txtSenha');
        let txtConfSenha = document.getElementById('txtConfSenha');

        let cbbGeneroValue = cbbGenero.options[cbbGenero.selectedIndex].value


        axios({
            method: 'post',
            url: URL,
            timeout: 15000,

            data: {
                nome: nome.value,
                sobrenome: sobrenome.value,
                CPF: CPF.value,
                genero: cbbGeneroValue,
                data_nascimento: txtDataNasciemnto.value,
                telefone: txtCelular.value,
                email: txtEmail.value,
                senha: txtSenha.value
              }
        }).then(function(resposta){
            console.log(resposta.data)
            alert('SUCESSO')
            
        }).catch(function(erro){
            alert(erro)
        })
    }

    render() {
        return (
            <>
                {/*  <!-- DIV DE CONTEUDO DA PAGINA - NAO MEXER NAS classNameES DA DIV -->  */}
                <div className="container logos">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <div>
                                <img src={User} />
                                <label>Criar Conta</label>
                            </div>

                            <a href="#/login"> <button className="btn btn-jacadastrado" type="button">Já tenho Cadastro</button></a>
                        </div>
                    </div>
                </div>

                <form id="formulario-cadastro">
                    <div className="container formulario">
                        <div className="row">
                            <div className="col-12">
                                <div className="container">
                                    <div className="row">

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Nome</h5>
                                            <input type="text" className="form-control nome-form" placeholder="Digite seu nome"
                                                required id='txtNome'/>
                                            <div className="alert alert-danger alert-nome display-cadastro" role="alert">
                                                Digite um Nome Válido
                                    </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Sobrenome</h5>
                                            <input type="text" className="form-control sobrenome-form"
                                                placeholder="Digite seu sobrenome" required id='txtSobrenome'/>
                                            <div className="alert alert-danger alert-sobrenome display-cadastro" role="alert">
                                                digite um sobrenome válido
                                    </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>CPF</h5>
                                            <input type="text" className="form-control cpf-form" placeholder="Digite seu CPF" required id='txtCPF'/>
                                            <div className="alert alert-danger alert-cpf display-cadastro" role="alert">
                                                Digite um CPF válido
                                    </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Gênero</h5>
                                            <select className="form-control" id="cbbGenero">
                                                <option value="NULL">Selecione uma opçao</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Feminino">Feminino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5> Data de nascimento</h5>
                                            <input type="date" className="form-control dtNascimento-form"
                                                placeholder="Digite sua data de nascimento" required id='dataNascimento'/>

                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Telefone celular</h5>
                                            <input type="tel" className="form-control tel-form"
                                                placeholder="Digite um numero de celular" required id='txtCelular'/>

                                        </div>
                                    </div>


                                </div>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <h5> Email</h5>
                                            <input type="email" className="form-control email-form" placeholder="Digite um email válido"
                                                required id='txtEmail'/>
                                            <div className="alert alert-danger alert-email display-cadastro" role="alert">
                                                Email no formato incorreto
                                    </div>
                                        </div>

                                        <div className="col-12 col-sm-6">
                                            <div className="row">
                                                <div className="col-12 col-sm-6">
                                                    <h5>Senha</h5>
                                                    <input type="password" className="form-control senha" name="senha"
                                                        placeholder="Crie uma senha" required id='txtSenha'/>

                                                    <div className="alert alert-danger alert-senha display-cadastro" role="alert">
                                                        Digite uma senha válida
                                            </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <h5>Confirmar</h5>
                                                    <input type="password" className="form-control confsenha-form" name="senha1"
                                                        placeholder="Confirme a senha" required id='txtConfSenha'/>
                                                    <div className="alert alert-danger alert-confsenha display-cadastro" role="alert">
                                                        Senha muito curta ou não confere!
                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container inferior text-center">

                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <button className="btn btn-limpar" type="reset">Limpar</button>
                            </div>

                            <div className="col-12 col-sm-6">
                                <button className="btn btn-cadastrar" type="submit" id='btnCadastrar'>Cadastrar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}