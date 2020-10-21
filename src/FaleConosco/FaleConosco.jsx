import React from 'react'
import '../FaleConosco/faleconosco.css'



export default props =>
    
    
    
    <div className='container containerprincipal'>
      <br/> <br/> <br/>

        <div>
            <h1 className='textotitulo'>
                Fale Conosco</h1>
        </div>

        {/* container maior textos, input's  */}
        <div className='containergrande'>

            <h4>
                <p className='textop'> <br /> É super simples conversar com
                    a gente. <br />Nosso setor não medirá esforço na busca contínua e
                    satisfação dos nossos clientes. <br /> <br />

                    Nosso canal de atendimento é através do telefone (11) 4002 8922, ou se preferir, basta preencher o
                    formulário abaixo e retornaremos mais breve possivel. <br /> <br />

                    Horário de atendimento:

                    De segunda a sexta das 9h às 19h (exceto feriados). <br /><br />
                </p>
            </h4>

            <form action=''>
                <br />
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-sm-6 col-12'>

                            <div className='form-group formulario'>
                                <label for='exampleFormControlInput1'>Nome</label>
                                <input type='text' className='form-control' id='exampleFormControlInput1'
                                    placeholder='Primeiro Nome' required />
                            </div>

                            <div className='form-group formulario'>
                                <label for='exampleFormControlInput1'>Sobrenome</label>
                                <input type='text' className='form-control' id='exampleFormControlInput1'
                                    placeholder='Sobrenome ' required />
                            </div>

                            <div className='form-group formulario' >
                                <label for='exampleFormControlInput1'>Endereço de email</label>
                                <input type='email' className='form-control' id='exampleFormControlInput1'
                                    placeholder='nome@exemplo.com' name='email' required />
                            </div>
                        </div>

                        <div className='col-sm-6 col-12'>

                            <div className='form-group col-12 formulario ' >
                                <label for='exampleFormControlTextarea1'>Mensagem</label>
                                <textarea className='form-control texterea' id='exampleFormControlTextarea1' rows='8'
                                    placeholder='Digite aqui sua mensagem' required ></textarea>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='col-sm-12 col-12 mt-5 divbotaofale' >
                    <button className='btn btn-search botaofale' type='submit'
                    > Enviar
</button>
                </div>

                <br /><br />
            </form>
        </div>


        <br /><br /><br />
    </div>