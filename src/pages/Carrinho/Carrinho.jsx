import React, { Component } from 'react'
import '../Carrinho/carrinho.css'
import Button from '../../components/Button/Button'
import Title from '../../components/Titulo/Title'


let carrinho = JSON.parse(localStorage.getItem('carrinho'));
let valor_total = 0;

export default class Carrinho extends Component { 
        
    state = {
        numero: 1
           
    }

    // aumentar = () =>{
    //     this.setState({numero:this.state.numero + 1})
    // }

    // diminuir = () => {
    //     this.setState({numero:this.state.numero -1})
    //     if((this.state.numero) <= 0) {
    //         return this.setState({numero:this.state.numero = 0})
    //     }
    // }

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
        
        try{
            for(let i=0;i<dadosCarrinho.length;i++){
                valor_total+=dadosCarrinho[i].vlr_aquisicao;
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
                        <p className="ml-2">Fornecido e entregue por Pata na Janta <b className="numero-itens">{carrinho.length}</b> itens</p>
                    
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
                                    <div className="col-4 col-sm-4 col-xl-2 mt-3">
                                        <span >{valor.vlr_aquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </div>
                                    <div className="col-4 col-sm-4 col-xl-2 mt-3">
                                        <div className='row'>
                                            {/* <div className="col-3">
                                                <button onClick={this.diminuir} className='btn btn-quantidade'>-</button>
                                            </div> */}
                                            <div className="col-4">
                                                <input disabled className ='quantidade'type="text" name="quantidade" id="quantidade" value = {this.state.numero}/>
                                            </div>
                                            {/* <div className="col-5">
                                                <button onClick={this.aumentar} className='btn btn-quantidade'>+</button>
                                            </div> */}
                                            <small onClick={()=>this.excluirItemCarrinho(pos)} className="col-12 excluir-produto">excluir</small>
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-4 col-xl-2 mt-3">
                                        <span >{(this.state.numero * valor.vlr_aquisicao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
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
    
    

