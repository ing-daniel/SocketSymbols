import React, {Fragment, useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import { formatoDePesos } from '../../common/functions';

export const Element = props =>{

    const {
        updateSimbolo,
        indice
    } = props;

    const [properties, setProperties] = useState({
        simbolo : props.simbolo,
        classColor: 'white'
    });

    const actualizar = async (properties, valor) =>{
        const objetct = {...properties, simbolo: valor, classColor:'#1FDA71'};
      setProperties(objetct);
      setTimeout((obj) => {
        setProperties({...obj,  classColor:'white'});
      }, 500, objetct);
    }

    useEffect(() =>{
            const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');
            socket.on("connect", () => {
              socket.emit('subscribe', properties.simbolo.symbol)
            });

            socket.on('message', _simbolo => {
              actualizar(properties, JSON.parse(_simbolo));
              updateSimbolo(_simbolo, indice)
            });

       }, [])

    return (
        <tr className={props.classElement} style={{backgroundColor: properties.classColor}}>
           <td>{properties.simbolo.symbol}</td>
           <td>{properties.simbolo.volume}</td>
           <td>{formatoDePesos(properties.simbolo.lastSalePrice, 2)}</td>
           <td>{formatoDePesos(properties.simbolo.bidPrice,2)}</td>
           <td>{properties.simbolo.marketPercent}</td>
           <td>{properties.simbolo.volume}</td>
           <td>{new Date(properties.simbolo.lastUpdated).toLocaleString()}</td>
           
        </tr>
    )
}
