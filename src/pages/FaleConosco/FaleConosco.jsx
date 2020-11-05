import React, { Component } from 'react';
import './faleconosco.css';
import axios from 'axios';
import Title from '../../components/Titulo/Title'
import Button from '../../components/Button/Button'
import Swal from 'sweetalert2';

let url = 'http://patanajanta.test/';

export default class FaleConosco extends Component {

    state = {
        lbl_botao: "Enviar"
    }

    swall = (mensagem) =>{
        Swal.fire({
            title: 'Atenção!',
            html: mensagem,
            icon: 'warning',
            confirmButtonColor: "#B86360",
            confirmButtonText: 'OK'
        });
    }

    componentDidMount = () => {

        let btn = document.getElementById('btnfale');
        let nome = document.getElementById('txtnome');
        let sobrenome = document.getElementById('txtsobrenome');
        let email = document.getElementById('txtemail');
        let mensagem = document.getElementById('txtmensagem');

        var self = this;
        btn.addEventListener("click", function (event) {
            event.preventDefault();

            if (nome.value.length == 0) {
                self.swall("O campo nome não pode estar vazio!")
                return
            }
            if (sobrenome.value.length == 0) {
                self.swall("O campo Sobrenome não pode estar vazio!")
                return
            }
            if (email.value.length == 0) {
                self.swall("O campo E-mail não pode estar vazio!")
                return
            }
            if (mensagem.value.length == 0) {
                self.swall("O campo Mensagem não pode estar vazio!")
                return
            }

            btn.disabled = true;
            self.setState({ lbl_botao: "Enviando Mensagem" });

            url += `api/faleconosco/email/enviar/${nome.value} ${sobrenome.value}/${email.value}/${mensagem.value}`;

            axios.get(url).then(function (resposta) {

                btn.disabled = false;
                if (resposta.data.status == "Sucesso") {
                    let array = [nome, sobrenome, email, mensagem]
                    for (let i = 0; i < array.length; i++) {
                        array[i].value = '';
                    }
                    Swal.fire({
                        title: 'Sucesso!',
                        html: "Mensagem enviada com Sucesso.",
                        icon: 'success',
                        confirmButtonColor: "#B86360",
                        confirmButtonText: 'OK'
                    });

                    self.setState({ lbl_botao: "Enviar" });
                    return
                }
                self.setState({ lbl_botao: "Enviar" });
                self.swall("Houve um erro ao enviar a mensagem, tente novamente mais tarde.")

            }).catch(erro => {
                btn.disabled = false;
                self.setState({ lbl_botao: "Enviar" });
                self.swall("Houve um erro ao enviar a mensagem, tente novamente mais tarde.")

            })
            url = 'http://patanajanta.test/';
        })
    }

    render() {
        return (
            <>
            <div className='containerprincipal'>
                <span className = 'space'></span>
                <Title title="Fale Conosco" style="textotitulo" />
                
                {/* container maior textos, input's  */}
                <div className='containergrande '>
                    <div className="col-12 texto">
                        <p className='espaco'> É super simples conversar com a gente. </p>

                        <p>Nosso setor não medirá esforço na busca contínua e
                        satisfação dos nossos clientes.</p>

                        <p>Nosso canal de atendimento é através do telefone (11) 4002 8922, ou se preferir, basta preencher o
                        formulário abaixo e retornaremos mais breve possivel.</p>

                        <p>Horário de atendimento:</p>

                        <p>De segunda a sexta das 9h às 19h (exceto feriados). </p>
                    </div> 
                    <span className = 'space'></span>    
                <form action=''>
                    <div className='col-12'>
                            <div className='row'>
                                <div className='col-sm-6 col-12'>

                                    <div className='form-group formulariofale'>
                                        <label for='exampleFormControlInput1'>Nome</label>
                                        <input type='text' className='form-control' id='txtnome'
                                            placeholder='Primeiro Nome' required />
                                    </div>
                                    <div className='form-group formulariofale'>
                                        <label for='exampleFormControlInput1'>Sobrenome</label>
                                        <input type='text' className='form-control' id='txtsobrenome'
                                            placeholder='Sobrenome ' required />
                                    </div>
                                    <div className='form-group formulariofale' >
                                        <label for='exampleFormControlInput1'>Endereço de email</label>
                                        <input type='email' className='form-control' id='txtemail'
                                            placeholder='nome@exemplo.com' name='email' required />
                                    </div>
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <div className='form-group col-12 formulariofale ' >
                                        <label for='exampleFormControlTextarea1'>Mensagem</label>
                                        <textarea className='form-control texterea' id='txtmensagem' rows='8'
                                            placeholder='Digite aqui sua mensagem' required ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-12 mt-5 divbotaofale' >
                            
                        <Button style="btn-padrao" type="submit" id="btnfale" title={this.state.lbl_botao}  />

                        </div>
                        <span className='space'></span>
                    </form>
                </div>
                <span className='space'></span>
            </div>
        </>
        )
    }

}