import React, { Component } from 'react'
import '../Carrinho/carrinho.css'
import Button from '../../components/Button/Button'
import Title from '../../components/Titulo/Title'
import { event } from 'jquery';
import {protegeLogin} from '../../main/protegeRotas'


let carrinho = JSON.parse(localStorage.getItem('carrinho'));
let valor_total = 0;
let qtdItens = JSON.parse(localStorage.getItem("qtdItem"));

export default class Carrinho extends Component { 

    constructor(props){
        super(props);

        protegeLogin('carrinho');
    }
        
    state = {
        numero: 1
           
    }

    calculaQtdItensCarrinho = () =>{
        let qtdItens = JSON.parse(localStorage.getItem('qtdItem'));
        let totalItens=0;

        //SE QTDITENS FOR UM ARRAY VAZIO
        if(qtdItens==null){
            return 0;
        }

        //CASO O ARRAY NAO SEJA VAZIO
        for(let i=0; i<qtdItens.length; i++){
            totalItens+=qtdItens[i].item;
        }

        return totalItens;
    }

    aumentar = (index) =>{

        try{
            let input = document.getElementById(`quantidade-${index}`);
            
            //UPDATE LOCAL STORAGE ITENS
            let temp = [];
            let jsonQtd = JSON.parse(localStorage.getItem('qtdItem'));
            
            for(let i =0; i<jsonQtd.length; i++){
                
                if(i != index){
                    temp.push(jsonQtd[i]);
                }else{
                    let qtdAtualizado = jsonQtd[i].item+1;
                    let objQtd = {'item':qtdAtualizado};
                    temp.push(objQtd);
                }
            }

            localStorage.setItem('qtdItem', JSON.stringify(temp));


            //RECUPERA E SETA VALOR ATUALIZADO
            let qtdItens = JSON.parse(localStorage.getItem("qtdItem"));
            input.value = qtdItens[index].item;
            window.location.reload(false);

        }catch(e){
            console.log('ERRO AUMENTAR = ' + e)
        }
    }

    diminuir = (index) => {

        try{
            let input = document.getElementById(`quantidade-${index}`);
            let spamValue = document.getElementById(`spam-valor-${index}`)

            //UPDATE LOCAL STORAGE ITENS
            let temp = [];
            let jsonQtd = JSON.parse(localStorage.getItem('qtdItem'));
            
            for(let i =0; i<jsonQtd.length; i++){
                
                if(i != index){
                    temp.push(jsonQtd[i]);
                }else{
                    if(jsonQtd[i].item>1){
                        let qtdAtualizado = jsonQtd[i].item-1;
                        let objQtd = {'item':qtdAtualizado};
                        temp.push(objQtd);
                    }
                    else{
                        temp.push(jsonQtd[i]);
                    }
                }
            }

            localStorage.setItem('qtdItem', JSON.stringify(temp));


            //RECUPERA E SETA VALOR ATUALIZADO
            let qtdItens = JSON.parse(localStorage.getItem("qtdItem"));
            input.value = qtdItens[index].item;
            window.location.reload(false);

        }catch(e){
            console.log('ERRO DIMINUIR = ' + e);
        }

        /* this.setState({numero:this.state.numero -1})
        if((this.state.numero) <= 0) {
            return this.setState({numero:this.state.numero = 0})
        } */
    }

    componentDidMount()
    {
       
        let dadosProduto = JSON.parse(localStorage.getItem('carrinho'));

        this.setState({nome: dadosProduto.nome});
        this.setState({img: dadosProduto.img_produto});
        this.setState({preco: dadosProduto.vlr_aquisicao})
        this.setState({descricao: dadosProduto.descricao})
        this.calculaValorTotal();
    }

    excluirItemCarrinho = (index) => {

        //REMOVE QTD ITEM
        let tempQtd = [];
        let qtd = JSON.parse(localStorage.getItem('qtdItem'));

        for(let i = 0; i<qtd.length; i++){
            if(i != index){
                tempQtd.push(qtd[i]);
            }
        }
        localStorage.setItem('qtdItem', JSON.stringify(tempQtd));
        

        //REMOVE ITEM DO CARRINHO
        let temp = [];
        let itens = JSON.parse(localStorage.getItem('carrinho'));

        for(let i=0;i<itens.length;i++){

            if(i != index){
                temp.push(itens[i]);
            }
        }

        localStorage.setItem('carrinho',JSON.stringify(temp));
        window.location.reload(false);
    }

    calculaValorTotal = () =>{

        let dadosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
        let qtd = JSON.parse(localStorage.getItem('qtdItem'));
        
        try{
            for(let i=0;i<dadosCarrinho.length;i++){
                valor_total+=dadosCarrinho[i].vlr_aquisicao * qtd[i].item;
            }
        }catch(e){
            console.log('ERRO VALOR TOTAL = ' + e);
        }
    }


    render(){
        return (
            <div className="row">
                <div className="col-12 col-xl-8 col-md-6">
                    <Title title = "Meu carrinho" style = "titulo-carrinho mt-4 ml-2"/>
                        <p className="ml-2">Fornecido e entregue por Pata na Janta <b className="numero-itens">{this.calculaQtdItensCarrinho()}</b> itens</p>
                    
                    {/* <!-- LISTA DE ITENS ADICIONADOS--> */}
                    <div className="row">
                        
                       {carrinho.map((valor,pos)=>(
                       <div className="col-12">
                            <div className="card card-itens">
                                <div className="card-body row">
                                    <div className="col-12 col-sm-6 col-xl-2 text-center">
                                        <img className= "produtos img-fluid" src={valor.img_produto} alt="produto-carrinho" width="60%" height="60%"/>
                                    </div>
                                    <div className="col-12 col-sm-6 col-xl-4  mt-3">
                                        <h6>{valor.nome}</h6>
                                    </div>
                                    <div className="col-12 col-sm-4 col-xl-2 mt-3">
                                        <span >{valor.vlr_aquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-xl-2 mt-3">
                                        <div className='row text-center'>
                                         
                                                <div className="col-4 col-sm-3 text-right">
                                                    <button onClick={()=>this.diminuir(pos)} className='btn btn-quantidade'>-</button>
                                                </div>
                                                <div className="col-4 col-sm-4">
                                                    <input disabled className ='quantidade'type="text" name="quantidade" id={`quantidade-${pos}`} value = {qtdItens[pos].item}/>
                                                </div>
                                                <div className="col-4 col-sm-5 text-left">
                                                    <button onClick={()=>this.aumentar(pos)} className='btn btn-quantidade'>+</button>
                                                </div>
                                                
                                            <small onClick={()=>this.excluirItemCarrinho(pos)} className="col-12 text-center excluir-produto mt-3">excluir</small>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 col-xl-2 mt-3">
                                        <strong><span id={`spam-valor-${pos}`}>{(qtdItens[pos].item * valor.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                       ))}   

                    </div>
                </div>
                <div class="col-12 col-xl-4 col-md-6">
                    <div className="col-12 resumo-pedido mt-2">
                        <Title style = "titulo-carrinho" title='Resumo do Pedido'/>
                        <span>Subtotal</span>
                        <span id="valor">{valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <hr/>
                        <span>Total</span>
                        <span id="valor">{valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <span class="space"></span>
                        <div className="row">
                            <div className="col-xl-12 text-center mt-5">
                                <a href={localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('carrinho')).length != 0 ? "#/checkout" : "#/home" : '#/login'}><Button style ="btn-padrao" title ="Finalizar compra"/></a> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mt-3">
                                <a href="#/home"><Button style ="btn-secundario" title ="Escolher mais produtos"/></a> 
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }

}
    
    

