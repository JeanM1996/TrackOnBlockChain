import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
     
      <header>
        <div className="head">
                <img 
                class="rounded float-left" 
                style={{width: "9em", height: "5em",marginLeft:"1em"}}
                src={require('../img/utpl.png')}
                />
                <img class="rounded float-right" 
                style={{width: "12em", height: "5em",marginRight:"1em"}}
                src={require('../img/utpl2.png')}/>
				<h2 className="display-4" style={{justifyContent: 'center',textAlign: 'center',fontSize:"2em"}}>Universidad Técnica Particular de Loja</h2>
				
				<h3 className="display-5" style={{justifyContent: 'center',textAlign: 'center', fontSize:"1em"}}><b>Knowledge Based System Research Group</b></h3>
				<h1 className="display-7" style={{justifyContent: 'center',textAlign: 'center', fontSize:"2em"}}>Marco de trabajo para la aplicación de blockchain en el ámbito agropecuario</h1>

        </div>
       
      </header>
      
    );
  }
}

export default Header;