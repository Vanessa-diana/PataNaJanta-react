import React from 'react';
import './detalhe-produto.css';

export default props=>(
    <>
    <div className="container">
            <div className="container bordaFormulario">
                <form>
                    <div className="row">
                        <div className="col-12">
                            
                            <div className="row">
                                <div className="col-12 col-sm-5 align-middle d-flex justify-content-center">
                                    
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="img-magnifier-container">
                                                        <img id="img_produto" width="400" className="img-fluid" src="https://superprix.vteximg.com.br/arquivos/ids/174774-600-600/Racao-Pedigree-Junior-Filhotes-Racas-Medias-e-Grandes-1kg.png?v=636226827249730000"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
    
                                <div className="col-12 col-sm-7 testeD">
                                    
                                    {/*  TITULO DO PRODUTO */} 
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 id="titulo_produto">Ração Pedigree Vital Pro</h2>
                                        </div>
                                    </div>
    
                                    {/* PRECO PRODUTO + PRECO PARCELADO PRODUTO */}
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <h3 id="preco_produto">Por: R$ 109,90</h3>
                                            <h6 id="preco_produto_parcelado">Ou até 3x de R$ 36,63 sem juros</h6>
                                        </div>
    
                                        {/* Quantidade */} 
                                        <div className="col-12 col-sm-6">
                                            <h6 id="lbl_qtd">Quantidade</h6>
                                            <input id="input_qtd_itens" min="1" value="1" type="number" className="form-control" required/>
                                        </div>
    
                                    </div>
    
                                    <div id="container_btn_comprar" className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <button id="btn_comprar" type="button" className="btn" onclick="location.href='carrinho.html">Comprar</button>
                                            </div>
                                        </div>
                                    </div>

                                      <div className="row">
                                        <div className="col-12">
                                            <div className="form-check" id="container_chk">
                                                <input className="form-check-input" type="checkbox" value="" id="chkZoom"/>
                                                <label className="form-check-label" for="chkZoom">
                                                  Habilitar Zoom
                                                </label>
                                              </div>
                                        </div>
                                    </div>  
    
                                </div>
                            </div>
    
                        </div>
                    </div>
                </form>
            </div>
      </div>
     {/* FIM FORMULARIO PRODUTO */}


        {/*  INICIO DESCRICAO */} 
        <div className="container">

        {/*  TITULO DESCRICAO  */}
            <div className="row">
                <div className="col-12 text-left">
                    <h3 id="lbl_titulo_descricao">Descrição</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h6 id="lbl_conteudo_descricao">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel sollicitudin nisi, id viverra magna. Nam pretium egestas sem nec porta. Sed facilisis tellus nec sagittis commodo. Praesent luctus elit risus, ut varius lorem mattis sed. Curabitur dui lectus, rutrum at rhoncus a, finibus a elit. Duis a porta ligula. Pellentesque aliquet molestie ante, vel tristique diam sagittis non. Curabitur sodales lorem quis eros sagittis, id maximus purus rhoncus. Vestibulum vel accumsan tellus. Suspendisse at urna sit amet tortor venenatis hendrerit. Curabitur in velit accumsan, varius nunc quis, tincidunt orci. Suspendisse potenti. Etiam quis ullamcorper orci. Vivamus ut malesuada nibh. In auctor ornare elit, et fermentum magna ullamcorper vel. Mauris eleifend aliquam mauris, ut mattis eros commodo at.</h6>
                </div>
            </div>
        </div>
    </>
)

