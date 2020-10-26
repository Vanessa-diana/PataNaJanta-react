import React, {Component} from 'react'
import Card from '../../components/Card/Card'
import '../Home/home.css'
import '../../components/Card/card.css'
import Title from '../../components/Titulo/Title';
import axios from 'axios';

/* const list = [];
const listGato = []; */

/* let index = -17; */

export default class Home extends Component {
 
    constructor(props){
         super(props)
         this.state = {  list: [], listGato: [], listProdutos: []}

        this.getCachorro()
        this.getGato()
    }

    refreshCachorro = () => {
        let index = -1;
       return this.state.list.map(item => {
           index++;
            return <Card value ={index} idBtn={`btn-compra-${index}`} image={item.img_produto} nome={item.nome}
             preco={item.vlr_aquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              onClick={this.getItemDetalheProduto} />
        })
    }

    getCachorro = () => {
        let URL = 'http://patanajanta.test/api/produto/maisvendido/cachorro'
        let self = this;

        axios.get(`${URL}`)
        .then(function(resp){
            self.setState({list: resp.data})
            self.setState({listProdutos: self.state.list.concat(self.state.listGato)})
        })
    }

    refreshGato = () => {
        let index = 3;
        return this.state.listGato.map(item => {
            index++;
            return <Card value ={index} idBtn={`btn-compra-${index}`} image={item.img_produto} nome={item.nome}
            preco={item.vlr_aquisicao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
             onClick={this.getItemDetalheProduto} />
        })
     }

     getGato = () => {
        let URL = 'http://patanajanta.test/api/produto/maisvendido/gato'
        let self = this;

         axios.get(`${URL}`)
         .then(function(resp){
            self.setState({listGato: resp.data})
            self.setState({listProdutos: self.state.list.concat(self.state.listGato)})
         })
     }

    
    //PEGA ITEM PARA MOSTRAR NO DETALHE DO PRODUTO - PRONTO
    getItemDetalheProduto = (btnValue)=>{

        console.log(btnValue)
        console.log(this.state.listProdutos)

        try{
            //SALVA ITEM ATUAL NO LOCAL STORAGE
            localStorage.setItem('produto',JSON.stringify(this.state.listProdutos[btnValue]))

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


    //ADC ITENS NO CARRINHO * NÃO APAGAR *
    // addItemCarrinho = (btnValue)=>{

    //     console.log(btnValue)
    //     console.log(this.state.listProdutos)

    //     try{

    //         if(localStorage.getItem('carrinho') == null){
    //             let temp = [];
    //             temp.push(this.state.listProdutos[btnValue])
    //             localStorage.setItem('carrinho',JSON.stringify(temp))
    //         }
    //         else{
    //             let temp = [];
    //             let jsonProdutos = JSON.parse(localStorage.getItem('carrinho'));
                
    //             for(let i=0; i<jsonProdutos.length; i++){
    //                 temp.push(jsonProdutos[i]);
    //             }

    //             temp.push(this.state.listProdutos[btnValue]);
    //             localStorage.setItem('carrinho',JSON.stringify(temp))
    //         }
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

        render(){
            return (
                <>
        <div id="carouselExampleControls" className="carousel slide row" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="https://i.ibb.co/w0Fqmjj/banner1.png" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://i.ibb.co/0ZDsJ5T/banner2.png" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="https://i.ibb.co/tQT6K3D/banner3.png" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        <div className="mvendido mt-3">
            <h1><strong>Mais Vendidos</strong></h1>
        </div>
        <div className="container">
            <Title style="pcachorro mt-3" title="Para seu cachorro" />
            <div className="row">
                {this.refreshCachorro()}
            </div>
             
            
            {/* <!--comeco - banner--> */}
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-2">
                        <img id="teste" className="img-fluid" src="https://i.ibb.co/58bTjZc/banner4.png" />
                    </div>
                </div>
                {/* <!--fim - banner-->  */}

            </div>
                
                <Title style="pgato mt-2" title="Para seu gato" />
                <div className="row">
                    {this.refreshGato()}
                </div>
        </div>
        
    </> 
            )
        }
}