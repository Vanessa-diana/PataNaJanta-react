import React, { Component } from 'react';
import './historicodepedido.css';
import Title from '../../components/Titulo/Title'
import Button from '../../components/Button/Button';
import axios from 'axios';
import {protegeLogin} from '../../main/protegeRotas'



export default class HistoricoDePedido extends Component{

    constructor(props){
        super(props);

        protegeLogin('usuario');
    }

    state = {
        historico: [],
        user:''
      }

      componentDidMount() {

        this.historico();
        
    }

    historico = ()=>{
        let URL = 'http://patanajanta.test/api/historico/listar/'
        this.state.user = JSON.parse(localStorage.getItem('usuario'));
        URL += this.state.user.id;

        axios.get(`${URL}`)
        .then(resp => this.setState({historico: resp.data}))
    }

 
render() {
    return ( 

    <div className="container conteudo">
        <div className="row mt-3">
            <div className="col-12">
                <Title title="Histórico do Pedido" style="titulo-principal" />
                <small> Acompanhe seu pedido</small>
            </div>
        </div>
        <div className="row mb-2 text-center">
            {this.state.historico.map(item =>(
            <div className="col-12 col-md-6 col-xl-6 card-group mt-3">
                <div className="card">
                    <div className="card-body col-12 text-left">
                        <h6 className="titulo">Pedido {item.numero_pedido} </h6>
                        <hr/>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h6 className="subtitulo">Pagamento</h6>
                                <p>{item.formaPagamento}</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h6 className="subtitulo">Total Pedido</h6>
                                <p>{item.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h6 className="subtitulo">Data adicionada</h6>
                                <p>{item.data_emissao.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')}</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h6 className="subtitulo">Status do Pedido</h6>
                                <p>{item.descricaoStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className="col-12 col-md-7 col-xl-6 mt-4 mb-5 text-left">
            <a href="/home"><Button style="btn-secundario" title="Voltar" type="submit"/></a>
        </div>
        </div>
    )}

}    

