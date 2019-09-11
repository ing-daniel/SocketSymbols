import React, {Fragment, useState} from 'react';
import MaterialTable from 'material-table';
import { Element } from './element/element';

export const Table = props =>{
    const {
        simbolos
    } = props;

    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Volume</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        simbolos.map((s,i) => <Element key={i} simbolo={s}/> )
                    }
                </tbody>
            </table>
        </Fragment>
    )
}