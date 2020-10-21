import React from 'react'
import '../Footer/footer.css'
import Visa from '../../images/visa.png'
import Mastercard from '../../images/mastercard.png'
import Paypal  from '../../images/paypal.png'
import Amex from '../../images/amex.png'
import Instagram from '../../images/instagram.png'
import Twitter from '../../images/twitter.png'
import Facebook from '../../images/facebook.png'


export default props =>
<div className="row footer">
    <div className="col-12 mt-3">
        <div className="row">
            <div className="col-12 col-sm-6">
                <div className="text-left ml-3">
                    <h6 className="titulo">Formas de Pagamento</h6>
                    <img id="card-1" className="img-fluid" src={Mastercard} alt="mastercard" width="50px"/>
                    <img id="card-2" className="ml-2 img-fluid" src={Visa} alt="visa" width="50px"/>
                    <img id="card-3" className="ml-2 img-fluid" src={Paypal} alt="paypal" width="53px"/>
                    <img id="card-4" className="ml-2 img-fluid" src={Amex} alt="american" width="55px"/>
                </div>
            </div>
            <div className="col-12 col-sm-6">
                <div className="divOrientation mr-3">
                    <h6 className="titulo">Redes Sociais</h6>
                    <img className="mr-2 img-fluid" src={Instagram} alt="instagram" width="40px"/>
                    <img className="mr-2 img-fluid" src={Twitter} alt="Twitter" width="40px"/>
                    <img className="img-fluid" src={Facebook} alt="face" width="35px"/>
                </div>    
            </div>
        </div>
    </div>
    <div className="col-12 text-center mt-4">
        <p>Política de privacidade | © 2020 PATA NA JANTA. Todos os direitos reservados.</p>
    </div>
    
</div>

