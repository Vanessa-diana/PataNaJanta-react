import React, { Component } from 'react'
import Title from '../../components/Titulo/Title'
import '../Endereco-cliente/enderecoCliente.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import {protegeLogin} from '../../main/protegeRotas'
import Button from '../../components/Button/Button';


export default class EnderecoCliente extends Component{


    constructor(props) {
        super(props);

        protegeLogin('usuario');

        this.state = {
            enderecos: [],
            user:'',
            texto: 'Procurando endereços...',
            img: ''
           
        }

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

        //Alerta de confirmação

        Swal.fire({
            title: 'Atenção!',
            icon: 'warning',
            text: 'Deseja realmente remover o endereço cadastrado?',
            confirmButtonText: 'Remover',
            showCancelButton: true,
            confirmButtonColor: "#b86360",
            cancelButtonText: 'Cancelar'
                           
        }).then((result) => {
            if (result.isConfirmed) {
                let URL = 'http://patanajanta.test/api/endereco/deletar'
                axios.delete(`${URL}/${endereco.id}`)
                .then(resp => resp.data);

                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Endereço removido',
                    buttons: 'OK',
                    confirmButtonColor: "#b86360",

                    }).then(function(isConfirm) {
                        if (isConfirm) {
                            window.location.reload(false)
                    }  
                })       

            }else if (result.isDenied) {
                window.location.href = '#/enderecocliente'
              }  
        })        
                   
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
                            <Title title="Seus endereços cadastrados" style="titulo-card ml-1 mt-3"/>
                        </div>
                    </div>
                    <div className="row mb-2 text-center">
                        {this.state.enderecos.map(item =>(
                        <div  key = {item.id} className="col-12 col-md-5 col-xl-5 card-group ml-2">
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
                                    <div className="row mt-2">
                                        <div className="col-12 col-sm-8 col-xl-8 col-md-6 d-flex justify-content-end">
                                          <a href='#/formendereco'><button className= 'btn bt-botao mb-2'onClick={( ) => this.editarEndereco(item)}>Editar</button></a>
                                        </div>
                                        <div className="col-12 col-sm-4 col-xl-4 col-md-6 d-flex justify-content-end">
                                           <button className= 'btn bt-botao mb-2' onClick={( ) => this.removerEndereco(item)}>Remover</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="col-12 col-md-7 col-xl-6 mt-4 mb-5 text-left">
                        <a href="/#seuespaco"><Button style="btn-secundario" title="Voltar" type="submit"/></a>
                    </div>        
               </div>
        }
}
