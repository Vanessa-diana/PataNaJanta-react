import React, { Component } from 'react'
import Title from '../../components/Titulo/Title'
import '../Endereco-cliente/enderecoCliente.css'
import axios from 'axios';

export default class EnderecoCliente extends Component{

    state = {
        enderecos: [],
        user:'',
        texto: 'Procurando endereços...',
        img: ''
       
    }

      componentDidMount() {

        this.buscarEndereco();
        
    }

    buscarEndereco = ()=>{
        let URL = 'http://patanajanta.test/api/endereco/buscar/'
        this.state.user = JSON.parse(localStorage.getItem('usuario'));
        URL += this.state.user.id;

        axios.get(`${URL}`)
        .then(resp => {
            this.setState({enderecos: resp.data})
            
        })
        .catch(error => {
            this.setState({texto: 'Não há endereços cadastrados'})
            this.setState({img:'https://i.ibb.co/WngpGsR/05b399773502ff839bf2183a22ae8253.gif'})
            
        })

      }
 
    removerEndereco = (endereco) =>{
        let URL = 'http://patanajanta.test/api/endereco/deletar'
        axios.delete(`${URL}/${endereco.id}`)
        .then(resp => window.location.reload(false));      
                                    
    }

    editarEndereco = (item) =>{
       localStorage.setItem('enderecoAtual',JSON.stringify(item))
                           
    }

    render() {
        if(this.state.enderecos == 0){
            return <> 
            <div className="row mt-5">
                        <div className="col-12">
                            <Title title={this.state.texto} style="titulo-card ml-1 text-center"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-2">
                            <img src={this.state.img}/>
                        </div>
                  </div>
                  </> 
       
                         
    }return <div className="container">
                    <div className="row mt-5">
                        <div className="col-12">
                            <Title title="Meus endereços cadastrados" style="titulo-card ml-1 mt-3"/>
                        </div>
                    </div>
                    <div className="row mb-2 text-center">
                        {this.state.enderecos.map(item =>(
                        <div  key = {item.id} className="col-5 col-md-5 col-xl-5 card-group ml-2">
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
                                    <div className="row no-gutters mt-2">
                                        <div className="col-8 d-flex justify-content-end">
                                          <a href='#/formendereco'><button className= 'btn bt-botao mb-2'onClick={(id) => this.editarEndereco(item)}>Editar</button></a>
                                        </div>
                                        <div className="col-4 d-flex justify-content-end">
                                           <button className= 'btn bt-botao mb-2' onClick={(id) => this.removerEndereco(item)}>Remover</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

        }
}
