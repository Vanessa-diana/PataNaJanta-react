import React from 'react'
import '../Card/card.css'
/* import RacaoCachorro from '../../images/racaoCachorro.png' */
import Button from '../Button/Button'





{/* /* <!-- DIV DE CONTEUDO DA PAGINA--> */ }
export default props => (
<>
        {/* INICIANDO CARDS */}
       
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card card-do-card">
                    <img className="card-img-top img-fluid mt-2" src={props.image}/>
                    <div className="card-body body-card">
                        <div className="container limiteLinhas">
                            <div className="card-title">{props.nome}</div>
                        </div>
                        <p className="card-text">R$ {props.preco}</p>
                        <Button style="btn-comprar" title="Comprar"/>
                    </div>
                </div>
            </div>   
</>
)
