import React, { Component } from 'react';
import './detalhe-produto.css';
import Button from '../../components/Button/Button'

export default class Detalhes extends Component { 
    state = {
        numero: 1
    }

    aumentar = () =>{
        this.setState({numero:this.state.numero + 1})
    }

    diminuir = () => {
        this.setState({numero:this.state.numero -1})
        if((this.state.numero) <= 0) {
            return this.setState({numero:this.state.numero = 0})
        }
    }

    componentDidMount()
    {
        let self = this;
        document.addEventListener("DOMContentLoaded", function(){
            self.zoom("img_produto", 2);
        });
    }
    zoom = (imgID, zoom) =>{
            var img, glass, w, h, bw;
            img = document.getElementById(imgID);
            /* Create magnifier glass: */
            glass = document.createElement("DIV");
            glass.setAttribute("class", "img-magnifier-glass");
            /* Insert magnifier glass: */
            img.parentElement.insertBefore(glass, img);
            /* Set background properties for the magnifier glass: */
            glass.style.backgroundImage = "url('" + img.src + "')";
            glass.style.backgroundRepeat = "no-repeat";
            glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
            bw = 3;
            w = glass.offsetWidth / 2;
            h = glass.offsetHeight / 2;
            /* Execute a function when someone moves the magnifier glass over the image: */
            glass.addEventListener("mousemove", moveMagnifier);
            img.addEventListener("mousemove", moveMagnifier);
            /*and also for touch screens:*/
            glass.addEventListener("touchmove", moveMagnifier);
            img.addEventListener("touchmove", moveMagnifier);
            function moveMagnifier(e) {
              var pos, x, y;
              /* Prevent any other actions that may occur when moving over the image */
              e.preventDefault();
              /* Get the cursor's x and y positions: */
              pos = getCursorPos(e);
              x = pos.x;
              y = pos.y;
              /* Prevent the magnifier glass from being positioned outside the image: */
              if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
              if (x < w / zoom) {x = w / zoom;}
              if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
              if (y < h / zoom) {y = h / zoom;}
              /* Set the position of the magnifier glass: */
              glass.style.left = (x - w) + "px";
              glass.style.top = (y - h) + "px";
              /* Display what the magnifier glass "sees": */
              glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
            }
            function getCursorPos(e) {
              var a, x = 0, y = 0;
              e = e || window.event;
              /* Get the x and y positions of the image: */
              a = img.getBoundingClientRect();
              /* Calculate the cursor's x and y coordinates, relative to the image: */
              x = e.pageX - a.left;
              y = e.pageY - a.top;
              /* Consider any page scrolling: */
              x = x - window.pageXOffset;
              y = y - window.pageYOffset;
              return {x : x, y : y};
          }
    }

    render(){
        return (
    <>
    <div className="container">
            <div className="container bordaFormulario">
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
                                    
                                    {/* TITULO DO PRODUTO */}
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 id="titulo_produto">Ração Pedigree Vital Pro</h2>
                                        </div>
                                      
                                    {/* PRECO PRODUTO + PRECO PARCELADO PRODUTO */}
                                    <div className="row">
                                        <div className="col-6 col-sm-6">
                                            <h3 id="preco_produto">Por: R$ 109,90</h3>
                                            <h6 id="preco_produto_parcelado">Ou até 3x de R$ 36,63 sem juros</h6>
                                        </div>
                                          {/* Quantidade  */}
                                        <div className="col-6 col-sm-6">
                                            <h3 id="lbl_qtd">Quantidade</h3>
                                             <div className='row'>
                                                <div className="col-1">
                                                    <button onClick={this.diminuir} className='btn btn-quantidade'>-</button>
                                                </div>
                                                <div className="col-2 mr-2 ml-1">
                                                    <input className ='quantidade'type="text" name="quantidade" id="quantidade" value = {this.state.numero}/>
                                                </div>
                                                <div className="col-2 d-flex justify-content-start">
                                                    <button onClick={this.aumentar} className='btn btn-quantidade'>+</button>
                                                </div>
                                            
                                            
                                            </div>
                                        </div>
 
                                    </div>
    
                                    <div id="container_btn_comprar" className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <Button style='btn-padrao'title='Comprar'/>
                                            </div>
                                        </div>
                                  </div>

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
      </div>
</div>      
     {/*  FIM FORMULARIO PRODUTO */ }


        {/* /* INICIO DESCRICAO */}
        <div className="container">

         {/*  TITULO DESCRICAO */}
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
        }

    }
