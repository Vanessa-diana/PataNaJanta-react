import React, { Component } from 'react'
import  '../SucessoPedido/sucesso.css'
import SucessoCompra from '../../images/sucesso-compra.png'
import Button from '../../components/Button/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import {protegeLogin} from '../../main/protegeRotas'


/* <!-- INICIO SUCESSO DE COMPRAS --> */

let pedido = JSON.parse(localStorage.getItem('AAA'))

export default class SucessoPedido extends Component{

    constructor(props){
        super(props);

        protegeLogin('usuario');
    }

    state = {
        user:'',
        numeroPedido : ''
      }

      componentDidMount() {
         
           this.buscarPedido();

           Swal.fire({
            title: 'Aguarde um momento...',
            text: 'Finalizando processamento do pedido.',
            icon: 'info',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
    }

    buscarPedido = ()=>{
        let URL = 'http://patanajanta.test/api/historico/listar/'
        this.state.user = JSON.parse(localStorage.getItem('usuario'));
        URL += this.state.user.id;

        axios.get(`${URL}`)
        .then(resp => {
            let ultimo = resp.data[resp.data.length-1]
            this.setState({numeroPedido:ultimo.numero_pedido})

            this.enviaEmailPedido(ultimo.numero_pedido);
        })
     
    }


    enviaEmailPedido = (numeroPedido) => {
        let dadosCliente = JSON.parse(localStorage.getItem('usuario'));
        let URL = 'http://patanajanta.test/api';
        let endPoint = `/sucessopedido/email/enviar/${dadosCliente.nome}/${dadosCliente.email}/${numeroPedido}`
        URL += endPoint;

        axios.get(`${URL}`)
        .then(resp => {
            console.log('Email enviado com sucesso');
        })
        .catch((erro)=>{
            console.log('Erro ao enviar email = ' + erro);
        })

        Swal.close();
    }

render() {
    return ( 

    <div class="container div-principal">
        <div class="row">
            <div class=" col-12 col-sm-12 col-da-imagem">
                <img src={SucessoCompra} alt="" class="img-fluid mb-3 mt-4" />
            </div>
        </div>
        
        <div class="row text-center paragrafo">
            <div class="col-12">
                <h6>PEDIDO FINALIZADO COM SUCESSO!</h6>
            <div>
                <strong>Número do seu pedido é: {this.state.numeroPedido}</strong> 

            </div>
                <h6>Obrigado por comprar na nossa loja.</h6>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5 text-center">
                <a href="#/home">
                    <Button onClick = '#/home' title = 'Voltar' style = 'btn-secundario col-md-12 col-12 btn mb-4'/>
                </a>
            </div>
        </div>
    </div>


    )}
}
         
