import React from 'react';
import Banner1 from '../../images/banner1.png';
import Banner2 from '../../images/banner2.png';
import Banner3 from '../../images/banner3.png';
import Banner4 from '../../images/banner4.png';

/* <!-- CARROSSEL -->*/
export default props=>
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100" src={Banner1} alt="First slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src={Banner2} alt="Second slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src={Banner3} alt="Third slide"/>
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

/* <!-- DIV DE CONTEUDO DA PAGINA--> */
        <div className="container">
            <div className="mvendido mt-3">
                <h1><strong>Mais Vendidos</strong></h1>
            </div>
                <div className="pcachorro mt-3">
                    <h2>Para seu cachorro</h2>
                </div>
                        {/* INICIANDO CARDS */}
           <div className="row custom-cards">
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/racao-adulto-special-15kg-golden-3310549-15kg.png" alt="racao-adulto-special-15kg-golden-3310549-15kg"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                            <h6 className="card-title">Ração para Cães Adultos Golden premium...</h6>
                        </div>
                        <p className="card-text">R$ 109,90</p>
                        <a href="detalhes-produto.html" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/CAES---FRANGO-100G---F.png" alt="CAES---FRANGO-100G---F"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h6 className="card-title">Alimento Úmido Premier Cães Gourmet...</h6></div>
                      <p className="card-text">R$ 28,90</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/Bifinho-Origem-Natural-Cordeiro.png" alt="Tapete-Higienico-Super-Secao-Citrus-Petix"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h6 className="card-title">Bifinho Origem Natural Cordeiro Cães</h6></div>
                      <p className="card-text">R$ 69,90</p>
                      <a href="#" class="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/Coleira-Antipulgas-Seresto-Caes-Acima-de-8kg-4.png" alt="Blue_30_unidades_a_3757381"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h6 className="card-title">Coleira Antipulgas Seresto Cães Acima de 8kg...</h6></div>
                      <p className="card-text">R$ 199,90</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
           </div>

             {/* <!--comeco - banner--> */}
            <div className="row">
                <div className="col-12 mt-2">
                    <img className="img-fluid" src={Banner4}/>
               </div>
            </div>
        </div>
          
/* <!--fim - banner--> */

<div className="pgato mt-2">
    <h2>Para seu gato</h2>
</div>
        <div className="row custom-cards mb-2">
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/3132_-_Sachet_GP_Gato_Castrado_Frango_85g.png" alt="Card image cap"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h5 className="card-title">Ração Úmida Gran Plus Gatos Castrados Frango</h5></div>
                      <p className="card-text">R$ 2,39</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/Alimento-Umido-Premier-Gourmet-Gatos-Atum-e-Arroz-.png" alt="Card image cap"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h5 className="card-title">Alimento Úmido Premier Gatos Gourmet Atum</h5></div>
                      <p className="card-text">R$ 5,49</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/premium-para-gatos-adultos-castrados.png" alt="Card image cap"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h5 className="card-title">Ração Royal Canin Premium Gatos Castrados</h5></div>
                      <p className="card-text">R$ 36,39</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                    <img className="card-img-top img-fluid" src="images/Granulado-Sanitario-Natural-Katbom-3kg.png" alt="Card image cap"/>
                    <div className="card-body">
                        <div className="container limiteLinhas">
                      <h5 className="card-title">Granulado Sanitário Natural Katbom 3kg</h5></div>
                      <p className="card-text">R$ 21,90</p>
                      <a href="#" className="btn btn-comprar">Comprar</a>
                    </div>
                </div>
            </div>
        </div>