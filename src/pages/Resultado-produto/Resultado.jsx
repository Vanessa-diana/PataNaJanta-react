

import React, {Component} from 'react';
import axios from 'axios'
import '../Resultado-produto/Resultado.css';
import Card from './../../components/Card/Card'
import Botao from '../../components/Button/Button'
import '../../components/Card/card.css'

const URL = 'http://patanajanta.test/api/produto/maisvendido/gato'

const URLCATEGORIA = 'http://patanajanta.test/api/produto/listar/'

const URLPORTERMO = 'http://patanajanta.test/api/produto/buscarProdutoTermo/'

// Route::get('produto/listar/{descricaoTipoProduto}/{descricaoCategoriaProduto}'

//RECUPERAR CATEGORIA E TIPO PRODUTO DA API localstorage, vai ser pego do local storage pelo header quando clicar

//o like deve pegar o input como parametro e consumir no card

//Route::get('produto/buscarProdutoTermo/{termo}


const list =  [];

const listaprodtermo = [];



export default class Resultado extends Component {
   
    //construtor da classe:
   constructor(props){

        super(props)
    
        this.state = {  list: [], listaprodtermo:[] }

        this.getCategorias();

        this.getProdutotermo();

     

    }
   



    refresh = () => {
      
    
       //if o like(barra de pesquisa) tiver null entao faca abaixo
       return this.state.list.map((item => {
         return <Card image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} /> 
 


       }))
  


   }


   getProdutotermo = () => {


       axios.get(`${URLPORTERMO}`)
       .then(resp => this.setState({listaprodtermo: resp.data}))   //mais o termo value do header
                                                                  //seta o valor diplay pro pai
         //   {BarraPesquisa valor={this.state.ValorDisplay}    //componentizar a barra e atribuir pro atributo daqui

          // this.setState({barra: {BarraPesquisa.valor}})

   }



   getCategorias = () => {


       axios.get(`${URL}`)
       .then(resp => this.setState({list: resp.data}))

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
                        <h4 >FILTRAR</h4>
                       
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

                        <Botao title="Filtrar" style="btn-padrao primary btn-block btnfiltrar" />

                        {/* <a href="#" class="btn btn-primary btn-block btnfiltrar" >Filtrar</a> */}
                       
                        </div>
                    </div>
    
                </div>
               

                <div class="col-9 cardes">

                        <div class="row">
                            {this.refresh()}
                            
                        </div>
                
                </div>

             </div>
                 
               
  


</>


        )
    }
}








    










