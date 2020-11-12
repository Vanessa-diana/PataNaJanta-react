import React, { Component } from 'react'
import '../Cadastro/cadastro.css'
import User from '../../images/user.png'
import Swal from 'sweetalert2';
import axios from 'axios';


export default class Cadastro extends Component {



    state = {

        lblBotao: "Cadastrar"

    }


    validaCampos = () => {
        let btnCadastrar = document.getElementById('btnCadastrar')

        let nome = document.getElementById('txtNome');
        let sobrenome = document.getElementById('txtSobrenome');
        let CPF = document.getElementById('txtCPF');
        let cbbGenero = document.getElementById('cbbGenero');
        let txtDataNascimento = document.getElementById('dataNascimento');
        let txtCelular = document.getElementById('txtCelular');
        let txtEmail = document.getElementById('txtEmail');
        let txtSenha = document.getElementById('txtSenha');
        let txtConfSenha = document.getElementById('txtConfSenha');

        let self = this

        //validação campo nome
        const nomeRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
        
        if (nome.value.length == 0) {
            self.swall('o campo indicado não pode ser vazio')
            nome.style.borderColor = "red";
            return false
        } else if (nomeRegex.test(nome.value) == false) {

            self.swall('O campo indicado só aceita letras')
            nome.style.borderColor = "red";
            return false

        } else {
            nome.style.borderColor = "#ced4da"
          
        }
        

        //validação campo sobrenome


        if (sobrenome.value.length == 0) {
            self.swall('o campo indicado não pode ser vazio')
            sobrenome.style.borderColor = "red";
            return false
        } else if (nomeRegex.test(sobrenome.value) == false) {

            self.swall('O campo indicado só aceita letras')
            sobrenome.style.borderColor = "red";
            return false

        } else {
            sobrenome.style.borderColor = "#ced4da"
        }

        //validação CPF

        const RegexCPF = /^\d{3}?\.?\d{3}?\.?\d{3}?\-?\d{2}$/;

        if (CPF.value.length == 0) {

            self.swall('O campo indicado não pode ser vazio')
            CPF.style.borderColor = "red";
            return false
        } else if (RegexCPF.test(CPF.value) == false) {
            self.swall('CPF inválido')
            CPF.style.borderColor = "red";
            return false
        } else {
            CPF.style.borderColor = "#ced4da"
        }



        // validação genero

        if (cbbGenero.options[cbbGenero.selectedIndex].value == "NULL") {
            self.swall('Selecione uma opção válida no campo indicado')
            cbbGenero.style.borderColor = "red";
            return false
        } else {
            cbbGenero.style.borderColor = "#ced4da"
        }



        // validação data

        let arrayNascimento = txtDataNascimento.value.split('-')
        let anoUsuario = arrayNascimento[0]
        let anoAtual = new Date().getFullYear();
        let dataFormatada = `${arrayNascimento[2]}-${arrayNascimento[1]}-${arrayNascimento[0]}`

        const regexData = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

        if (txtDataNascimento.value.length == 0) {

            self.swall('O campo não pode ser vazio ou a data não existe')

            txtDataNascimento.style.borderColor = "red";
            return false
        }
        if (anoUsuario <= anoAtual) {


            if (anoAtual - anoUsuario <= 18) {

                self.swall('Usuário não pode ser menor de idade');

                txtDataNascimento.style.borderColor = "red";
                return false
            }

        } else {
            self.swall('O ano de nascimento não pode ser superior ao ano atual')
            txtDataNascimento.style.borderColor = "red";
            return false
        }
        if (regexData.test(dataFormatada) == false) {
            self.swall('Data inválida')
            txtDataNascimento.style.borderColor = "red";
            return false
        } else {
            txtDataNascimento.style.borderColor = "#ced4da"

        }

        // validação celular

        const regexCelular =  /^(\d{2}\s)?(\d{4,5}\d{4})$/;

        if (txtCelular.value.length == 0) {
            self.swall('O campo indicado não pode ser vazio')
            txtCelular.style.borderColor = "red";
            return false
        } else if (regexCelular.test(txtCelular.value) == false) {
            self.swall('Telefone inválido. O número deve estar em um dos seguintes padrões:<br> <div style=\'text-align: left\'><strong><br> 1) 00000000 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telefone Fixo sem DDD<br>2) 900000000 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Celular sem DDD<br>3) DDD 00000000 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telefone Fixo com DDD<br>4) DDD 900000000 &nbsp;&nbsp;&nbsp;Celular com DDD</strong></div>');
            txtCelular.style.borderColor = "red";
            return false
        } else {
            txtCelular.style.borderColor = "#ced4da"
        }

        // validação de email
        const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

        if (txtEmail.value.length == 0) {
            self.swall('O campo indicado não pode ser vazio')
            txtEmail.style.borderColor = "red";
            return false
        } else if (regexEmail.test(txtEmail.value) == false) {
            self.swall('Email inválido')
            txtEmail.style.borderColor = "red";
            return false
        } else {
            txtEmail.style.borderColor = "#ced4da"
        }

        //validação senha
        let regexSenha =  /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/
        

        if (txtSenha.value.length == 0) {
            self.swall('O campo indicado não pode ser vazio')
            txtSenha.style.borderColor = "red";
            return false
        } else if (regexSenha.test(txtSenha.value) == false) {
            self.swall("A senha deve ter no mínimo 8 digitos, uma letra maiúscula e um número")
            txtSenha.style.borderColor = "red";
            return false
        } else {
            txtSenha.style.borderColor = "#ced4da"
        }

        // validação senha

        if (txtConfSenha.value != txtSenha.value) {
            self.swall("Senhas não conferem")
            txtConfSenha.style.borderColor = "red";
            return false
        } else {
            txtConfSenha.style.borderColor = "#ced4da"

        }

        return true

    }



swall = (mensagem) =>{
    Swal.fire({
        title: 'Atenção!',
        html: mensagem,
        icon: 'warning',
        customClass: 'swal-wide',
        showConfirmButton: true,
        confirmButtonColor: "#B86360",
    });
}
    componentDidMount() {
        let btnCadastrar = document.getElementById("btnCadastrar");
        let self = this;

        btnCadastrar.addEventListener('click', function (event) {
            event.preventDefault();
       
            self.gravaDados();
        

        })
    }

    gravaDados = () => {

        let URL = 'http://patanajanta.test/api';
        let endPoint = '/usuario/cadastrar';

        URL += endPoint;
        let btnCadastrar = document.getElementById("btnCadastrar");

        let nome = document.getElementById('txtNome');
        let sobrenome = document.getElementById('txtSobrenome');
        let CPF = document.getElementById('txtCPF');
        let cbbGenero = document.getElementById('cbbGenero');
        let txtDataNasciemnto = document.getElementById('dataNascimento');
        let txtCelular = document.getElementById('txtCelular');
        let txtEmail = document.getElementById('txtEmail');
        let txtSenha = document.getElementById('txtSenha');
        let txtConfSenha = document.getElementById('txtConfSenha');
        let cpfFormatado;
        let self = this;
        let cbbGeneroValue = cbbGenero.options[cbbGenero.selectedIndex].value
        
        /* btnCadastrar.disabled = true;
        this.setState({ lblBotao: "Cadastrando..." }) */

        if (this.validaCampos()) {

            cpfFormatado = CPF.value;

            if (CPF.value.includes('-')) {
                do {
                    cpfFormatado = cpfFormatado.replace('-', '');
                } while (cpfFormatado.includes('-'))
            }
            if (CPF.value.includes('.')) {
                do {
                    cpfFormatado = cpfFormatado.replace('.', '');
                } while (cpfFormatado.includes('.'))

            }

            Swal.fire({
                title: 'Aguarde um momento...',
                text: 'Cadastrando dados...',
                icon: 'info',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false
            });

            axios({
                method: 'post',
                url: URL,
                timeout: 15000,

                data: {
                    nome: nome.value,
                    sobrenome: sobrenome.value,
                    CPF: cpfFormatado,
                    genero: cbbGeneroValue,
                    data_nascimento: txtDataNasciemnto.value,
                    telefone: txtCelular.value,
                    email: txtEmail.value,
                    senha: txtSenha.value
                }
            }).then(function (resposta) {
                console.log(resposta.data)
                
                if(resposta.data.status == 'sucesso'){
                    Swal.fire({
                        title: 'Sucesso',
                        text: 'Usuário cadastrado com sucesso!',
                        icon: 'success',
                        customClass: 'swal-wide',
                        showConfirmButton: true,
                        confirmButtonColor: "#B86360",
                    }).then(()=>{
                        let currentURL = window.location.href;
                        let domain = currentURL.split("/");
    
                        window.location.replace(domain[0] + "#/login");
                    });
                }
                else{
                    self.swall(resposta.data.status);
                }

            }).catch(function (erro) {
                Swal.fire({
                    title: 'Erro',
                    text: erro,
                    icon: 'error',
                    customClass: 'swal-wide',
                    showConfirmButton: true,
                    confirmButtonColor: "#B86360",
                });

                /* btnCadastrar.disabled = false;
                self.setState({ lblBotao: "Cadastrar" }) */
            })

        }

        /* btnCadastrar.disabled = false;
        self.setState({ lblBotao: "Cadastrar" }) */
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

                <form id="formulario-cadastro" >
                    <div className="container formulario">
                        <div className="row">
                            <div className="col-12">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">

                                            <h5>Nome</h5>


                                            <input name="nome" type="text" className={`form-control nome-form`} placeholder="Digite seu nome"
                                                required id='txtNome' />


                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Sobrenome</h5>

                                            <input name="sobrenome" type="text" className={`form-control sobrenome-form`}
                                                placeholder="Digite seu sobrenome" required id='txtSobrenome' />

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>CPF</h5>
                                            <input name="cpf" maxLength="15" type="text" className={`form-control cpf-form`}
                                                placeholder="Digite seu CPF" required id='txtCPF' />

                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Gênero</h5>
                                            <select name="genero" className="form-control" id="cbbGenero">
                                                <option value="NULL">Selecione uma opçao</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Feminino">Feminino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5> Data de nascimento</h5>
                                            <input name="dataNasc" type="date" className={`form-control dtNascimento-form`}
                                                placeholder="Digite sua data de nascimento" required id='dataNascimento' />
                                            {/*  <div id='resposta' style='display:inline'></div> */}
                                        </div>

                                        <div className="col-12 col-sm-6 col-lg-6">
                                            <h5>Telefone celular</h5>
                                            <input name="telefone" type="tel" className="form-control tel-form"
                                                placeholder="00 000000000" maxLength="12"  required id='txtCelular' />

                                        </div>
                                    </div>


                                </div>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <h5> Email</h5>
                                            <input name="email" type="email" className="form-control email-form" placeholder="Digite um email válido"
                                                required id='txtEmail' />

                                        </div>

                                        <div className="col-12 col-sm-6">
                                            <div className="row">
                                                <div className="col-12 col-sm-6">
                                                    <h5>Senha</h5>

                                                    <input name="senha" type="password" className={`form-control`} name="senha"
                                                        placeholder="Crie uma senha" required id='txtSenha' />
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <h5>Confirmar</h5>
                                                    <input name="confirmSenha" type="password" className={`form-control confsenha-form`} name="senha1"
                                                        placeholder="Confirme a senha" required id='txtConfSenha' />

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
                                <button className="btn btn-cadastrar" type="submit" id='btnCadastrar'>{this.state.lblBotao}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}