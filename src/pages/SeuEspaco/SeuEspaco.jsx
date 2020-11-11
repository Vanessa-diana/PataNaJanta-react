import React, { Component } from 'react';
import './seuespaco.css';
import user from '../../images/user.png'
import Title from '../../components/Titulo/Title';
import {protegeLogin} from '../../main/protegeRotas'


export default class SeuEspaco extends Component {

    constructor(props){
        super(props);

        protegeLogin('usuario');
    }

    render() {
        return (
            <div className="container mt-5 mb-3 ">
                <h1>
                    <Title title="Meu Espaço" style="tituloespaco mr-3" />
                </h1>
                <div className="col-12">
                    <div className="container ">
                        <div className="row " >
                            <div className="col-12 col-sm-6 col-lg-6 border-espaco">

                                <h2 className="row tituloseucadastro"> <Title title="Meu Cadastro" />
                                    <img src={user} height="32x" />
                                </h2>

                                <h5> <a href="#/enderecocliente"><p className=" mt-5 pseuespaco"> Meus endereços de entrega</p></a></h5>
                                <h5> <a href="#/formcliente"><p className=" mt-1 pseuespaco"> Meus dados</p></a></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




