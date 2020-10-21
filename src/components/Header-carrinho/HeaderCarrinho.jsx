import React from 'react'
import Logo from '../../images/logo.png'
import '../Header-carrinho/header-carrinho.css'

export default props =>
<div className="row header">
    <div className="col-12 col-sm-2 text-center mt-2">
        <a href="#/home"><img className="img-fluid" src={Logo} alt="logo" width="170px"/></a>
    </div>
</div>