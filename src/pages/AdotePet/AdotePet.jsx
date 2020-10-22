import React from 'react'
import './AdotePet.css';
import Cardpet from '../../components/AdotePet/cardPet'
import Francisco from '../../images/saofrancisco.jpeg'
import Amigo from '../../images/amigonaosecompra.jpg'
import Club from '../../images/clube.jpeg'

export default props => (

<>

    <div class="row titulo">
        <div class="col-md-12 col-12 text-center mt-4">
        <br /> <h2>Adote um Pet</h2>
        </div>
    </div>

    <Cardpet titulo='ONG Amigos de São Francisco' caminho={Francisco} descricao1='Somos uma Ong de São Paulo dedicada ao respeito aos animais de qualquer raça e espécie e que acredita que uma sociedade só estará em equilíbrio quando souber tratar com dignidade seus animais.'
    descricao2='Deseja adotar ou fazer parte dos Amigos de São Francisco? Clique abaixo e saiba como ajudar. ' site='http://amigosdesaofrancisco.com.br/' />
    <Cardpet titulo='Amigo não se compra' caminho={Amigo} descricao1='O Amigo não se Compra é um site em que ONGs e Protetores de todo o Brasil podem divulgar cães e gatos para adoção. O projeto existia informalmente desde 2012, mas em 2017 nos registramos oficialmente como uma Associação de adoção de caẽs e gatos! '
    descricao2='Clique abaixo para conhecer os bichinhos que estão esperando um lar!' site='https://www.amigonaosecompra.com.br/' />

    <Cardpet titulo='Club dos vira-latas' caminho={Club} descricao1='Nossa luta incansável em prol dos animais excluídos e mal tratados sempre será nosso objetivo principal. Contudo, sonhamos com o dia em que um abrigo como o "Clube dos Vira-Latas" não precisará existir, pois quando isso acontecer, todos terão um lar! '
    descricao2='Convidamos a todos que queiram conhecer nosso trabalho de perto, que visitem o abrigo. Clique abaixo e conheça!' site='https://www.clubedosviralatas.org.br/' />


</>


)








