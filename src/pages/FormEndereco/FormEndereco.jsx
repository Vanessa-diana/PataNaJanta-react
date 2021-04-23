import React, { Component } from 'react'
import axios from 'axios';
import '../FormEndereco/formEndereco.css'
import Swal from 'sweetalert2';
import {protegeLogin} from '../../main/protegeRotas'


export default class FormEndereco extends Component {
   

    constructor(props) {
        super(props);

        protegeLogin('usuario');
        
        let enderecoAtual = JSON.parse(localStorage.getItem('enderecoAtual'));  
        this.state = {
            
            cep: enderecoAtual.CEP,  
            rua: enderecoAtual.rua,
            numero: enderecoAtual.numero,
            bairro:enderecoAtual.bairro,
            cidade: enderecoAtual.cidade,
            UF: enderecoAtual.UF, 
                       
        };
             
    }
  
    
    alteraEndereco = (event) => {
        let nome = event.target.name;
        let valor = event.target.value;
        this.setState({[nome]: valor});
    }

    buscarEndereco = ()=>{
        let URL = 'http://patanajanta.test/api/endereco/buscar/'
        this.state.user = JSON.parse(localStorage.getItem('usuario'));
        URL += this.state.user.id;

        axios.get(`${URL}`)
        .then(resp => (resp.data))
            
    }

    atualizar = (e) => {
        e.preventDefault()
        let URL = 'http://patanajanta.test/api/endereco/atualizar/'
        let json = this.state;
        let enderecoAlterado = JSON.parse(localStorage.getItem('enderecoAtual'));  
        URL += enderecoAlterado.id;
        axios.put(`${URL}`,json)
           .then(this.buscarEndereco());

        //Alerta de endereço salvo

        Swal.fire({
            title: 'Sucesso!',
            icon: 'success',
            text: 'Endereço salvo com sucesso',
            buttons: 'OK',
            confirmButtonColor: "#b86360",
            timer: 40000,

             
        }).then(function(isConfirm) {
            if (isConfirm) {
                window.location.href = '#/enderecocliente'
            }  
        })        
                   
    }

render() {
        
    return (
           
        <div className="container formulario-endereco mt-3">
                <div className="col-12">
                    <h2 className="titulo-endereco">Editar Endereço</h2>
                    <form onSubmit={this.atualizar} className= 'label-form'> 
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1"for="cep">CEP </label>
                            <input name="cep" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12"  id="cep" defaultValue={this.state.cep}/>
                        </div>
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1" for="rua">Rua</label>
                            <input name= "rua" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12" id="rua" defaultValue={this.state.rua}/>
                        </div>
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1" for="numero">Número</label>
                            <input name= "numero" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12" id="numero" defaultValue={this.state.numero}/>
                        </div>
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1" for="bairro">Bairro</label>
                            <input name="bairro" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12" id="bairro" defaultValue={this.state.bairro}/>
                        </div>
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1" for="cidade">Cidade</label>
                            <input name="cidade" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12" id="cidade" defaultValue={this.state.cidade}/>
                        </div>
                        <div class="form-group row text-center">
                            <label className= "col-12 col-xl-1" for="UF">UF</label>
                            <input name="UF" type="text" onChange={this.alteraEndereco} className="input form-control col-xl-10 col-12" id="UF" defaultValue={this.state.UF}/>
                        </div>
                        <div className="row text-center">
                            <div className="col-12 col-md-6 mt-2">
                                <input type="submit" className= 'btn btn-padrao btn-form' value="Salvar"/>
                            </div>
                            <div className="col-12 col-md-6 mt-2">
                                <a href="#enderecocliente"><input type="text" className= 'btn btn-secundario btn-form' value="Cancelar"/></a> 
                            </div>
                       </div>
                    </form>
                </div>
            </div>
        )
    }   
}  


   


