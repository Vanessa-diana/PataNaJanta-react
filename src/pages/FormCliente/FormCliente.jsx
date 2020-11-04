import React, { Component } from 'react'
import '../FormCliente/formCliente.css'


export default class FormCliente extends Component {



    render() {

        return (

            <div className="container formulario-cliente mt-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="titulo-cliente">Editar Cadastro Cliente</h2>
                        <form className='label-form'>
                            <div class="form-group row text-center">
                                <label className="col-2" for="nome">Nome</label>
                                <input name="nome" type="text" className="form-control col-8" id="nome" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="sobrenome">Sobrenome</label>
                                <input name="sobrenome" type="text" className="form-control col-8" id="sobrenome" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="cpf">CPF</label>
                                <input name="cpf" type="text" className="form-control col-8" id="cpf" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="genero">Gênero</label>
                                <select name="genero" className="form-control col-8" id="cbbGenero">
                                    <option value="NULL">Selecione uma opçao</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="dtnasc">Data de Nasc</label>
                                <input name="dataNasc" type="date" className={`form-control dtNascimento-form col-8`}
                                    placeholder="Digite sua data de nascimento" required id='dataNascimento' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="tel">Telefone</label>
                                <input name="telefone" type="tel" className="form-control tel-form col-8"
                                    placeholder="(00) 00000-0000" required id='txtCelular' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="email">E-mail</label>
                                <input name="email" type="email" className="form-control email-form col-8" placeholder="Digite um email válido"
                                    required id='txtEmail' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="senha">Senha Nova</label>
                                <input name="senha" type="password" className={`form-control col-8`} name="senha"
                                    placeholder="Digite uma nova senha" required id='txtSenha' />
                            </div>

                            <div class="form-group row text-center">
                                <label className="col-2" for="senha">Confirme Senha</label>
                            <input name="confirmSenha" type="password" className={`form-control confsenha-form col-8`} name="senha1"
                                placeholder="Confirme a senha" required id='txtConfSenha' />
                                </div>
                            <div className="col text-center">
                                <input type="submit" className='btn btn-padrao' value="Salvar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}





