

import React, {Component} from 'react';
import axios from 'axios'
import '../Resultado-produto/Resultado.css';
import Card from './../../components/Card/Card'
import Botao from '../../components/Button/Button'

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
// resultado.sort();

let filtroresultado = localStorage.getItem('filtroresultado');

let animal = localStorage.getItem('animal'); //vai 1, 2 ou 3 - 1 cachorro, 2 gato e 3 gato e cachorro

let filtrovalor = localStorage.getItem('filtrovalor'); // vai pesquisar no map do card, se for 

let verificatipo = localStorage.getItem('verificatipo');

let titulo = localStorage.getItem('titulo');   

//if (item.id_tipo = animal and item.valor < filtro valor ) //deixar pre selecionado +150 pra nao pesquisar nulo

//esse animal eu posso passar uma string se for os 2, colocar "1 && 2"

export default class Resultado extends Component {
   
    //construtor da classe:
   constructor(props){

        super(props)
    
        this.state = {  list: [], listaprodtermo:[] }

        this.getCategorias();

    
    
    }

    btnCarrinho = (btnValue) => {

        try{
          //SALVA ITEM ATUAL NO LOCAL STORAGE
          let item = JSON.parse(localStorage.getItem('resultadoPesquisa'));
          localStorage.setItem('produto',JSON.stringify(item[btnValue]))

          //REDIRECIONA O USUARIO PARA A PAGINA DE DETALHES
          let currentURL = window.location.href;
          let domain = currentURL.split("/");

          window.location.replace(domain[0] + '#/detalhe');

          //ATUALIZA PAGINA DE DETALHES PARA LUPA FUNCIONAR
          window.location.reload(false);
      }catch(e){
          console.log(e);
      }
    }
   
    









    refreshFiltro = () =>{

      localStorage.removeItem('filtroresultado')
      localStorage.removeItem('animal')
      localStorage.removeItem('filtrovalor')
    

      return resultado.map((item,index)=> {

        //primeiro veê a faixa de preço, depois combina com o tipo de animal
        
            if(filtrovalor ==20){

                          if(animal ==1){

                            
                                if(item.id_tipo ==1 && item.vlr_aquisicao <=20){
                                
                                  return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                            
                                }

                              }else if(animal ==2){

                                if(item.id_tipo ==2 && item.vlr_aquisicao <=20){
                                
                                  return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                            
                                }


                              }else if(animal==3){

                                if((item.id_tipo ==1 || item.id_tipo ==2) && (item.vlr_aquisicao <=20)){
                                
                                  return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                            
                                }


                              }

           }else if(filtrovalor==40){

                          if(animal ==1){

                            if(item.id_tipo ==1 && item.vlr_aquisicao <=40){
                            
                              return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                        
                            }

                          }else if(animal ==2){

                            if(item.id_tipo ==2 && item.vlr_aquisicao <=40){
                            
                              return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                        
                            }


                          }else if(animal==3){

                            if((item.id_tipo ==1 || item.id_tipo ==2) && (item.vlr_aquisicao <=40)){
                            
                              return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                        
                            }


                          }



           }else if(filtrovalor==70){


                            if(animal ==1){

                              if(item.id_tipo ==1 && item.vlr_aquisicao <=70){
                              
                                return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                          
                              }

                            }else if(animal ==2){

                              if(item.id_tipo ==2 && item.vlr_aquisicao <=70){
                              
                                return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                          
                              }


                            }else if(animal==3){

                              if((item.id_tipo ==1 || item.id_tipo ==2) && (item.vlr_aquisicao <=70)){
                              
                                return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                          
                              }


                            }




           }else if(filtrovalor==150){


                        if(animal ==1){

                          if(item.id_tipo ==1 && item.vlr_aquisicao <=150){
                          
                            return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                      
                          }

                        }else if(animal ==2){

                          if(item.id_tipo ==2 && item.vlr_aquisicao <=150){
                          
                            return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                      
                          }


                        }else if(animal==3){

                          if((item.id_tipo ==1 || item.id_tipo ==2) && (item.vlr_aquisicao <=150) ){
                          
                            return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                      
                          }


                        }




           }else if(filtrovalor==1000){


                      if(animal ==1){

                        if(item.id_tipo ==1 && item.vlr_aquisicao >150){
                        
                          return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                    
                        }

                      }else if(animal ==2){

                        if(item.id_tipo ==2 && item.vlr_aquisicao >150){
                        
                          return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                    
                        }


                      }else if(animal==3){

                        if((item.id_tipo ==1 || item.id_tipo ==2) && (item.vlr_aquisicao >150) ){
                        
                          return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
                    
                        }


                      }





           } //fim if






      }) //fim do map







    } //fim refresh filtro
    

    pegarTitulo = () => {

        return titulo
      

    }




    refresh = () => {
      
      // localStorage.removeItem('key_da_propriedade')
      //criar um localstorage pr quando for true ele fazer um refresh2 com as condicionais de filtro, ai eu recarrego e na renderiza refresh 1 ou 2
      //aqui eu recarrego a pagina e mostro, pq o botao vai ser apertado e vai teer que recarregar
       //if o like(barra de pesquisa) tiver null entao faca abaixo
       
        localStorage.removeItem('filtroresultado')
        localStorage.removeItem('animal')
        localStorage.removeItem('filtrovalor')
        localStorage.removeItem('verificatipo')
        

        return resultado.map((item,index)=> {

        
              return <Card onClick={this.btnCarrinho} value={index} image={item.img_produto} nome={item.nome} preco={(item.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /> 
           
              
 

       })
  


   }

   componentDidMount() {

          var self = this
         
         

          let botaofiltrar = document.getElementById('btnfiltrarproduto');
      

            let checkcachorro = document.getElementById('checkcachorro');         
            let checkgato = document.getElementById('checkgato');
            //RADIO VALORES:
            let checkate20 = document.getElementById('checkate20');
            let checkate40 = document.getElementById('checkate40');
            let checkate70 = document.getElementById('checkate70');
            let checkate150 = document.getElementById('checkate150');
            let checkmaisde150 = document.getElementById('checkmaisde150');

            
            


            //EVENTOS DE HABILITAR E DESABILITAR RADIO BUTTONS:

            checkate20.addEventListener('change',function() {                
                checkate20.checked=true;
                checkate40.checked=false;
                checkate70.checked=false;
                checkate150.checked=false;
                checkmaisde150.checked=false;

            });
            checkate40.addEventListener('change',function() {                
              checkate20.checked=false;
              checkate40.checked=true;
              checkate70.checked=false;
              checkate150.checked=false;
              checkmaisde150.checked=false;

          });
            checkate70.addEventListener('change',function() {                
              checkate20.checked=false;
              checkate40.checked=false;
              checkate70.checked=true;
              checkate150.checked=false;
              checkmaisde150.checked=false;

          });
            checkate150.addEventListener('change',function() {                
              checkate20.checked=false;
              checkate40.checked=false;
              checkate70.checked=false;
              checkate150.checked=true;
              checkmaisde150.checked=false;

          });
            checkmaisde150.addEventListener('change',function() {                
              checkate20.checked=false;
              checkate40.checked=false;
              checkate70.checked=false;
              checkate150.checked=false;
              checkmaisde150.checked=true;

          });








          botaofiltrar.addEventListener('click', function(event){

            
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

            //IF DOS RADIOBUTTONS DE VALOR:

            if(checkate20.checked){
              localStorage.setItem('filtrovalor',20);
            }
            else if(checkate40.checked){
              localStorage.setItem('filtrovalor',40);

            }else if(checkate70.checked){
              localStorage.setItem('filtrovalor',70);
            }else if(checkate150.checked){
              localStorage.setItem('filtrovalor',150);
            }
            else if(checkmaisde150.checked){
              localStorage.setItem('filtrovalor',1000);
            }



         
              // alert("clicou!")                    
          
                             

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

            <div class="row" >
            <div class="col-md-12 col-12 text-center mt-4">
                <h2>Resultados de "{this.pegarTitulo()}"</h2>
            </div>
    
            </div>
    
    

   

            <div class="row">
            
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
                          <input id="checkate40" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">Até R$40,00</h6>
                    </div>
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkate70" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">Até R$70,00</h6>
                    </div>
    
    
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <input id="checkate150" type="radio" aria-label="Checkbox for following text input"/>
                        </div>
                      </div>
                      <h6 class="tipo">Até R$150,00</h6>
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








    










