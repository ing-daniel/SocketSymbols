import React, {Fragment, useState} from 'react';
import MaterialTable from 'material-table';

export const Table = props =>{

    const {
        simbolos
    } = props;
    
    const [state, setState] = React.useState({
        columns: [
          { title: 'Symbol', field: 'symbol' },
          { title: 'Volume', field: 'volume', type:'numeric' },
          { title: 'Price', field: 'bidPrice', type:'currency' },
          { title: 'Mkt%', field: 'marketPercent' },
          { title: 'Vol.', field: 'volume', type: 'numeric' },
          { title: 'Last Update', field: 'lastUpdated', type:'date'},
        ]
      });

    return (
        <Fragment>
            <MaterialTable
                title="Table Symbols"
                columns={state.columns}
                data={simbolos}
            />
        </Fragment>
    )
}