import React, { Component } from 'react'
import '../EsqueciSenha/esquecisenha.css'
import axios from 'axios'
import Swal from 'sweetalert2';


export default class EsqueciSenha extends Component{


componentDidMount(){
    this.novaSenha();
}

novaSenha = () => {

    let btnEnviar = document.getElementById('btnEnviar');
    let txtInput = document.getElementById('txtInput');
    let self = this;

    btnEnviar.addEventListener('click', function(event){

        event.preventDefault();
        txtInput.style.borderColor = '#ced4da';

        this.disabled = true;
        txtInput.disabled = true;

        if(txtInput.value.length == 0){

            Swal.fire({
                title: 'Atenção!',
                text: 'O campo não pode estar vazio!',
                icon: 'warning',
                confirmButtonColor: "#B86360",
                confirmButtonText: 'OK'
            });

            txtInput.style.borderColor = 'red';

            this.disabled = false;
            txtInput.disabled = false;
            return;
        }

        let URL = 'http://patanajanta.test/api';
        let endPoint = `/usuario/recuperarsenha/${txtInput.value}`

        URL+=endPoint;

        axios.get(URL)
        .then((resp)=>{
            if(resp.data.status == 'sucesso'){

                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Email enviado com sucesso! Por favor, verifique a caixa de entrada do e-mail vinculado a seu usuário.',
                    icon: 'success',
                    confirmButtonColor: "#B86360",
                    confirmButtonText: 'OK'
                });
                txtInput.value = '';
            }
            else{
                Swal.fire({
                    title: 'Erro!',
                    text: resp.data.status,
                    icon: 'error',
                    confirmButtonColor: "#B86360",
                    confirmButtonText: 'OK'
                });
                txtInput.value = '';
            }

            this.disabled = false;
            txtInput.disabled = false;
        })
        .catch((erro)=>{

            Swal.fire({
                title: 'Erro!',
                text: 'ERRO AO ENVIAR EMAIL = ' + erro,
                icon: 'error',
                confirmButtonColor: "#B86360",
                confirmButtonText: 'OK'
            });

            this.disabled = false;
            txtInput.disabled = false;
        })
    });
}

render() {

    return(
        <div className="container formulario-senha mt-4">
            <form>
                <div className="form-group">
                    <h3 className= 'titulo-senha'>Resetar Senha</h3>
                    <label>Email ou CPF</label>
                    <input type="email" className="form-control" id="txtInput" aria-describedby="emailHelp"/>
                    <small className="form-text text-muted">Digite seu email ou CPF cadastrado.</small>
                </div>
                <div className="col text-center">
                     <button type="submit" className="btn btn-padrao" id='btnEnviar'>Enviar</button>
                </div>
            </form>
        </div>
    )
}



}