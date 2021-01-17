import './css/App.css';
import redarrow from './imgs/redarrow.png'
import greenarrow from './imgs/greenarrow.png'
import React from 'react';
import {Link} from 'react-router-dom';
import list from './list.json';
import {graph} from './graphstuff';


const Currency = ({name, image, symbol, price, volume, priceChange, marketcap, currencyType}) => {

    // coingecko api uses different names than the actual cryptocurrency.
    // to get around this, find the symbol of the currency to obtain whatever coingecko uses as its name
    // differentiate between coingecko definition of currency name and actual name
    // uses local json to avoid 6k+ axios requests per load
        let obj = list.find(o => o.symbol === symbol);
        let linkName = obj.id;

        let graphname;

        // console.log(graph['polkadot']);
        if (name.toLowerCase() in graph) {
            graphname = graph[name.toLowerCase()];
        } else if (/\s/.test(name)) {
            graphname = name.replace(/\s+/g, '-').toLowerCase();
        } else {
            graphname = name.toLowerCase();
        }
        

    return ( 
            <tr className="table-row">
                <td>
                    <img src={image} alt="cryptocurrency" />
                    <Link to={linkName}>
                        <span>{name}</span>
                    </Link>
                </td>
                <td>
                    <p className="currency-symbol">{symbol}</p>
                </td>
                <td>
                    {currencyType} {price.toLocaleString()}
                </td>
                <td>
                    {priceChange < 0 ? (
                            <p className="currency-percent red">
                                <img className="arrow" src={redarrow} alt="" />
                                {priceChange}%
                                </p>
                        ) : (
                            <p className="currency-percent green">
                                <img className="arrow" src={greenarrow} alt="" />
                                {priceChange}%
                                </p>
                        )
                    }
                </td>
                <td>
                {currencyType} {volume.toLocaleString()}
                </td>
                <td>
                {currencyType} {marketcap.toLocaleString()}
                </td>
                <td>
                    <img className="currencyGraph" src={`https://crypto.com/price/coin-data/${graphname}/sparkline.png`}></img>
                </td>
            </tr>
            
     );
}
 
export default Currency;