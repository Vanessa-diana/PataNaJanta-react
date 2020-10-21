import React from 'react';
import './detalhe-produto.css';

export default function(){

    return(
        <>
            <div class="container">
            <div class="container bordaFormulario">
                <form>
                    <div class="row">
                        <div class="col-12">
                            
                            <div class="row">
                                <div class="col-12 col-sm-5 align-middle d-flex justify-content-center">
                                    
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="img-magnifier-container">
                                                        <img id="img_produto" width="400" class="img-fluid" src="https://superprix.vteximg.com.br/arquivos/ids/174774-600-600/Racao-Pedigree-Junior-Filhotes-Racas-Medias-e-Grandes-1kg.png?v=636226827249730000"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
    
                                <div class="col-12 col-sm-7 testeD">
                                    
                                    {/* TITULO DO PRODUTO */}
                                    <div class="row">
                                        <div class="col-12">
                                            <h2 id="titulo_produto">Ração Pedigree Vital Pro</h2>
                                        </div>
                                    </div>
    
                                    {/* PRECO PRODUTO + PRECO PARCELADO PRODUTO */}
                                    <div class="row">
                                        <div class="col-12 col-sm-6">
                                            <h3 id="preco_produto">Por: R$ 109,90</h3>
                                            <h6 id="preco_produto_parcelado">Ou até 3x de R$ 36,63 sem juros</h6>
                                        </div>
    
                                        {/* Quantidade */}
                                        <div class="col-12 col-sm-6">
                                            <h6 id="lbl_qtd">Quantidade</h6>
                                            <input id="input_qtd_itens" min="1" value="1" type="number" class="form-control" required/>
                                        </div>
    
                                    </div>
    
                                    <div id="container_btn_comprar" class="container">
                                        <div class="row">
                                            <div class="col-12">
                                                <button id="btn_comprar" type="button" class="btn" onclick="location.href='carrinho.html'">Comprar</button>
                                            </div>
                                        </div>
                                    </div>

                                     {/* <div class="row">
                                        <div class="col-12">
                                            <div class="form-check" id="container_chk">
                                                <input class="form-check-input" type="checkbox" value="" id="chkZoom">
                                                <label class="form-check-label" for="chkZoom">
                                                  Habilitar Zoom
                                                </label>
                                              </div>
                                        </div>
                                    </div> */}
    
                                </div>
                            </div>
    
                        </div>
                    </div>
                </form>
            </div>
        </div>
       {/*  /* FIM FORMULARIO PRODUTO */ }


        {/* /* <!-- INICIO DESCRICAO --> */}
        <div class="container">

           {/*  <!-- TITULO DESCRICAO --> */}
            <div class="row">
                <div class="col-12 text-left">
                    <h3 id="lbl_titulo_descricao">Descrição</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <h6 id="lbl_conteudo_descricao">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel sollicitudin nisi, id viverra magna. Nam pretium egestas sem nec porta. Sed facilisis tellus nec sagittis commodo. Praesent luctus elit risus, ut varius lorem mattis sed. Curabitur dui lectus, rutrum at rhoncus a, finibus a elit. Duis a porta ligula. Pellentesque aliquet molestie ante, vel tristique diam sagittis non. Curabitur sodales lorem quis eros sagittis, id maximus purus rhoncus. Vestibulum vel accumsan tellus. Suspendisse at urna sit amet tortor venenatis hendrerit. Curabitur in velit accumsan, varius nunc quis, tincidunt orci. Suspendisse potenti. Etiam quis ullamcorper orci. Vivamus ut malesuada nibh. In auctor ornare elit, et fermentum magna ullamcorper vel. Mauris eleifend aliquam mauris, ut mattis eros commodo at.</h6>
                </div>
            </div>
        </div>
        </>
    )
}