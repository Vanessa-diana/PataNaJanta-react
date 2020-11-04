import React, { Component } from 'react'
import '../EsqueciSenha/esquecisenha.css'


export default class EsqueciSenha extends Component{


render() {

    return(
        <div className="container formulario-senha mt-4">
            <form>
                <div className="form-group">
                    <h3 className= 'titulo-senha'>Resetar Senha</h3>
                    <label>Email ou CPF</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <small className="form-text text-muted">Digite seu email ou CPF cadastrado.</small>
                </div>
                <div className="col text-center">
                     <button type="submit" className="btn btn-padrao">Enviar</button>

                </div>
            </form>
        </div>
    )
}



}