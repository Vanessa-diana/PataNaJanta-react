import React, { Component } from 'react'
import Title from '../../components/Titulo/Title'
import '../Endereco-cliente/enderecoCliente.css'
import axios from 'axios';


export default class EnderecoCliente extends Component{

    state = {
        enderecos: [],
        user:''
      }

      componentDidMount() {

        this.buscarEndereco();
        
    }

    buscarEndereco = ()=>{
        let URL = 'http://patanajanta.test/api/endereco/buscar/'
        this.state.user = JSON.parse(localStorage.getItem('usuario'));
        URL += this.state.user.id;

        axios.get(`${URL}`)
        .then(resp => this.setState({enderecos: resp.data}))
    }

render() {
        return (    
            <div className="container">
                    <div className="row mt-5">
                        <div className="col-12">
                            <Title title="Seus endereços cadastrados" style="titulo-card ml-1"/>
                        </div>
                    </div>
                    <div className="row mb-2 text-center">
                        {this.state.enderecos.map(item=>(
                        <div className="col-5 col-md-5 col-xl-5 card-group ml-2">
                            {item.key}
                            <div className="card quadro mt-3">
                                <div className="card-body col-12 text-left">
                                    <div className="row">
                                        <div className="col-12">
                                            <strong className='campo'>CEP: </strong>
                                            <span className='dado'>{item.CEP}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <strong className='campo'>Endereço: </strong>
                                            <span className='dado'>{item.rua +', ' + item.numero + ' - '+ item.bairro + ' - ' + item.cidade + ' - ' + item.UF}</span>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

        )}
}

