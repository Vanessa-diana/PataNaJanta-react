import React from 'react'
import '../Card/card.css'
import RacaoCachorro from '../../images/racaoCachorro.png'





{/* /* <!-- DIV DE CONTEUDO DA PAGINA--> */ }
export default props => (
    <div className="container">
      
    
        {/* INICIANDO CARDS */}
        <div className="row custom-cards">
            <div className="col-lg-3 col-md-6 col-sm-12">
<<<<<<< HEAD
                <div className="card teste1">
                    <img className="card-img-top teste2 img-fluid" src={RacaoCachorro} alt="racao-adulto-special-15kg-golden-3310549-15kg" />
                    <div className="card-body teste3">
=======
                <div className="card card-do-card">
                    <img className="card-img-top img-fluid" src={RacaoCachorro} alt="racao-adulto-special-15kg-golden-3310549-15kg" />
                    <div className="card-body body-card">
>>>>>>> c8063bf3c7f7f5c37a6d9928df0ab8831851dbec
                        <div className="container limiteLinhas">
                            <h6 className="card-title">Ração para Cães Adultos Golden premium...</h6>
                        </div>
                        <p className="card-text">R$ 109,90</p>
                        <a href="detalhes-produto.html" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
