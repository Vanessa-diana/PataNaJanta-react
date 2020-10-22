import React from 'react';
import './historicodepedido.css';
import Title from '../../components/Titulo/Title'
import Button from '../../components/Button/Button';



export default props =>


    <div class="container conteudo">
        <div class="row mt-3">
            <div class="col-12">
                <Title title="Histórico do Pedido" style="titulo-principal" />
                <small>Acompanhe seu pedido</small>
            </div>
        </div>
        <div class="row mb-2 text-center">
            <div class="col-12 col-md-6 col-xl-6 card-group">
                <div class="card">
                    <div class="card-body col-12 text-left">
                        <h6 class="titulo">Pedido 123456-5</h6>
                        <hr />
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Pagamento</h6>
                                <p>Boleto</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Total Pedido</h6>
                                <p>R$ 129,07</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Data adicionada</h6>
                                <p>09/09/2020</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Status do Pedido</h6>
                                <p>Pagamento aprovado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-xl-6 card-group">
                <div class="card">
                    <div class="card-body col-12 text-left">
                        <h6 class="titulo">Pedido 123456-7</h6>
                        <hr />
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Pagamento</h6>
                                <p>Cartão de Crédito</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Total Pedido</h6>
                                <p>R$ 190,07</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Data adicionada</h6>
                                <p>09/06/2019</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <h6 class="subtitulo">Status do Pedido</h6>
                                <p>Finalizado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7 col-xl-6 mt-4 mb-5 text-left">
                <a href="/home"><Button style="btn-secundario" title="Voltar" type="submit"/></a>
            </div>
        </div>
    </div>


