import React from 'react'
import Card from '../../components/Card/Card'
import '../Home/home.css'
import Banner1 from '../../images/banner1.png';
import Banner2 from '../../images/banner2.png';
import Banner3 from '../../images/banner3.png';




/* <!-- CARROSSEL -->*/
export default props =>
<>
<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
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

<Card/>
   </> 