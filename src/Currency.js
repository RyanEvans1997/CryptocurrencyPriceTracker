import './css/App.css';
import redarrow from './imgs/redarrow.png'
import greenarrow from './imgs/greenarrow.png'
// import { Chart } from 'react-charts';
import React from 'react';

const Currency = ({name, image, symbol, price, volume, priceChange, marketcap, currencyType}) => {
    const handleLink = (e) => {
        console.log(e.target.innerHTML);
    }
    return ( 
            <tr className="table-row">
                <td>
                    <img src={image} alt="cryptocurrency" />
                    <a href={name} onClick={handleLink}>
                        <span>{name}</span>
                    </a>
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
            </tr>
            
     );
}
 
export default Currency;