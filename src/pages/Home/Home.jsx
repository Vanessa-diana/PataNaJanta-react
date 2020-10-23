import React from 'react'
import Card from '../../components/Card/Card'
import '../Home/home.css'
import Banner1 from '../../images/banner1.png';
import Banner2 from '../../images/banner2.png';
import Banner3 from '../../images/banner3.png';
import Banner4 from '../../images/banner4.png';
import Title from '../../components/Titulo/Title';




/* <!-- CARROSSEL -->*/
export default props =>
    <>

        <div id="carouselExampleControls" className="carousel slide row" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={Banner1} alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Banner2} alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={Banner3} alt="Third slide" />
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
            <Card />
            </div>
            {/* <!--comeco - banner--> */}
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-2">
                        <img className="img-fluid" src={Banner4} />
                    </div>
                </div>
                {/* <!--fim - banner-->  */}
                <Title style="pgato mt-2" title="Para seu gato" />
                <Card/>
            </div>
        
    </> 