import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import { Table } from './components/table';

function App() {

  let s = {"symbol":"UBER","sector":"mediaentertainment","securityType":"commonstock","bidPrice":0.0000,"bidSize":0,"askPrice":0.0000,"askSize":0,"lastUpdated":1568139135034,"lastSalePrice":1202.2900,"lastSaleSize":1,"lastSaleTime":1568139485170,"volume":12005,"marketPercent":0.01584,"seq":601};

  const [properties, setProperties] = useState({
    simbolos: []
    ,indices: {}
  });
  
  // const obtenerConcat = async (array) =>{
  //   return array.map(e => e.symbol).join(",")
  // }

  // const actualizarValor = async (simbolo, _simbolos, indices) =>{
  //   const _simbolo = JSON.parse(simbolo);
  //   _simbolos[indices[_simbolo.symbol]] = _simbolo;
  //   setProperties({indices,simbolos: _simbolos})
  // }

  useEffect(() =>{
    console.log("########################");
    
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

        // obtenerConcat(datos)
        // .then(res => {
        //   // const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');
        //   // socket.on("connect", () => {
        //   //   socket.emit('subscribe', res)
        //   // });
      
        //   // socket.on('message', simbolo => {
        //   //   actualizarValor(simbolo)

        //   //   setInterval(() => {
              
        //   //   }, interval);
        //   //   console.log("XXXX",simbolo)
        //   // });

        //   setInterval(( simbolos, indices) => {
        //     s.lastSalePrice = Math.random();
        //     actualizarValor(JSON.stringify(s), simbolos, indices)
        //   }, 400, datos, _indices);

        // });
        
      }
    })
   }, [])

  return (
    <div className="App">
      <Table simbolos={properties.simbolos}></Table>
    </div>
  );
}

export default App;
