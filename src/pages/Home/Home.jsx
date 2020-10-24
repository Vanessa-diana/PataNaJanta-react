import React, {Component} from 'react'
import Card from '../../components/Card/Card'
import '../Home/home.css'
import '../../components/Card/card.css'
import Title from '../../components/Titulo/Title';
import axios from 'axios';

const list = [];
const listGato = [];

/* <!-- CARROSSEL -->*/
export default class Home extends Component {

    constructor(props){
         super(props)
         this.state = {  list: [], listGato: [] }
         this.getCachorro();
         this.getGato();
     }
     refreshCachorro = () => {
       return this.state.list.map((item => {
      return <Card image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} />
        }))
    }
    getCachorro = () => {
        let URL = 'http://patanajanta.test/api/produto/maisvendido/cachorro'
        axios.get(`${URL}`)
        .then(resp => this.setState({list: resp.data}))
    }

    refreshGato = () => {
        return this.state.listGato.map((item => {
       return <Card image={item.img_produto} nome={item.nome} preco={item.vlr_aquisicao} />
         }))
     }
     getGato = () => {
        let URL = 'http://patanajanta.test/api/produto/maisvendido/gato'
         axios.get(`${URL}`)
         .then(resp => this.setState({listGato: resp.data}))
     }

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
                        <img className="img-fluid" src="https://i.ibb.co/58bTjZc/banner4.png" />
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