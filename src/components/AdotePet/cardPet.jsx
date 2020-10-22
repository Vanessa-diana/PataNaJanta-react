import React from 'react'
import Botao from '../Button/Button'


export default props => (


    <div class="row cardspet ">
    <div class="col-md-4 col-12 text-center mt-4">
         <img class=" img-fluid" src={props.caminho} alt="Card image cap"/>
    </div>
    <div class="col-md-7 col-12 mt-4">
        <h4 class="text-center ">{props.titulo}</h4><br/>
        <p class="card-text">{props.descricao1}
        <br/>
        {props.descricao2}</p> <br/>
        <div class="text-center"><a target="blank" href={props.site} ><Botao title="Conhecer" style="btn-padrao text-center mb-3 conhecer" /></a></div>
    </div>

    </div>


)
