import React from 'react'
import '../Menu/menu.css'

export default props =>

<div class="row navBar">
    <div class="col-md-2 col-12 btn-nav">
        <ul class="nav nav-pills">
        <li class="nav-item dropdown text-center menu" style={{textDecoration: 'none', alignItems: 'center'}}>
                <a class="nav-link dropdown-toggle mt-2 linksNavTitulo" data-toggle="dropdown" href="file:///home/aluno/%C3%81rea%20de%20Trabalho/Treinamento%20RD/Projeto%20Integrador/GIT%20-%20Pata%20na%20Janta/PatanaJanta/header/header.html#" role="button" aria-haspopup="true" aria-expanded="false" style={{backgroundColor: '#b86360'}}>Cachorro</a>
                <div class="dropdown-menu menu" >
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Alimentação</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Conforto</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Brinquedos</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Passeio</a>
                </div>
            </li>    
        </ul>
    </div>
    <div class="col-md-2 col-12 btn-nav">
        <ul class="nav nav-pills">
        <li class="nav-item dropdown text-center menu" style={{textDecoration: 'none', alignItems: 'center'}}>
                <a class="nav-link dropdown-toggle mt-2 linksNavTitulo " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{backgroundColor: '#b86360'}}>Gato</a>
                <div class="dropdown-menu menu">
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Alimentação</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Conforto</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Brinquedos</a>
                    <a class="dropdown-item linkNav" href="resultado-produto.html">Ambiente</a>
                </div>
            </li>    
        </ul>
    </div>
    <div class="col-md-2 offset-md-4 col-12 text-center pt-3">
        <a class="text-center link-menu" href="adote-pet.html">Adote um pet</a>
    </div>
    <div class="col-md-2 col-12 text-center pt-3">
        <a class="text-center link-menu" href="fale-conosco.html">Contatos</a>
    </div>
</div>
