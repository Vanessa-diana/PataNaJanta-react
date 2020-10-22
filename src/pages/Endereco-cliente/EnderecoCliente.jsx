import React from 'react'
import Title from '../../components/Titulo/Title'
import '../Endereco-cliente/enderecoCliente.css'

export default props=>
<>
<div className="container">
        <div className="row mt-5">
            <div className="col-12">
                <Title title="Seus endereços cadastrados" style="titulo-card ml-1"/>
            </div>
        </div>
        <div className="row mb-2 text-center">
            <div className="col-6 col-md-6 col-xl-6 card-group">
                <div className="card quadro mt-3">
                    <div className="card-body col-12 text-left">
                        <div className="row">
                            <div className="col-12">
                                <strong className='campo'>Nome: </strong>
                                <span className='dado'>Lorem ipsum nome</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <strong className='campo'>CEP: </strong>
                                <span className='dado'>07000-420</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <strong className='campo'>Endereço: </strong>
                                <span className='dado'>Avenida do Sol,189 - Liberdade - SP</span>
                            </div> 
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
 </> 