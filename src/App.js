import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { Table } from './components/table/table';

function App() {

  const [properties, setProperties] = useState({
    simbolos: []
    ,indices: {}
    ,filter: ''
  });
  
  const change = (e) =>{
    setProperties({...properties, filter:e.target.value})
  }

  const actualizarSimbolos = async (simbolos) =>{
    setProperties({...properties, simbolos: []})
    setTimeout(() => {
      setProperties({...properties, simbolos})  
    }, 100);  
    
  }

  useEffect(() =>{
    axios.get(`https://api.iextrading.com/1.0/tops`)
    .then(res => {
      let datos = []
          ,_indices = {};

      if(res.data){
        datos = res.data
        .sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0,50);

        datos.forEach((d,i) => {
          _indices = {..._indices, [d.symbol]:i }
        });
        
        setProperties({...properties, simbolos: datos,indices: _indices });
      }
    })
   }, [])

  return (
    <div className="App">
      <h2>Symbols</h2>
      <div className="form-group">
        <input type="text" placeholder='FILTER' className="form-control" value={properties.filter} onChange={(e) => change(e)}/>  
      </div>
      <div className='form-group'>
        <Table 
          simbolos={properties.simbolos} 
          filtro={properties.filter} 
          actualizarSimbolos={actualizarSimbolos} />
      </div>
    </div>
  );
}

export default App;
