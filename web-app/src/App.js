import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import axios from 'axios';
import { Table } from './components/table';

function App() {

  const [simbolos, setSimbolos] = useState([]);


  const obtenerConcat = async (array) =>{
    return array.map(e => e.symbol).join(",")
  }

  useEffect(() =>{
    // const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');
    // console.log("##",socket);
    // socket.on("connect", data => {
    //   console.log(data);
    //   socket.emit('subscribe', 'fb')
    // });

    axios.get(`https://api.iextrading.com/1.0/tops`)
    .then(res => {
      let datos = [];

      if(res.data){
        datos = res.data
        .sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0,50);

        console.log("DATOS", datos);
        
        setSimbolos(datos);

        obtenerConcat(datos).then(res => {
          console.log("CONCAT", res)
          
        });

        
      }
    })


    setTimeout(() => {
      setSimbolos([{"symbol":"SNAP","sector":"mediaentertainment","securityType":"commonstock","bidPrice":0,"bidSize":0,"askPrice":0,"askSize":0,"lastUpdated":1568059568165,"lastSalePrice":15.325,"lastSaleSize":100,"lastSaleTime":1568059194035,"volume":1711721,"marketPercent":0.03463}]);
    }, 500);
    // let socket = io.connect('https://ws-api.iextrading.com/1.0/tops');
    // socket.on('connect', function() {
      
      
    //   var ss = socket.emit('subscribe', 'fb');  
    //   console.log("$$$", ss);
      
    // });

  }, [])

  return (
    <div className="App">
      <Table simbolos={simbolos}></Table>
    </div>
  );
}

export default App;
