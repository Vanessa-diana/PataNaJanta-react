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
import Swal from 'sweetalert2';
import {protegeLogin} from '../../main/protegeRotas'

let qtdRequisicaoCalculaPrazo = 0;
let valor_total = 0;
let opcPagamento = 4;

export default class Checkout extends Component {

    constructor(props){
        super(props);
        valor_total = 0;
        protegeLogin('usuario');
    }

    state = {
        enderecos: [],
        UFs: [],
        lblBtnSalvar: 'Salvar',
    }

    swall = (mensagem) =>{
        Swal.fire({
            title: 'Atenção!',
            html: mensagem,
            icon: 'warning',
            confirmButtonColor: "#B86360",
            confirmButtonText: 'OK'
        });
    }

    componentDidMount()
    {
        let rdbPagCartao = document.querySelector("#rdbPagCartao");
        let rdbPagBoleto = document.querySelector("#rdbPagBoleto");
        this.calculaValorTotal();
        let self = this;
        this.setEndereco();
        this.getEnderecos();
        this.consumeUFAPI();
        this.consumeCEP();
        this.cadastraEndereco();
        this.populaMes();
        this.populaAno();
        this.showSedexAndPACLabel();
        this.finalizaPedido();

        rdbPagCartao.addEventListener("click", function(){
            opcPagamento = 4;
            self.desabilitaCartaoCredito(false);
            self.setObrigatorio(true);
        });
        
        rdbPagBoleto.addEventListener("click", function(){

            let cbbMesValidade = document.querySelector("#cbbMesValidade");
            let cbbAnoValidade = document.querySelector("#cbbAnoValidade");
            let txtNumCartao = document.querySelector("#txtNumCartao");
            let cbbQtdParcela = document.querySelector("#cbbQtdParcela");
            let txtNumCPF = document.querySelector("#txtNumCPF");
            let txtNomeTitularCartao = document.querySelector("#txtNomeTitularCartao");
            let txtNomeCVVCartao = document.querySelector("#txtNomeCVVCartao");

            rdbPagBoleto.checked = true;
            opcPagamento = 5;
            self.desabilitaCartaoCredito(true);
            self.limpaCamposCartao();
            self.setObrigatorio(false);

            cbbMesValidade.style.borderColor = '#ced4da';
            cbbAnoValidade.style.borderColor = '#ced4da';
            txtNumCartao.style.borderColor = '#ced4da';
            cbbQtdParcela.style.borderColor = '#ced4da';
            txtNumCPF.style.borderColor = '#ced4da';
            txtNomeTitularCartao.style.borderColor = '#ced4da'
            txtNomeCVVCartao.style.borderColor = '#ced4da'
        });
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
        cbbEndereco.textContent = '';
        cbbEndereco.innerHTML += `<option selected value="NULL">Selecione o Endereço</option>`

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
                
                Swal.fire({
                    title: 'Erro API Endereço',
                    html: 'O banco de dados demorou muito para responder, por favor tente novamente mais tarde!',
                    icon: 'error',
                    confirmButtonColor: "#B86360",
                    confirmButtonText: 'OK'
                });
                
                cbbEndereco.disabled = false;
                return;
            }

            if(erro.toString().includes('Request failed with status code 404')){
                console.log(erro);
                cbbEndereco.disabled = false;
                return;
            }

            Swal.fire({
                title: 'Erro API Endereço',
                html: erro,
                icon: 'error',
                confirmButtonColor: "#B86360",
                confirmButtonText: 'OK'
            });

            cbbEndereco.disabled = false;
        })
    }


    //POPULA COMBOBOX DE UF
    consumeUFAPI = () => {

        let cbbUF = document.getElementById('cbbUF');
        let self = this;
        cbbUF.disabled = true;

        const msgTimeOut = "O sistema demorou muito para retornar os dados.<br>Por favor, tente novamente mais tarde.";
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
                
                Swal.fire({
                    title: 'Erro API UF',
                    html: msgTimeOut,
                    icon: 'error',
                    confirmButtonColor: "#B86360",
                    confirmButtonText: 'OK'
                });
                
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
                document.getElementById('txtCEP').value = self.state.enderecos[cbbEndereco.selectedIndex-1].CEP;
                document.getElementById('txtNumRua').value = self.state.enderecos[cbbEndereco.selectedIndex-1].numero;
                document.getElementById('txtComplemento').value = self.state.enderecos[cbbEndereco.selectedIndex-1].complemento;
                document.getElementById('txtBairro').value = self.state.enderecos[cbbEndereco.selectedIndex-1].bairro;
                document.getElementById('txtCidade').value = self.state.enderecos[cbbEndereco.selectedIndex-1].cidade;
                document.getElementById('cbbUF').value = self.state.enderecos[cbbEndereco.selectedIndex-1].UF;

                btnSalvar.disabled = true;
                self.consumeAPICorreios(40010);
                return;
            }

            self.isDisabled(false);
            btnSalvar.disabled = false;
            document.getElementById('txtRua').value = "";
            document.getElementById('txtCEP').value = '';
            document.getElementById('txtNumRua').value = "";
            document.getElementById('txtComplemento').value = "";
            document.getElementById('txtBairro').value = "";
            document.getElementById('txtCidade').value = "";
            document.getElementById('cbbUF')[0].selected = true;
        })
    }

    validaRegex = (regexString, elemento) => {
        return regexString.test(elemento.value);
    }


    //CONSUME API CEP - VIA CEP
    consumeCEP = () =>{

        let txtCep = document.getElementById('txtCEP');
        let msgErro = document.getElementById('msgErro');
        msgErro.style.display = "none";
        let self = this;

        txtCep.addEventListener('blur', function(){

            if(txtCep.value == null || txtCep.value.length == 0){
                return;
            }

            const msgTimeOut = "O sistema demorou muito para retornar os dados.<br>Por favor, tente novamente mais tarde ou preencha os dados manualmente.";
            const msgCEPfalso = "O CEP informado não existe";
            let cep = txtCep.value;


            //FORMATA CEP PARA DEIXAR ELE SEM TRAÇO
            if(cep.includes("-")){
                cep = cep.replace("-","");
            }

            if(self.validaRegex(/^[0-9]{5}?\-?[0-9]{3}$/, this)){

                //Define String de Requisição
                const strLinkRequest = `https://viacep.com.br/ws/${cep}/json/`;
                console.log(strLinkRequest)

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

                    if (erro.toString().includes('Network Error') || erro.toString().includes('timeout of')) {
                        
                        Swal.fire({
                            title: 'Erro API CEP',
                            html: msgTimeOut,
                            icon: 'error',
                            confirmButtonColor: "#B86360",
                            confirmButtonText: 'OK'
                        });
                        
                        return;
                    }

                    Swal.fire({
                        title: 'Erro API CEP',
                        html: erro,
                        icon: 'error',
                        confirmButtonColor: "#B86360",
                        confirmButtonText: 'OK'
                    });
                });
                
                return;
            }

            msgErro.textContent = 'CEP inválido';
            msgErro.style.display = "block";
            return;
        })
    }

    cadastraEndereco = () => {

        let btnSalvar = document.getElementById('btnSalvarEndereco');
        let txtRua = document.getElementById('txtRua');
        let txtCEP = document.getElementById('txtCEP');
        let txtNumRua = document.getElementById('txtNumRua');
        let txtComplemento = document.getElementById('txtComplemento');
        let txtBairro = document.getElementById('txtBairro');
        let txtCidade = document.getElementById('txtCidade');
        let cbbUF = document.getElementById('cbbUF');
        
        let self = this;


        btnSalvar.addEventListener('click', function(event){

            event.preventDefault();

            let elementos = [txtRua, txtCEP, txtNumRua, txtComplemento, txtBairro, txtCidade, cbbUF];

            //SETA BORDA CINZA PARA TODOS OS INPUTS
            for(let i=0; i<elementos.length; i++){
                elementos[i].style.borderColor = '#ced4da';
            }

            let URL = 'http://patanajanta.test/api';
            let cep = txtCEP.value;

            if(cep.includes("-")){
                cep = cep.replace("-","");
            }


            //VERIFICA CEP VAZIO
            if(txtCEP.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtCEP.style.borderColor = 'red';
                return;
            }
            else{
                txtCEP.style.borderColor = '#ced4da';
            }


            //VERIFICA RUA VAZIA
            if(txtRua.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtRua.style.borderColor = 'red';
                return;
            }
            else{
                txtRua.style.borderColor = '#ced4da';
            }


            //VERIFICA NUMERO VAZIO
            if(txtNumRua.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtNumRua.style.borderColor = 'red';
                return;
            }
            else{
                txtNumRua.style.borderColor = '#ced4da';
            }


            //VERIFICA BAIRRO VAZIO
            if(txtBairro.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtBairro.style.borderColor = 'red';
                return;
            }
            else{
                txtBairro.style.borderColor = '#ced4da';
            }


            //VERIFICA CIDADE VAZIO
            if(txtCidade.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtCidade.style.borderColor = 'red';
                return;
            }
            else{
                txtCidade.style.borderColor = '#ced4da';
            }


            //VERIFICA COMBOBOX VAZIA
            if(cbbUF.options[cbbUF.selectedIndex].value == 'NULL'){
                self.swall('O campo informado não pode estar vazio');
                cbbUF.style.borderColor = 'red';
                return;
            }
            else{
                cbbUF.style.borderColor = '#ced4da';
            }



            self.disabled = true;
            self.setState({lblBtnSalvar: 'Salvando...'});

            let dadosCurrentUser = JSON.parse(localStorage.getItem('usuario'));
            let endPoint = `/endereco/salvar/${dadosCurrentUser.id}`

            URL += endPoint;
            

            // alert(URL)

            axios({
                method: 'post',
                url: URL,
                timeout: 15000,

                data: {
                    rua: txtRua.value,
                    numero: txtNumRua.value,
                    bairro: txtBairro.value,
                    complemento: txtComplemento.value.toString,
                    cidade: txtCidade.value,
                    UF: cbbUF[cbbUF.selectedIndex].value,
                    CEP: cep
                }
            }).then(function(){

                /* alert('Endereço cadastrado com sucesso!') */
                //limpar os campos

                txtRua.value = '';
                txtCEP.value = '';
                txtNumRua.value = '';
                txtComplemento.value = '';
                txtBairro.value = '';
                txtCidade.value = '';
                cbbUF[0].selected = true;

                self.disabled = true;
                self.setState({lblBtnSalvar: 'Salvar'});

                self.getEnderecos();

            }).catch(function(error){

                if(error.toString().includes('Network Error') || error.toString().includes('timeout of')){

                    Swal.fire({
                        title: 'Erro API Gravar Endereço',
                        html: 'O banco de dados demorou muito para responder, por favor tente novamente mais tarde!',
                        icon: 'error',
                        confirmButtonColor: "#B86360",
                        confirmButtonText: 'OK'
                    });

                    self.disabled = true;
                    self.setState({lblBtnSalvar: 'Salvar'});
                    return;
                }

                Swal.fire({
                    title: 'Erro API Gravar Endereço',
                    html: `Houve um erro ao realizar o cadastro. Por favor, tente novamente mais tarde<br>${error}`,
                    icon: 'error',
                    confirmButtonColor: "#B86360",
                    confirmButtonText: 'OK'
                });

                self.disabled = true;
                self.setState({lblBtnSalvar: 'Salvar'});

            })
        });
    }

    /* ================== API CORREIOS ========================================= */

    convertStringToXML = (text) => {
        let parserToXML = new DOMParser();
        let respostaConvertida = parserToXML.parseFromString(text,"text/xml");
    
        console.log(respostaConvertida);
    
        return respostaConvertida;
    }

    getValueXML = (xml, tagName) =>{

        return xml.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
    }

    consumeAPICorreios = (codigo_servico) =>{

        let txtRua = document.getElementById('txtRua');
        let txtNumRua = document.getElementById('txtNumRua');
        let txtComplemento = document.getElementById('txtComplemento');
        let txtBairro = document.getElementById('txtBairro');
        let txtCidade = document.getElementById('txtCidade');
        let cbbUF = document.getElementById('cbbUF');
        
        let cbbEndereco = document.getElementById('cbbEndereco');
        let lblDiasUteisPAC = document.querySelector("#lblDiasUteisPAC");
        let lblDataPrazoPAC = document.querySelector("#lblDataPrazoPAC");
        let lblDiasUteisSedex = document.querySelector("#lblDiasUteisSedex");
        let lblDataPrazoSedex = document.querySelector("#lblDataPrazoSedex");
        let rdbSedex = document.querySelector("#rdbSedex");
        let rdbPAC = document.querySelector("#rdbPAC");
        let lblStatusRequisicao = document.querySelector("#lblStatusRequisicao");
        let lblErroCEP = document.querySelector("#lblErroCEP");
        let txtCEP = document.getElementById('txtCEP');
        lblStatusRequisicao.style.color = '#351912'
        let self = this;

        if(qtdRequisicaoCalculaPrazo==0){
            lblDiasUteisPAC.textContent = '';
            lblDataPrazoPAC.textContent = '';
            lblDiasUteisSedex.textContent = '';
            lblDataPrazoSedex.textContent = '';
        }

        cbbEndereco.disabled = true;

        lblStatusRequisicao.style.display = "block";
        lblStatusRequisicao.textContent = "Calculando prazo de entrega..."

        rdbPAC.disabled = true;
        rdbSedex.disabled = true;

        const msgTimeOut = "O sistema demorou muito para retornar os dados.\nPor favor, tente novamente mais tarde.";
        //const msgErro = 'Houve um erro inesperado com o serviço de frete dos Correios. Por favor, tente novamente.'

        let cep_origem = "01001000";         /* cep de origem apenas numeros */
        let cep_destino = txtCEP.value;      /* cep de destino apenas numeros */

        const strCalculaPrazo = `ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrazo?&nCdServico=${codigo_servico}&sCepOrigem=${cep_origem}&sCepDestino=${cep_destino}`
        console.log(strCalculaPrazo);
        
        axios({
            method: "get",
            url: `https://cors-anywhere.herokuapp.com/${strCalculaPrazo}`,
            timeout: 22000
        })
        //Caso Sucesso da requisição
        .then(function(resposta){
            console.log(resposta.data);
            
            //Converte resposta dada em String para XML 
            let respostaConvertida = self.convertStringToXML(resposta.data);

            let dias;
            let dataLimite

            try{
                //Caso API tenha retornado algum erro de pesquisa
                let msgErro = self.getValueXML(respostaConvertida,"MsgErro");
                //alert(msgErro);

                if(!msgErro.includes('SQL')){
                    /* RETORNA MSG DE ERRO AO USUARIO */
                    let msgRisco = 'A área informada está classificada como área de risco ou área de difícil acesso pelos Correios. Por favor, utilize outro endereço.'
                    lblStatusRequisicao.style.display = "block";
                    lblStatusRequisicao.style.color = "red";
                    lblStatusRequisicao.textContent = msgRisco;

                    /* rdbPAC.disabled = false;
                    rdbSedex.disabled = false; */

                    rdbPAC.disabled = true;
                    rdbSedex.disabled = true;

                    cbbEndereco.options[0].selected = true;

                    txtRua.value = '';
                    txtCEP.value = '';
                    txtNumRua.value = '';
                    txtComplemento.value = '';
                    txtBairro.value = '';
                    txtCidade.value = '';
                    cbbUF[0].selected = true;

                    self.isDisabled(false);
                }
                else{
                    let msgErro = 'Houve um erro inesperado com o serviço de frete dos Correios. Por favor, tente novamente.'
                    lblStatusRequisicao.style.display = "block";
                    lblStatusRequisicao.style.color = "red";
                    lblStatusRequisicao.textContent = msgErro;

                    rdbPAC.disabled = false;
                    rdbSedex.disabled = false;

                    /* rdbPAC.disabled = true;
                    rdbSedex.disabled = true;

                    cbbEndereco.options[0].selected = true;

                    txtRua.value = '';
                    txtCEP.value = '';
                    txtNumRua.value = '';
                    txtComplemento.value = '';
                    txtBairro.value = '';
                    txtCidade.value = '';
                    cbbUF[0].selected = true; */

                    self.isDisabled(false);
                }


                cbbEndereco.disabled = false;
                
            }catch(e){
                
                //Caso API tenha feito a requisição com sucesso


                dias = self.getValueXML(respostaConvertida,"PrazoEntrega");
                dataLimite = self.getValueXML(respostaConvertida,"DataMaxEntrega");


                if(qtdRequisicaoCalculaPrazo==0){

                    /* PREENCHE DADOS RECUPERADOS REFERENTES AO SEDEX */
                    lblDiasUteisSedex.textContent = `${dias} Dias úteis`;
                    lblDataPrazoSedex.textContent = `Data prevista: ${dataLimite}`;
                    qtdRequisicaoCalculaPrazo++;
                    self.consumeAPICorreios(41106);
                }
                else{

                    /* PREENCHE DADOS RECUPERADOS REFERENTES AO PAC */
                    lblDiasUteisPAC.textContent = `${dias} Dias úteis`;
                    lblDataPrazoPAC.textContent = `Data prevista: ${dataLimite}`;
                    qtdRequisicaoCalculaPrazo = 0;


                    /* HABILITA RADIO BUTTONS APOS FIM DE SOLICITAÇÃO */
                    rdbSedex.disabled = false;
                    rdbPAC.disabled = false;
                    cbbEndereco.disabled = false;

                    /* EXIBE LABELS COM RETORNO DA API E OCULTA MSG DE ESPERA */
                    lblDataPrazoPAC.style.display = "inline";
                    lblDiasUteisPAC.style.display = "inline";
                    lblDiasUteisSedex.style.display = "inline";
                    lblDataPrazoSedex.style.display = "inline";
                    lblStatusRequisicao.style.display = "none";
                }
                
                /* alert("FIM REQUISICAO") */
            }

            console.log(dias,dataLimite);
            
        })
        //Caso de erro
        .catch(function(erro){
            console.error(erro);

            //Caso dê timeout
            if(erro.toString().includes("timeout of")){

                /* alert(msgTimeOut); */
                lblStatusRequisicao.style.color = "red";
                lblStatusRequisicao.textContent = msgTimeOut;
                lblStatusRequisicao.style.display = "block";

                rdbPAC.disabled = false;
                rdbSedex.disabled = false;
                cbbEndereco.disabled = false; 
                return

                /* rdbPAC.disabled = true;
                rdbSedex.disabled = true;
                cbbEndereco.disabled = false;

                cbbEndereco.options[0].selected = true;

                txtRua.value = '';
                txtCEP.value = '';
                txtNumRua.value = '';
                txtComplemento.value = '';
                txtBairro.value = '';
                txtCidade.value = '';
                cbbUF[0].selected = true;

                self.isDisabled(false);
                
                return; */
  
            }
            else{
                /* PRINTA ERRO RETORNADO */
                let msgErro = 'Houve um erro inesperado com o serviço de frete dos Correios. Por favor, tente novamente.'
                lblStatusRequisicao.style.color = "red";
                lblStatusRequisicao.textContent = msgErro;
                lblStatusRequisicao.style.display = "block";

                rdbPAC.disabled = false;
                rdbSedex.disabled = false;
                cbbEndereco.disabled = false;

                return;

                /* rdbPAC.disabled = true;
                rdbSedex.disabled = true;
                cbbEndereco.disabled = false;

                cbbEndereco.options[0].selected = true;

                txtRua.value = '';
                txtCEP.value = '';
                txtNumRua.value = '';
                txtComplemento.value = '';
                txtBairro.value = '';
                txtCidade.value = '';
                cbbUF[0].selected = true;

                self.isDisabled(false); */
            }
        });
    }

    showSedexAndPACLabel = () =>{
        let rdbSedex = document.querySelector("#rdbSedex");
        let rdbPAC = document.querySelector("#rdbPAC");
        let lblTipoEntrega = document.getElementById("lblTipoEntrega")
        let lblFreteGratis = document.getElementById("lblFreteGratis")

        rdbPAC.addEventListener("click", function(){
            lblTipoEntrega.textContent = "PAC:";
            lblFreteGratis.textContent = "Frete grátis";
        });

        rdbSedex.addEventListener("click", function(){
            lblTipoEntrega.textContent = "SEDEX:";
            lblFreteGratis.textContent = "Frete grátis";
        });
    }


    /* ===================== PAGAMENTO =================================== */

    desabilitaCartaoCredito = (status) =>{

        let cbbMesValidade = document.querySelector("#cbbMesValidade");
        let cbbAnoValidade = document.querySelector("#cbbAnoValidade");
        let txtNumCartao = document.querySelector("#txtNumCartao");
        let cbbQtdParcela = document.querySelector("#cbbQtdParcela");
        let txtNumCPF = document.querySelector("#txtNumCPF");
        let txtNomeTitularCartao = document.querySelector("#txtNomeTitularCartao");
        let txtNomeCVVCartao = document.querySelector("#txtNomeCVVCartao");

        cbbMesValidade.disabled = status;
        cbbAnoValidade.disabled = status;
        txtNumCartao.disabled = status;
        cbbQtdParcela.disabled = status;
        txtNumCPF.disabled = status;
        txtNomeTitularCartao.disabled = status;
        txtNomeCVVCartao.disabled = status;
    }
    
    setObrigatorio = (status) => {

        let txtNumCartao = document.querySelector("#txtNumCartao");
        let txtNumCPF = document.querySelector("#txtNumCPF");
        let txtNomeTitularCartao = document.querySelector("#txtNomeTitularCartao");
        let txtNomeCVVCartao = document.querySelector("#txtNomeCVVCartao");

        txtNumCartao.required = status;
        txtNumCPF.required = status;
        txtNomeTitularCartao.required = status;
        txtNomeCVVCartao.required = status;
    }

    populaMes = () =>{

        let cbbMesValidade = document.querySelector("#cbbMesValidade");
        let zeroEsquerda;
    
        for(let i=1; i<=12;i++){
    
            if(i<10){
                zeroEsquerda = "0";
            }
            else{
                zeroEsquerda="";
            }
            cbbMesValidade.innerHTML += `<option value="${i}">${zeroEsquerda}${i}</option>`;
        }
    }

    populaAno = () => {

        let cbbAnoValidade = document.querySelector("#cbbAnoValidade");
        let anoAtual = new Date().getFullYear();
    
        for(let i=0; i<=10; i++){
            cbbAnoValidade.innerHTML += `<option value=${i}>${anoAtual+i}</option>`;
        }
    }

    limpaCamposCartao = () =>{
        let cbbMesValidade = document.querySelector("#cbbMesValidade");
        let cbbAnoValidade = document.querySelector("#cbbAnoValidade");
        let txtNumCartao = document.querySelector("#txtNumCartao");
        let cbbQtdParcela = document.querySelector("#cbbQtdParcela");
        let txtNumCPF = document.querySelector("#txtNumCPF");
        let txtNomeTitularCartao = document.querySelector("#txtNomeTitularCartao");
        let txtNomeCVVCartao = document.querySelector("#txtNomeCVVCartao");

        cbbMesValidade.selectedIndex = 0;
        cbbAnoValidade.selectedIndex = 0;
        txtNumCartao.value = "";
        cbbQtdParcela.selectedIndex = 0;
        txtNumCPF.value = "";
        txtNomeTitularCartao.value = "";
        txtNomeCVVCartao.value = "";
    }


    montaJSONPedido = () => {

        let cbbEndereco = document.getElementById('cbbEndereco');
        let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));
        let dadosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
        let dadosQtdItens = JSON.parse(localStorage.getItem('qtdItem'));

        let dataAtual = `${new Date().getUTCFullYear()}-${new Date().getMonth()+1}-${new Date().getUTCDate()}`;
        let arrayPedido = [];
        let arrayItens = [];

        let modeloUsuario = {
            'id_usuario': `${dadosUsuario.id}`*1,
            'id_endereco': `${cbbEndereco.options[cbbEndereco.selectedIndex].value}`*1,
            'id_pagamento': `${opcPagamento}`*1,
            'id_status': 1,
            'numero_pedido':'X',
            'data_emissao': dataAtual,
            'valor_total': valor_total
        }

        //ADICIONA DADOS DO USUARIO AO JSON FINAL NA PRIMEIRA POSICAO
        arrayPedido.push(modeloUsuario)


        //ADICIONA NA SEGUNDA POSICAO DO ARRAY, UM ARRAY DE ITENS
        for(let i=0; i<dadosCarrinho.length; i++){

            let modeloItens = {
                'id_pedido':0,
                'id_produto':`${dadosCarrinho[i].id}`*1,
                'quantidade': `${dadosQtdItens[i].item}`*1,
                'vlr_unitario':`${dadosCarrinho[i].vlr_aquisicao}`*1
            }

            arrayItens.push(modeloItens);
        }

        arrayPedido.push(arrayItens);

        return arrayPedido;
    }

    verificaCompleto = () => {
        let cbbEndereco = document.getElementById('cbbEndereco');
        let cbbMesValidade = document.querySelector("#cbbMesValidade");
        let cbbAnoValidade = document.querySelector("#cbbAnoValidade");
        let txtNumCartao = document.querySelector("#txtNumCartao");
        let cbbQtdParcela = document.querySelector("#cbbQtdParcela");
        let txtNumCPF = document.querySelector("#txtNumCPF");
        let txtNomeTitularCartao = document.querySelector("#txtNomeTitularCartao");
        let txtNomeCVVCartao = document.querySelector("#txtNomeCVVCartao");
        let rdbPagCartao = document.querySelector("#rdbPagCartao");
        let rdbPagBoleto = document.querySelector("#rdbPagBoleto");
        let rdbSedex = document.querySelector("#rdbSedex");
        let rdbPAC = document.querySelector("#rdbPAC");

        let self = this;

        if(cbbEndereco.options[cbbEndereco.selectedIndex].value == 'NULL'){
            self.swall('Por favor, selecione um endereço para entrega de sua compra');
            cbbEndereco.style.borderColor = 'red';
            return false;
        }
        else{
            cbbEndereco.style.borderColor = '#ced4da';
        }

        if(rdbPAC.checked==false && rdbSedex.checked == false){
            self.swall('Por favor, escolha um serviço de entrega para sua compra');
            return false;
        }

        if(rdbPagBoleto.checked == false && rdbPagCartao.checked == false){
            self.swall('Por favor, selecione uma opção de pagamento.')
            return false;
        }

        if(rdbPagCartao.checked == true){

            //VERIFICA N CARTAO VAZIO OU INVÁLIDO
            if(txtNumCartao.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtNumCartao.style.borderColor = 'red';
                return false;
            }
            else if(self.validaRegex(/^[0-9]*$/,txtNumCartao)==false){
                self.swall('O campo informado deve ser preenchido apenas com números');
                txtNumCartao.style.borderColor = 'red';
                return false;
            }
            else{
                txtNumCartao.style.borderColor = '#ced4da';
            }


            //VERIFICA CBB PARCELAS
            if(cbbQtdParcela.options[cbbQtdParcela.selectedIndex].value == 'NULL'){
                self.swall('Selecione uma opção válida no campo informado');
                cbbQtdParcela.style.borderColor = 'red';
                return false;
            }
            else{
                cbbQtdParcela.style.borderColor = '#ced4da';
            }


            //VERIFICA CPF
            if(txtNumCPF.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtNumCPF.style.borderColor = 'red';
                return false;
            }
            else if(self.validaRegex(/^\d{3}?\.?\d{3}?\.?\d{3}?\-?\d{2}$/, txtNumCPF) == false){
                self.swall('Por favor, digite um CPF válido');
                txtNumCPF.style.borderColor = 'red';
                return false;
            }
            else{
                txtNumCPF.style.borderColor = '#ced4da';
            }


            //VERIFICA NOME IMPRESSO CARTAO
            if(txtNomeTitularCartao.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtNomeTitularCartao.style.borderColor = 'red';
                return false;
            }
            else if(self.validaRegex(/^[a-zA-Z\s]*$/, txtNomeTitularCartao) == false){
                self.swall('Por favor, digite um nome válido no campo informado');
                txtNomeTitularCartao.style.borderColor = 'red';
                return false;
            }
            else{
                txtNomeTitularCartao.style.borderColor = '#ced4da';
            }


            //VERIFICA CBB MES VALIDADE
            if(cbbMesValidade.options[cbbMesValidade.selectedIndex].value == 'NULL'){
                self.swall('Selecione uma opção válida no campo informado');
                cbbMesValidade.style.borderColor = 'red';
                return false;
            }
            else{
                cbbMesValidade.style.borderColor = '#ced4da';
            }


            //VERIFICA CBB ANO VALIDADE
            if(cbbAnoValidade.options[cbbAnoValidade.selectedIndex].value == 'NULL'){
                self.swall('Selecione uma opção válida no campo informado');
                cbbAnoValidade.style.borderColor = 'red';
                return false;
            }
            else{
                cbbAnoValidade.style.borderColor = '#ced4da';
            }


            //VERIFICA CVV
            if(txtNomeCVVCartao.value.length == 0){
                self.swall('O campo informado não pode estar vazio');
                txtNomeCVVCartao.style.borderColor = 'red';
                return false;
            }
            else if(self.validaRegex(/^[0-9]*$/,txtNomeCVVCartao) == false){
                self.swall('O campo informado deve ser preenchido apenas com números');
                txtNomeCVVCartao.style.borderColor = 'red';
                return false;
            }
            else{
                txtNomeCVVCartao.style.borderColor = '#ced4da';
            }
        }

        return true;
    }

    finalizaPedido = () =>{

        let btnFinaliza = document.getElementById('btnFinalizaCompra');
        let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));
        let self = this;

        btnFinaliza.addEventListener('click', function(event){

            event.preventDefault();

            if(self.verificaCompleto()){

                let URL = 'http://patanajanta.test/api';
                let endPoint = `/pedido/gerar/${dadosUsuario.id}`

                URL+=endPoint;

                console.log(self.montaJSONPedido())
                //localStorage.setItem('AAA', JSON.stringify(self.montaJSONPedido()));

                Swal.fire({
                    title: 'Aguarde um momento...',
                    text: 'Seu pedido está sendo gerado.',
                    icon: 'info',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false
                });
                
                axios.post(URL, self.montaJSONPedido())
                .then(function(resp){
                    
                    //REDIRECIONA PARA PAGINA SUCESSO PEDIDO
                    let currentURL = window.location.href;
                    let domain = currentURL.split("/");

                    window.location.replace(domain[0] + "#/sucessopedido");

                    //ZERA CARRINHO E ITENS APÓS A COMPRA
                    let itens = JSON.parse(localStorage.getItem('carrinho'));
                    localStorage.setItem('carrinho',JSON.stringify([]));
                    localStorage.setItem('qtdItem',JSON.stringify([]));
                    window.location.reload(false);

            
                })
                .catch(function(erro){
                    Swal.fire({
                        title: 'Erro API Gerar Pedido',
                        html: `Houve um erro ao gerar o pedido. Por favor, tente novamente mais tarde<br>${erro}`,
                        icon: 'error',
                        confirmButtonColor: "#B86360",
                        confirmButtonText: 'OK'
                    });
                })
            }
        });
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
                                                {/* <option selected value="NULL">Selecione o Endereço</option> */}
                                            </select>

                                            <div className="row">
                                                <div className="col-sm-12 espacoTop10">
                                                    <input type="text" maxlength="9" className="form-control" id="txtCEP" placeholder="CEP" required />
                                                    <h6 className="espacoTop10" id="msgErro"></h6>
                                                </div>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col-sm-12 espacoTop10">
                                                    <input type="text" className="form-control" id="txtNomeDest" placeholder="Destinatario" required />
                                                </div>
                                            </div> */}

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
                                                    <Button style="btn-padrao" type="submit" title={this.state.lblBtnSalvar} id='btnSalvarEndereco' />
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
                                                            <input className="form-check-input" type="radio" name="FormPagamento" id="rdbPagCartao" value="4" checked />
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
                                                        <input maxlength='16' type="text" className="form-control" id="txtNumCartao" placeholder="Número do cartão de crédito" required />
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

                                                            <input className="form-check-input" type="radio" name="FormPagamento" id="rdbPagBoleto" value="5" />
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
                                                    <label className="corBege">{valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
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
                                                    <h5 className="corMarrom">{valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                                </div>
                                                <span class="space"></span>
                                                <div className="col-12 mt-5 text-center">
                                                    <Button title="Finalizar Compra" style="btn-padrao" id='btnFinalizaCompra'/>
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
