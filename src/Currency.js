import './css/App.css';
import redarrow from './imgs/redarrow.png'
import greenarrow from './imgs/greenarrow.png'

const Currency = ({name, image, symbol, price, volume, priceChange, marketcap}) => {
    return ( 
            <tr className="table-row">
                <td>
                    <img src={image} alt="cryptocurrency" />
                    <span>{name}</span>
                </td>

                <td>
                    <p className="currency-symbol">{symbol}</p>
                </td>

                <td>
                    £{price}
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
                    £{volume.toLocaleString()}
                </td>

                <td>
                    £{marketcap.toLocaleString()}
                </td>
            </tr>
     );
}
 
export default Currency;