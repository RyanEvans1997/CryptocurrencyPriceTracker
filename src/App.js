import './css/App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Currency from './Currency';

function App() {

  const[currency, setCurrencys] = useState([]);
  const [search, setSearch] = useState([]);

  const geckoAPI = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=250&page=1&sparkline=false'

  useEffect(() => {
    axios.get(geckoAPI)
    .then(res => {
      setCurrencys(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  const handleChange = e => {
      setSearch(e.target.value);
  }

  const filteredCurrencys = currency.filter(currency => 
    currency.name.toLowerCase().includes(search.toString().toLowerCase())
    )

  const filteredSymbols = currency.filter(currency => 
    currency.symbol.toLowerCase().includes(search.toString().toLowerCase())
    )
  return (
    <div className="app-layout">
      <h1>Today's Cryptocurrency overview</h1>
      <div className="currency-search">
      <form>
        <input type="text" placeholder="&#128269; Search" className="currency-input" onChange={handleChange} />
      </form>
      </div>
      <table>
      <thead>
      <tr> 
            <td>
                <div className="label-name">
                    <p>
                        name 
                    </p>
                </div>
            </td>

            <td>
                <div className="label-symbol">
                    <p>
                        symbol
                    </p>
                </div>
            </td>

            <td>
                <div className="label-price">
                    <p>
                        price (£)
                    </p>
                </div>
            </td>

            <td>
                <div className="label-pricechange">
                    <p>
                        24h
                    </p>
                </div>
            </td>

            <td>
                <div className="label-volume">
                    <p>
                        volume (£)
                    </p>
                </div>
            </td>

            <td>
                <div className="label-marketcap">
                    <p>
                    Mkt Cap (£)
                    </p>
                </div>
            </td>
        </tr>
      </thead>
        <tbody>
      {
        // Compares filtered arrays to show the most relevant search due to overlapping results
        // If users input returns more relevant symbols than actual currency names then return the list of symbols that correspond closely to the users input instead

        filteredSymbols.length >= filteredCurrencys.length ? filteredSymbols.map(currency => {
          return (
            <Currency key={currency.id} name={currency.name} image={currency.image} symbol={currency.symbol} marketcap={currency.market_cap} price={currency.current_price} priceChange={currency.price_change_percentage_24h} volume={currency.total_volume} />
            )
          }
        ) : (
            filteredCurrencys.map(currency => {
              return (
                <Currency key={currency.id} name={currency.name} image={currency.image} symbol={currency.symbol} marketcap={currency.market_cap} price={currency.current_price} priceChange={currency.price_change_percentage_24h} volume={currency.total_volume} />
                )
              }
            )
        )
      }
      </tbody>
      </table>
    </div>
  );
}

export default App;
