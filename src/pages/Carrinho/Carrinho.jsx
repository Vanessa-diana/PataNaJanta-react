import React from 'react'
import '../Carrinho/carrinho.css'
import ItemCarrinho from '../../images/item-carrinho.jpg'
import Button from '../../components/Button/Button'

export default props=>
<div className="row">
    <div className="col-12 col-xl-8 col-md-6">
        <h3 className="titulo-carrinho mt-4 ml-2">Meu Carrinho</h3>
        <p className="ml-2">Fornecido e entregue por Pata na Janta <b className="numero-itens">2</b> itens</p>
        
        {/* <!-- LISTA DE ITENS ADICIONADOS--> */}
        <div className="row">
            <div className="col-12">
                <div className="card card-itens">
                    <div className="card-body row">
                        <div className="col-12 col-sm-6 col-xl-2 text-center">
                            <img className= "produtos img-fluid" src={ItemCarrinho} alt="produto-carrinho" width="60%" height="60%"/>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4  mt-3">
                            <h6>Ração Golden Gatos Castrados Frango 1kg</h6>
                        </div>
                        <div className="col-4 col-sm-4 col-xl-2 mt-3">
                            <span >R$ 18,90</span>
                        </div>
                        <div className="col-4 col-sm-4 col-xl-2 mt-3">
                            <input className="quantidade form-control" type="number" name="quantidade" id="quantidade" value= "2" min="1"/>
                            <span className="excluir-produto ml-1">excluir</span>
                        </div>
                        <div className="col-4 col-sm-4 col-xl-2 mt-3">
                            <span >R$ 37,80</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-xl-4 col-md-6">
        <div className="col-12 resumo-pedido mt-2">
            <h4 className="titulo-carrinho">Resumo do Pedido</h4>
            <span>Subtotal</span>
            <span id="valor">R$ 180,90</span>
            <hr/>
            <span>Total</span>
            <span id="valor">R$ 180,90</span>
            <span class="space"></span>
            <div className="row">
                <div className="col-xl-12 text-center mt-5">
                    <a href="#/checkout"><Button style ="btn-padrao" title ="Finalizar compra"/></a> 
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <a href="resultado-produto.html"><Button style ="btn-secundario" title ="Escolher mais produtos"/></a> 
                </div>
            </div>
        </div>
    </div> 
</div>

    

