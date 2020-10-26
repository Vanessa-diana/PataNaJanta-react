

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

let resultado = JSON.parse(localStorage.getItem('resultadoPesquisa'));

let filtroresultado = localStorage.getItem('filtroresultado');

let animal = localStorage.getItem('animal'); //vai 1, 2 ou 3 - 1 cachorro, 2 gato e 3 gato e cachorro

let filtrovalor = localStorage.getItem('filtrovalor'); // vai pesquisar no map do card, se for 


//if (item.id_tipo = animal and item.valor < filtro valor ) //deixar pre selecionado +150 pra nao pesquisar nulo

//esse animal eu posso passar uma string se for os 2, colocar "1 && 2"

export default class Resultado extends Component {
   
    //construtor da classe:
   constructor(props){

        super(props)
    
        this.state = {  list: [], listaprodtermo:[] }

        this.getCategorias();

    
    }
   

    refreshFiltro = () =>{

      localStorage.removeItem('filtroresultado')
      localStorage.removeItem('animal')

      

      return resultado.map((item,index)=> {


//se for diferente de 1, se tiver false


          if(animal ==1){

                if(item.id_tipo ==1){
                
                  return <Card value={index} image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} /> 
            
                }

              }else if(animal ==2){

                if(item.id_tipo ==2){
                
                  return <Card value={index} image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} /> 
            
                }


              }else if(animal==3){

                if(item.id_tipo ==1 || item.id_tipo ==2 ){
                
                  return <Card value={index} image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} /> 
            
                }


              }





 })






     



    }
    


    refresh = () => {
      
      // localStorage.removeItem('key_da_propriedade')
      //criar um localstorage pr quando for true ele fazer um refresh2 com as condicionais de filtro, ai eu recarrego e na renderiza refresh 1 ou 2
      //aqui eu recarrego a pagina e mostro, pq o botao vai ser apertado e vai teer que recarregar
       //if o like(barra de pesquisa) tiver null entao faca abaixo
       
        localStorage.removeItem('filtroresultado')
        localStorage.removeItem('animal')
        

        return resultado.map((item,index)=> {

        
              return <Card value={index} image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} /> 
           
              
 

       })
  


   }

   componentDidMount() {

          var self = this
         
          let botaofiltrar = document.getElementById('btnfiltrarproduto');
          


          botaofiltrar.addEventListener('click', function(event){

            let checkcachorro = document.getElementById('checkcachorro');         
            let checkgato = document.getElementById('checkgato');

            if(checkcachorro.checked && checkgato.checked){
                localStorage.setItem('animal',3);
            }
            else if(checkcachorro.checked && checkgato.checked==false){
              localStorage.setItem('animal',1);

            }else if(checkcachorro.checked==false && checkgato.checked){
              localStorage.setItem('animal',2);
            }else if(checkcachorro.checked==false && checkgato.checked==false){
              localStorage.setItem('animal',3);
            }


         
              alert("clicou!")                    
          
                             

               localStorage.setItem('filtroresultado',true);

               window.location.reload(false);


          })
        

      }
   

      


      condicionalFiltroBusca = () => {

        if(filtroresultado=="true"){
         return this.refreshFiltro()

        }
        else{

         return this.refresh()
          
        }

      }



      //recarregar e star depois namesma funcao


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
                            <input id="checkcachorro" type="checkbox" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Cachorro</h6>
                      </div>
                       
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input id="checkgato" type="checkbox" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Gato</h6>
                      </div>
    
                      <hr/>
    
    
                     <h4 class="titulocategoria">Faixa de preço</h4>
    
                     <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkate20" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">Até R$20,00</h6>
                    </div>
                     
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkde20ate40" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$20,00 à R$40,00</h6>
                    </div>
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkde40ate70" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$40,00 à R$70,00</h6>
                    </div>
    
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkde70ate150" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">R$70,00 à R$150,00</h6>
                    </div>
    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input id="checkmaisde150" type="radio" aria-label="Checkbox for following text input"/>
                          </div>
                        </div>
                        <h6 class="tipo">Mais de R$150,00</h6>
                      </div>

                        <Botao id="btnfiltrarproduto" title="Filtrar" style="btn-padrao primary btn-block btnfiltrar" />

                        {/* <a href="#" class="btn btn-primary btn-block btnfiltrar" >Filtrar</a> */}
                       
                        </div>
                    </div>
    
                </div>
               

                <div class="col-9 cardes">

                        <div class="row">
                            
                            {   this.condicionalFiltroBusca()}
                            
                        </div>
                
                </div>

             </div>
                 
               
  


</>


        )
    }
}








    










