import React from 'react'
import '../Card/card.css'
import RacaoCachorro from '../../images/racaoCachorro.png'





{/* /* <!-- DIV DE CONTEUDO DA PAGINA--> */ }
export default props => (
   
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card card-do-card">
                    <img className="card-img-top img-fluid" src={RacaoCachorro} alt="racao-adulto-special-15kg-golden-3310549-15kg" />
                    <div className="card-body body-card">
                        <div className="container limiteLinhas">
                            <h6 className="card-title limiteLinhas">{props.descricao}</h6>
                        </div>
                        <p className="card-text">{props.preco}</p>
                        <a href="detalhes-produto.html" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
      

)
