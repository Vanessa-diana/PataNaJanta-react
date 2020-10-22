import React from 'react'
import  '../SucessoPedido/sucesso.css'
import SucessoCompra from '../../images/sucesso-compra.png'


/* <!-- INICIO SUCESSO DE COMPRAS --> */

export default props => (
    <>
    <div class="container div-principal">
        <div class="row">
            <div class=" col-12 col-sm-12 col-da-imagem">
                <img src={SucessoCompra} alt="" class="img-fluid mb-3 mt-4" />
            </div>
        </div>

        <div class="row text-center paragrafo">
            <div class="col-12">
                <p>
                    PEDIDO FINALIZADO COM SUCESSO!!
                    <br />
                    Numero do seu pedido é: 123456-7
                </p>

                <p >
                    Obrigado por comprar na nossa loja.
                </p>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5 text-center">
                <a href="#/home">
                    <button class=" col-md-12 col-12 btn mb-4 sucessoDeCompras " type="submit"> Voltar
                    </button>
                </a>
            </div>
        </div>
    </div>
 <br/>
 </>
)
         
