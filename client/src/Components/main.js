import React, { Component } from 'react';
import { Box} from 'rimble-ui'
import {Card} from 'react-bootstrap'

class Main extends Component {
  render() {
    return (
      <main>
       	<Box m={5} p={10}>
                         <Card style={{  }}>
                            <Card.Body>
                                <Card.Title><b>Autores</b></Card.Title>
                                <Card.Text>
								<ol>
									<li>Jean Paul Mosquera - <a href="mailto:jpmosquera1@utpl.edu.ec"><b>jpmosquera1@utpl.edu.ec</b></a> / <a href="https://jeanmosquera.me"><b>Mas información</b></a> </li> 
									<li>PhD. Nelson Piedra - <a href="mailto:nopiedra@utpl.edu.ec"><b>nopiedra@utpl.edu.ec</b></a> /  <a href="https://investigacion.utpl.edu.ec/es/nopiedra"><b>Mas información</b></a></li>
								</ol>
                                </Card.Text>
                            </Card.Body>
                         </Card>
                         <br/>
                         <Card style={{ }}>
                            <Card.Body>
                                <Card.Title><b>Descripción</b></Card.Title>
                                <Card.Text>
                                Este proyecto busca demostrar como sería posible la adopción de tecnología blockchain para lograr la trazabilidad y transparencia en el ámbito agropecuario.
                                <br/>De este modo se ha desarrollado un caso de estudio enfocado a la trazabilidad del café para el cual se aprovecha los beneficios de la tecnología blockchain que
                                son:<br/>
                                <ol>
									<li><b>Transparencia</b></li>
									<li><b>Inmutabilidad</b></li>
                                    <li><b>Descentralización</b></li>
								</ol>

                                </Card.Text>
                            </Card.Body>
                         </Card>
                         <br/>
                         <Card style={{ }}>
                            
                            <Card.Body>
                                <Card.Title><b>¿Como integrar blockchain en la Agricultura y ganaderia?</b></Card.Title>

                                <Card.Text>
                                Para la integración de la tecnología blockchain se ha propuesto una metodología que inicia con la definición de producto 
									y la definición del alcance o caso de uso. Y finaliza con el desarrollo de la aplicación descentralizada que puede visualizarse en la siguiente imagen.
                                </Card.Text>
                                <Card.Img variant="bottom" src={require('../img/supplychain.png')} />
                               
                            </Card.Body>
                         </Card>
                         <br/>
                         <Card style={{ }}>
                            
                            <Card.Body>
                                <Card.Title><b>Arquitectura del Prototipo</b></Card.Title>

                                <Card.Text>
                                Para la definición de la arquitectura del prototipo o caso de aplicación
									se definió como plataforma blockchain  a la plataforma Ethereum de este modo se analizó
								    la arquitectura de las aplicaciones descentralizadas que puede observarse en la figura siguiente
                                </Card.Text>
                                <Card.Img variant="bottom" src={require('../img/arqcu.png')} />
                               
                            </Card.Body>
                         </Card>


						</Box>
     




       
      </main>
    );
  }
}

export default Main;