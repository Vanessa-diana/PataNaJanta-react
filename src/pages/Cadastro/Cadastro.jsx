import React from 'react'
import '../Cadastro/cadastro.css'
import User from '../../images/user.png'


export default props=>(
    <>
 {/*  <!-- DIV DE CONTEUDO DA PAGINA - NAO MEXER NAS classNameES DA DIV -->  */}
    <div className="container logos">
        <div className="row">
            <div className="col-12 d-flex justify-content-between">
                <div>
                    <img src={User}/>
                    <label>Criar Conta</label>
                </div>

                <a href="login.html"> <button className="btn btn-jacadastrado" type="button">Já tenho Cadastro</button></a>
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
                                        required/>
                                    <div className="alert alert-danger alert-nome display-cadastro" role="alert">
                                        Digite um Nome Válido
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h5>Sobrenome</h5>
                                    <input type="text" className="form-control sobrenome-form"
                                        placeholder="Digite seu sobrenome" required/>
                                    <div className="alert alert-danger alert-sobrenome display-cadastro" role="alert">
                                        digite um sobrenome válido
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h5>CPF</h5>
                                    <input type="text" className="form-control cpf-form" placeholder="Digite seu CPF" required/>
                                    <div className="alert alert-danger alert-cpf display-cadastro"  role="alert">
                                        Digite um CPF válido
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h5>Gênero</h5>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        <option value="NULL">Selecione uma opçao</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h5> Data de nascimento</h5>
                                    <input type="date" className="form-control dtNascimento-form"
                                        placeholder="Digite sua data de nascimento" required/>

                                </div>

                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h5>Telefone celular</h5>
                                    <input type="tel" className="form-control tel-form"
                                        placeholder="Digite um numero de celular" required/>

                                </div>
                            </div>


                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <h5> Email</h5>
                                    <input type="email" className="form-control email-form" placeholder="Digite um email válido"
                                        required/>
                                    <div className="alert alert-danger alert-email display-cadastro"  role="alert">
                                        Email no formato incorreto
                                    </div>
                                </div>
        
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <h5>Senha</h5>
                                            <input type="password" className="form-control senha" name="senha"
                                                placeholder="Crie uma senha" required/>
        
                                            <div className="alert alert-danger alert-senha display-cadastro" role="alert">
                                                Digite uma senha válida
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <h5>Confirmar</h5>
                                            <input type="password" className="form-control confsenha-form" name="senha1"
                                                placeholder="Confirme a senha" required/>
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
                        <button className="btn btn-cadastrar" type="submit">Cadastrar</button>
                    </div>
                </div>
            </div>
        </form>
</>
)