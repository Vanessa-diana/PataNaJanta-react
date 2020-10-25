import React, { Component } from 'react';
import './checkout.css';
import Title from '../../components/Titulo/Title'

import MCARD from '../../images/imgcheckout/MCARD.png';
import VISAMARROM from '../../images/imgcheckout/VISA_MARROM.png';
import PAYPAL from '../../images/imgcheckout/PAYPAL_MARROM.png';
import AMEXMARROM from '../../images/imgcheckout/AMEX_MARROM.png';
import BOLETO from '../../images/imgcheckout/codigoDeBarras.png';
import Button from '../../components/Button/Button'
import axios from 'axios';

export default class Checkout extends Component {

    state = {
        enderecos: [],
        UFs: []
    }

    componentDidMount()
    {
        this.setEndereco();
        this.getEnderecos();
        this.consumeUFAPI();
        this.consumeCEP();
    }


    //HABILITA E DESABILITA ELEMENTOS DE ACORDO COM O PARAMETRO PASSADO
    isDisabled = (valor) => {

        let elementos = [
            'txtCEP','txtRua', 'txtNumRua', 'txtComplemento',
            'txtBairro', 'txtCidade', 'cbbUF'
        ];

        for(let i=0; i<elementos.length;i++){
            document.getElementById(elementos[i]).disabled = valor;
        }
    }


    //PEGA ENDERECOS DO USUARIO E POPULA COMBOBOX DE ENDEREÇOS
    getEnderecos = () => {

        let cbbEndereco = document.getElementById('cbbEndereco');
        let URL = 'http://patanajanta.test/api';
        let self = this;

        let dadosUsuario = localStorage.getItem('usuario');
        let toJSON = JSON.parse(dadosUsuario);

        let endPoint = `/endereco/buscar/${toJSON.id}`;
        URL += endPoint;

        cbbEndereco.disabled = true;

        axios({
            method: 'get',
            url: URL,
            timeout: 15000
        }).then(function(resp){

            for(let i=0; i<resp.data.length;i++){
                cbbEndereco.innerHTML += `<option value="${resp.data[i].id_endereco}">${resp.data[i].rua}, ${resp.data[i].numero} - ${resp.data[i].bairro}</option>`
            }

            self.setState({enderecos: {...resp.data}})
            cbbEndereco.disabled = false;

        }).catch(function(erro){

            if (erro.toString().includes('Network Error') || erro.toString().includes('timeout of')) {
                alert('API Endereço - O banco de dados demorou muito para responder, por favor tente novamente mais tarde!')
                cbbEndereco.disabled = false;
                return;
            }

            alert(erro);
            cbbEndereco.disabled = false;
        })
    }


    //POPULA COMBOBOX DE UF
    consumeUFAPI = () => {

        let cbbUF = document.getElementById('cbbUF');
        let self = this;
        cbbUF.disabled = true;

        const msgTimeOut = "UF - O sistema demorou muito para retornar os dados.\n\nPor favor, tente novamente mais tarde.";
        const strLinkRequest = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

        axios({
            method: "get",
            url: strLinkRequest,
            timeout: 15000
        })
        .then(function(resposta){
    
            let qtdUFs = resposta.data.length;
    
            //Cria e popula Array getSiglaUF com as UF's
            let getSiglaUF = [];
    
            for(let i=0;i<qtdUFs;i++){
                getSiglaUF.push(resposta.data[i].sigla);
            }
            
            //Ordena array populado anteriormente em ordem alfabetica
            getSiglaUF = getSiglaUF.sort();
            self.setState({UFs: getSiglaUF});

    
            //Adiciona itens do array de UF's na cbbUF
            for(let i=0;i<qtdUFs;i++){
                cbbUF.innerHTML += `<option value=${getSiglaUF[i]}>${getSiglaUF[i]}</option>`
            }
            
            /* console.log(resposta.data); */
            cbbUF.disabled = false;
        })
        .catch(function(erro){
    
            //Caso tenha dado timeout
            if(erro.toString().includes('Network Error') || erro.toString().includes('timeout of')){
                alert(msgTimeOut);
                return;
            }

            console.error(erro);

        });
    }


    //PREENCHE CAMPOS COM ENDERECOS RECUPERADOS DO BANCO
    setEndereco = () => {
        let cbbEndereco = document.getElementById('cbbEndereco');
        let btnSalvar = document.getElementById('btnSalvarEndereco');
        let self = this;


        cbbEndereco.addEventListener('change', function(){
            
            if(cbbEndereco.options[cbbEndereco.selectedIndex].value != 'NULL'){
                self.isDisabled(true);

                document.getElementById('txtRua').value = self.state.enderecos[cbbEndereco.selectedIndex-1].rua;
                document.getElementById('txtNumRua').value = self.state.enderecos[cbbEndereco.selectedIndex-1].numero;
                document.getElementById('txtComplemento').value = self.state.enderecos[cbbEndereco.selectedIndex-1].complemento;
                document.getElementById('txtBairro').value = self.state.enderecos[cbbEndereco.selectedIndex-1].bairro;
                document.getElementById('txtCidade').value = self.state.enderecos[cbbEndereco.selectedIndex-1].cidade;
                document.getElementById('cbbUF').value = self.state.enderecos[cbbEndereco.selectedIndex-1].UF;

                btnSalvar.disabled = true;
                return;
            }

            self.isDisabled(false);
            btnSalvar.disabled = false;
            document.getElementById('txtRua').value = "";
            document.getElementById('txtNumRua').value = "";
            document.getElementById('txtComplemento').value = "";
            document.getElementById('txtBairro').value = "";
            document.getElementById('txtCidade').value = "";
            document.getElementById('cbbUF')[0].selected = true;
        })
    }



    //CONSUME API CEP - VIA CEP
    consumeCEP = () =>{

        let txtCep = document.getElementById('txtCEP');
        let msgErro = document.getElementById('msgErro');

        txtCep.addEventListener('blur', function(){

            const msgTimeOut = "O sistema demorou muito para retornar os dados.\n\nPor favor, tente novamente mais tarde ou preencha os dados manualmente.";
            const msgCEPfalso = "O CEP informado não existe";
            let cep = txtCep.value;


            //FORMATA CEP PARA DEIXAR ELE SEM TRAÇO
            if(cep.includes("-")){
                cep = cep.replace("-","");
            }

            //Define String de Requisição
            const strLinkRequest = `https://viacep.com.br/ws/${cep}/json/`;
            alert(strLinkRequest)

            axios({
                method: "get",
                url: strLinkRequest,
                timeout: 15000
            })
    
            .then(function(resposta){
    
                //Caso o usuário tenha digitado um CPF inexistente
                if(resposta.data.erro == true){
                    //Caso CEP Inexistente na base de dados
                    msgErro.textContent = msgCEPfalso;
                    msgErro.style.display = "block";
                    return;
                }

                msgErro.style.display = "none";
                document.getElementById('txtRua').value = resposta.data.logradouro;
                document.getElementById('txtComplemento').value = resposta.data.complemento;
                document.getElementById('txtBairro').value = resposta.data.bairro;
                document.getElementById('txtCidade').value = resposta.data.localidade;
                document.getElementById('cbbUF').value = resposta.data.uf;

            }).catch(function(erro){
                alert(erro)
            })
        })
    }

    render() {
        return (
            <>
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
                                            <select className="custom-select form-control" id='cbbEndereco'>
                                                <option selected value="NULL">Selecione o Endereço</option>
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
                                                    <Button style="btn-padrao" type="submit" title="Salvar" id='btnSalvarEndereco' />
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
                                                    <a href="#/sucessopedido"><Button title="Finalizar Compra" style="btn-padrao" /></a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
