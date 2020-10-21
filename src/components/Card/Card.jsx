import React from 'react'
import '../Card/card.css'
import Banner4 from '../../images/banner4.png';
import RacaoCachorro from '../../images/racaoCachorro.png'
import RacaoGato from '../../images/racaoGato.png'



{/* /* <!-- DIV DE CONTEUDO DA PAGINA--> */ }
export default props => (
    <>
    <div className="container">
        <div className="mvendido mt-3">
            <h1><strong>Mais Vendidos</strong></h1>
        </div>
        <div className="pcachorro mt-3">
            <h2>Para seu cachorro</h2>
        </div>

        {/* INICIANDO CARDS */}
        <div className="row custom-cards">
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src={RacaoCachorro} alt="racao-adulto-special-15kg-golden-3310549-15kg" />
                    <div className="card-body">
                        <div className="container limiteLinhas">
                            <h6 className="card-title">Ração para Cães Adultos Golden premium...</h6>
                        </div>
                        <p className="card-text">R$ 109,90</p>
                        <a href="detalhes-produto.html" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
        </div>

        {/* <!--comeco - banner--> */}
        <div className="row">
            <div className="col-12 mt-2">
                <img className="img-fluid" src={Banner4} />
            </div>
        </div>
    

  {/* <!--fim - banner-->  */}
<div className="pgato mt-2">
    <h2>Para seu gato</h2>
</div>
    <div className="row custom-cards mb-2">
        <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card">
                <img className="card-img-top img-fluid" src={RacaoGato} alt="Card image cap" />
                <div className="card-body">
                    <div className="container limiteLinhas">
                        <h5 className="card-title">Ração Úmida Gran Plus Gatos Castrados Frango</h5></div>
                    <p className="card-text">R$ 2,39</p>
                    <a href="#" className="btn btn-comprar">Comprar</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</>
)
