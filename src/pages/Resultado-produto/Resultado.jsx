

import React, {Component} from 'react';
import axios from 'axios'
import '../Resultado-produto/Resultado.css';
import Card from './../../components/Card/Card'


const URL = 'localhost:3004/todo'

export default class Resultado extends Component {
   
    //construtor da classe:
   constructor(props){

        super(props)
    

    }
   

   
    render() {
        return (
            
<>

            <div class="row titulo" >
            <div class="col-md-12 col-12 text-center mt-4">
                <h2>Resultados para "Produto procurado"</h2>
            </div>
    
            </div>
    
    

   

            <div class="row titulo">
            
                <div class="col-md-3 text-start  filtro" >
    
                    <div class="card filtrocard" >
                        <div class="card-body">
                        <h4 class="card-title">FILTROS</h4>
                       
                            <hr/>
    
                       <h4 class="titulocategoria" >Animal</h4>
    
                       <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Cachorro</h6>
                      </div>
                       
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Gato</h6>
                      </div>
    
                      <hr/>
    
    
                     <h4 class="titulocategoria">Faixa de preço</h4>
    
                     <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input type="checkbox" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">Até R$20,00</h6>
                    </div>
                     
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input type="checkbox" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$20,00 à R$40,00</h6>
                    </div>
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input type="checkbox" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$40,00 à R$70,00</h6>
                    </div>
    
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input type="checkbox" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$70,00 à R$150,00</h6>
                    </div>
    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Mais de R$150,00</h6>
                      </div>
                        <a href="#" class="btn btn-primary btn-block btnfiltrar" >Filtrar</a>
                        </div>
                    </div>
    
                </div>
               

                <div class="col-9 cardes">

                        <div class="row">
                            <Card /> 
                            <Card /> 
                            <Card /> 
                            <Card /> 
                            <Card /> 
                        </div>
                
                </div>

             </div>
                 
               
  


</>


        )
    }
}








    










