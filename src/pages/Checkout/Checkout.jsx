import React from 'react';
import './checkout.css';
import Title from '../../components/Titulo/Title'

import MCARD from '../../images/imgcheckout/MCARD.png';
import VISAMARROM from '../../images/imgcheckout/VISA_MARROM.png';
import PAYPAL from '../../images/imgcheckout/PAYPAL_MARROM.png';
import AMEXMARROM from '../../images/imgcheckout/AMEX_MARROM.png';
import BOLETO from '../../images/imgcheckout/codigoDeBarras.png';
import Button from '../../components/Button/Button'

export default props => (
    
        <div className="container">

            <form action="sucesso-compra.html" method="get">

                <h1 >
                    <Title title="Checkout" style="text-center corMarrom h1l9" />
                </h1>

                <div className="container divl13" >

                    <div className="row espacoBottom20">
                        <div className="col-12 col-sm-7 card-group">

                            <div className="card espacoTop10 espacoBottom20">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h4>
                                                <strong>1 - Endereço de Entrega</strong>
                                            </h4>
                                        </div>
                                    </div>
                                    <select className="custom-select form-control">
                                        <option selected value="NULL">Seleciona o Endereço</option>
                                    </select>

                                    <div className="row">
                                        <div className="col-sm-12 espacoTop10">
                                            <input type="text" maxlength="9" className="form-control" id="txtCEP" placeholder="CEP" required />
                                            <h6 className="espacoTop10" id="msgErro"></h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 espacoTop10">
                                            <input type="text" className="form-control" id="txtNomeDest" placeholder="Destinatario" required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-8 espacoTop10">
                                            <input type="text" className="form-control" id="txtRua" placeholder="Rua" required />
                                        </div>

                                        <div className="col-sm-4 espacoTop10">
                                            <input maxlength="5" type="text" className="form-control" id="txtNumRua" placeholder="N°" required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 espacoTop10">
                                            <input type="text" className="form-control" id="txtComplemento" placeholder="Complemento" />
                                        </div>
                                    </div>

                                    <div className="row espacoBottom20">

                                        <div className="col-sm-4 espacoTop10">
                                            <input type="text" className="form-control" id="txtBairro" placeholder="Bairro" required />
                                        </div>

                                        <div className="col-sm-4 espacoTop10">
                                            <input type="text" className="form-control" id="txtCidade" placeholder="Cidade" required />
                                        </div>

                                        <div className="col-sm-4 espacoTop10">
                                            <select className="custom-select" id="cbbUF">
                                                <option selected value="NULL">-UF-</option>
                                                {/* JSON CONSUMIDO */}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/BuscaCepEndereco.cfm" target="_blank">
                                                <h6 id="lblEsqueciCep">Esqueci o CEP</h6>
                                            </a>
                                        </div>
                                        <div className="col-12 mt-4 d-flex justify-content-center">
                                            <Button style = "btn-padrao" type="submit" title="Salvar"/>
                                        </div>
                                    </div>


                                    <div className="row espacoTop10">
                                        <div className="col-12">
                                            <span>
                                                <h6 id="lblErroCEP" className="espacoTop10"></h6>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="row espacoTop10">
                            <div className="col-12">
                                <spam>
                                    <h6 id="lblErroCEP" className="espacoTop10"></h6>
                                </spam>
                            </div>
                        </div>


                        {/* INICIO FORMULARIO CORREIOS */}
                        <div className="col-12 col-sm-5 card-group">

                            <div className="card espacoTop10">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h4>
                                                <strong>2 - Entrega</strong>
                                            </h4>
                                        </div>
                                    </div>

                                    {/* INICIO PAC */}
                                    <div className="row">
                                        <div className="col-12 espacoTop10">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="FormEntrega" id="rdbPAC" value="1" />
                                                <label className="form-check-label corBege" for="rdbPAC">
                                                    PAC:
                                    </label>

                                                {/* LABEL DIAS UTEIS PAC */}
                                                <label id="lblDiasUteisPAC" className="form-check-label corBege" for="rdbPAC"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">

                                            {/*  LABEL DATA PREVISTA PAC */}
                                            <label id="lblDataPrazoPAC" className="form-check-label corBege margemLeft20" for="rdbPAC"></label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 espacoTop10">
                                            <label className="form-check-label corMarrom margemLeft20" for="rdbPAC"><spam>*</spam> Frete grátis</label>
                                            <hr />
                                        </div>
                                    </div>
                                    {/* FIM PAC */}


                                    {/* INICIO SEDEX */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="FormEntrega" id="rdbSedex" value="2" />
                                                <label className="form-check-label corBege" for="rdbSedex">
                                                    SEDEX:
                                    </label>

                                                {/* LABEL DIAS UTEIS SEDEX */}
                                                <label id="lblDiasUteisSedex" className="form-check-label corBege" for="rdbSedex"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">

                                            {/* LABEL DATA PREVISTA SEDEX */}
                                            <label id="lblDataPrazoSedex" className="form-check-label corBege margemLeft20" for="rdbSedex"></label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 espacoTop10">
                                            <label className="form-check-label corMarrom margemLeft20" for="rdbSedex"><spam>*</spam> Frete grátis</label>
                                            <hr />
                                        </div>
                                    </div>
                                    {/* FIM SEDEX */}

                                    <div className="row">
                                        <label id="lblStatusRequisicao" className="form-check-label margemLeft20"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* FIM FORMULARIO ENTREGA */}
                </div>
                {/* FIM PRIMEIRA LINHA */}



                {/* INICIO SEGUNDA LINHA */}

                <div className="container">
                    <form>
                        {/* CARD PAGAMENTO */}
                        <div className="row">
                            <div className="col-12 col-sm-7">
                                <div className="card card-group espacoTop10 espacoBottom20">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-12">
                                                <h4>
                                                    <strong>3 - Forma de Pagamento</strong>
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-sm-6 espacoTop10">
                                                <div className="margemLeft20">
                                                    <input className="form-check-input" type="radio" name="FormPagamento" id="rdbPagCartao" value="1" checked />
                                                    <label className="form-check-label corMarrom" for="rdbPagCartao">
                                                        Cartão de Crédito
                                        </label>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6" >
                                                <img src={MCARD} width="34px" />
                                                <img src={VISAMARROM} width="32px" />
                                                <img src={PAYPAL} width="38px" />
                                                <img src={AMEXMARROM} width="38px" />
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-12 espacoTop10">
                                                <input type="text" className="form-control" id="txtNumCartao" placeholder="Número do cartão de crédito" required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-sm-6 espacoTop10">
                                                <select className="custom-select" id="cbbQtdParcela">
                                                    <option selected value="NULL">Parcelar em</option>
                                                    <option value="1">1x sem juros</option>
                                                    <option value="2">2x sem juros</option>
                                                    <option value="3">3x sem juros</option>
                                                </select>
                                            </div>

                                            <div className="col-12 col-sm-6 espacoTop10">
                                                <input type="text" maxlength="11" className="form-control" id="txtNumCPF" placeholder="CPF do titular" required />
                                            </div>
                                        </div>


                                        <div className="row espacoTop10">
                                            <div className="col-12">
                                                <input type="text" className="form-control" id="txtNomeTitularCartao" placeholder="Nome impresso no cartão de crédito" required />
                                            </div>
                                        </div>


                                        <div className="row espacoTop10">
                                            <div className="col-12 col-sm-4">
                                                <strong>
                                                    <label className="form-check-label corMarrom espacoTop10 labell260" >
                                                        Validade
                                        </label>
                                                </strong>

                                                <select className="custom-select espacoTop10" id="cbbMesValidade">
                                                    <option selected value="NULL">Mês</option>
                                                    {/* JS POPULA COM LOOP */}
                                                </select>
                                            </div>

                                            <div className="col-12 col-sm-4 espacoTop10">
                                                <br />
                                                <select className="custom-select espacoTop10" id="cbbAnoValidade" required="NULL">
                                                    <option selected value="NULL">Ano</option>
                                                    {/* JS POPULA COM LOOP */}
                                                </select>
                                            </div>

                                            <div className="col-12 col-sm-4 espacoTop10">
                                                <strong>
                                                    <label className="form-check-label corMarrom espacoTop10 labell281" >
                                                        CVV
                                        </label>
                                                </strong>

                                                <input type="text" maxlength="3" className="form-control" id="txtNomeCVVCartao" placeholder="CVV" required />
                                            </div>
                                        </div>


                                        <div className="row espacoBottom20">
                                            <div className="col-12 espacoTop10">
                                                <div className="margemLeft20 divl293" >

                                                    <input className="form-check-input" type="radio" name="FormPagamento" id="rdbPagBoleto" value="1" />
                                                    <label className="form-check-label corMarrom" for="rdbPagBoleto">
                                                        Boleto Bancário
                                        </label>

                                                    <img src={BOLETO} width="34px" className="margemLeft20 imgl300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* FIM CARD PAGAMENTO */}

                            {/* INICIO CARD FINALIZA COMPRA */}
                            <div className="col-12 col-sm-5 espacoTop10 espacoBottom20">
                                <div className="card divl311" >
                                    <div className="card-body">

                                        <div className="col-12">
                                            <h4>
                                                <strong>4 - Resumo do Pedido</strong>
                                            </h4>
                                        </div>

                                        <div className="col-12 mt-5 d-flex justify-content-between">
                                            <label className="corBege">Sub-total: </label>
                                            <label className="corBege">R$ 00,00</label>
                                        </div>

                                        <div className="col-12">
                                            <hr />
                                        </div>

                                        <div className="col-12 d-flex justify-content-between">
                                            <label id="lblTipoEntrega" className="corBege"></label>
                                            <label id="lblFreteGratis" className="corBege"></label>
                                        </div>

                                        <div className="col-12 d-flex justify-content-between mt-5">
                                            <h5 className="corMarrom">Total</h5>
                                            <h5 className="corMarrom">R$ 00,00</h5>
                                        </div>
                                        <span class="space"></span>
                                        <div className="col-12 mt-5 text-center">
                                            <Button title = "Finalizar Compra" style="btn-padrao"/>
                                        </div>
                                           
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
 </form>
 </div>
     
)
