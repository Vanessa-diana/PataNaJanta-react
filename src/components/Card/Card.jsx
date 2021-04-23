import React from 'react'
import '../Card/card.css'
/* import RacaoCachorro from '../../images/racaoCachorro.png' */
import Button from '../Button/Button'
import ButtonCard from '../ButtonCard/ButtonCard'





{/* /* <!-- DIV DE CONTEUDO DA PAGINA--> */ }
export default props => (
<>
        {/* INICIANDO CARDS */}
       
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card card-do-card">
                    <img className="card-img-top img-fluid mt-2" src={props.image}/>
                    <div className="card-body body-card nome-produto">
                        <div className="container limiteLinhas">
                            <div className="card-title">{props.nome}</div>
                        </div>
                        <p className="card-text">{props.preco}</p>
                        <ButtonCard id={props.idBtn} value ={props.value} style="btn-padraoCard" title="Comprar" acao={props.onClick}/>
                    </div>
                </div>
            </div>   
</>
)
