import React, {Fragment, useState} from 'react';
import MaterialTable from 'material-table';
import { Element } from '../element/element';
import './table.css';

var _simbolos = [];

export const Table = props =>{
    const {
        simbolos,
        filtro,
        actualizarSimbolos,
    } = props;

    const columnas = {
        symbol:"symbol"
        ,volume:"volume"
        ,lastSalePrice:"lastSalePrice"
        ,bidPrice:"bidPrice"
        ,marketPercent:"marketPercent"
        ,lastUpdated:"lastUpdated"
    }

    const [properties, setProperties] = useState({
        esAscendente: false,
        headerFilter: ''
    });

   _simbolos = [...simbolos];

   const updateSimbolo = async (simbolo, indice) =>{
    _simbolos[indice] = {...JSON.parse(simbolo)};
    }

    const renderRows = () =>{
        const ss = simbolos.map((s,i) => {
            const _class = s.symbol.toLowerCase().includes(filtro || '') ? '' : 'display-none';
            return <Element key={i} simbolo={s} indice={i} classElement={_class} updateSimbolo={updateSimbolo}/>
        })
        return ss;
    }
    const sorting = (header) =>{
        
        if(header === 'lastUpdated'){
            _simbolos.sort((a,b) => b[header] - a[header]);
        }else{
            _simbolos.sort(function (a, b) {
                var x = a[header],
                    y = b[header];
    
                if (properties.esAscendente) {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                } else {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }

        actualizarSimbolos(_simbolos);
        setProperties({...properties, esAscendente: !properties.esAscendente, headerFilter: header});  
    }

    const obtenerFlechaOrdenamiento = (header) =>{
        if(header === properties.headerFilter){
            if(properties.esAscendente) return 'asc'
            else return 'desc'
        }

        return 'display-none'
    }


    return (
        <Fragment>
            <table className="table">
                <thead className="thead-inverse">
                    <tr>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.symbol)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.symbol)}>_</span>
                            Symbol
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.volume)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.volume)}>_</span>
                            Volume
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.lastSalePrice)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.lastSalePrice)}>_</span>
                            Price
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.bidPrice)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.bidPrice)}>_</span>
                            bad Price
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.marketPercent)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.marketPercent)}>_</span>
                            Mkt%
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.volume)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.volume)}>_</span>
                            Vol.
                            </th>
                        <th className={`header-sorting`} 
                            onClick={() => sorting(columnas.lastUpdated)}>
                            <span className={obtenerFlechaOrdenamiento(columnas.lastUpdated)}>_</span>
                            Last Update
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderRows()     
                    }
                </tbody>
            </table>
        </Fragment>
    )
}