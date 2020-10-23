import React from 'react';
import './seuespaco.css';
import user from '../../images/user.png'
import Title from '../../components/Titulo/Title';
import Button from '../../components/Button/Button';


export default props =>


    <div className="container mt-5 mb-3 ">

        <h1><strong>
            <Title title="Seu Espaço" style="tituloespaco" />
        </strong></h1>

        <div className="col-12">
            <div className="container ">
                <div className="row " >
                    <div className="col-12 col-sm-6 col-lg-6 border-espaco">

                        <h2 className="row tituloseucadastro"> <Title title="Seu Cadastro" />
                            <img src={user} height="32x" />
                        </h2>

                        <h5> <a href=""><p className=" mt-5 pseuespaco"> Seus endereços de entrega.</p></a></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>


