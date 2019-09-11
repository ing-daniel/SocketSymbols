import React, {Fragment, useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

export const Element = props =>{
    const [properties, setProperties] = useState({
        simbolo : props.simbolo
    });

    const actualizar = async (properties, valor) =>{
      setProperties({...properties, simbolo: valor})
    }

    useEffect(() =>{
            const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');
            socket.on("connect", () => {
              socket.emit('subscribe', properties.simbolo.symbol)
            });

            socket.on('message', _simbolo => {
              actualizar(properties, JSON.parse(_simbolo))
              console.log("SIM", _simbolo);
              
            });
       }, [])


    return (
        <tr>
           <td>{properties.simbolo.symbol}</td>
           <td>{properties.simbolo.volume}</td>
           <td>{properties.simbolo.lastSalePrice}</td>
           <td>{properties.simbolo.bidPrice}</td>
           <td>{properties.simbolo.marketPercent}</td>
           <td>{properties.simbolo.volume}</td>
           <td>{new Date(properties.simbolo.lastUpdated).toLocaleString()}</td>
           
        </tr>
    )
}
