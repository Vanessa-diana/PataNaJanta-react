import React, { Component } from 'react';
import './faleconosco.css';
import axios from 'axios';

let url = 'http://patanajanta.test/';

export default class FaleConosco extends Component {

    state = {
        lbl_botao:"Enviar"
    }


    componentDidMount = () =>
     {

        let btn = document.getElementById('btnfale');
        let nome = document.getElementById('txtnome');
        let sobrenome = document.getElementById('txtsobrenome');
        let email = document.getElementById('txtemail');
        let mensagem = document.getElementById('txtmensagem');

        var self = this;
        btn.addEventListener("click", function (event) {
            event.preventDefault();

            if (nome.value.length == 0){
                alert("O campo nome não pode estar vazio!")
                return
            }
            if (sobrenome.value.length == 0){
                alert("O campo Sobrenome não pode estar vazio!")
                return
            }
            if (email.value.length == 0){
                alert("O campo E-mail não pode estar vazio!")
                return
            }
            if (mensagem.value.length == 0){
                alert("O campo Mensagem não pode estar vazio!")
                return
            }

            btn.disabled=true;
            self.setState({lbl_botao:"Enviando Mensagem"});
            
            url += `api/faleconosco/email/enviar/${nome.value} ${sobrenome.value}/${email.value}/${mensagem.value}`;

            axios.get(url).then(function (resposta) {
                
                btn.disabled=false;
                if(resposta.data.status == "Sucesso"){
                    let array =[nome,sobrenome,email,mensagem]
                    for(let i = 0; i<array.length; i++){
                        array[i].value='';
                    }
                    alert("Mensagem enviada com Sucesso.")

                    self.setState({lbl_botao:"Enviar"});
                    return
                }
                self.setState({lbl_botao:"Enviar"});
                alert("Houve um erro ao enviar a mensagem, tente novamente mais tarde.")

            }).catch(erro=>{
                btn.disabled=false;
                self.setState({lbl_botao:"Enviar"});
                alert("Houve um erro ao enviar a mensagem, tente novamente mais tarde.")

            })
          url = 'http://patanajanta.test/';
        })
    }

    render() {
        return (
            <>


                <div className='container containerprincipal'>
                    <br /> <br /> <br />

                    <div>
                        <h1 className='textotitulo'>
                            Fale Conosco</h1>
                    </div>

                    {/* container maior textos, input's  */}
                    <div className='containergrande'>

                        <h6>
                            <p className='textop'> <br /> É super simples conversar com
                    a gente. <br />Nosso setor não medirá esforço na busca contínua e
                    satisfação dos nossos clientes. <br /> <br />

                    Nosso canal de atendimento é através do telefone (11) 4002 8922, ou se preferir, basta preencher o
                    formulário abaixo e retornaremos mais breve possivel. <br /> <br />

                    Horário de atendimento:

                    De segunda a sexta das 9h às 19h (exceto feriados). <br /><br />
                            </p>
                        </h6>

                        <form action=''>
                            <br />
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
                                <button className='btn btn-search botaofale' type='submit'
                                    id='btnfale' > {this.state.lbl_botao}
                                </button>
                            </div>

                            <br /><br />
                        </form>
                    </div>


                    <br /><br /><br />
                </div>

            </>
        )
    }

}