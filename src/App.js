import './css/App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Currency from './Currency';
// https://distracted-lumiere-7704fd.netlify.app/
// npm run git -- "Message of the commit"

function App() {

  const[currency, setCurrencys] = useState([]);
  const[search, setSearch] = useState([]);
  const[currencyType, setCurrencyType] = useState("GBP");
  const[refresh, setRefresh] = useState(10);

  const geckoAPI = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=250&page=1&sparkline=false';

  useEffect(() => {
    axios.get(geckoAPI)
    .then(res => {
      setCurrencys(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyType}&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
    .then(res => {
      setCurrencys(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
  [currencyType, refresh])

  useEffect(() => {
    setInterval(() => {
      let counter = Math.floor(Math.random() * 9999999);
      setRefresh(counter);
    }, 5000)
  }, [])

  const handleChange = e => {
      setSearch(e.target.value);
  }
  
  const handleCurrency = (e) => {
    setCurrencyType(e.target.value);
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
      <div className="intro">
        <p><i>CryptoPrices is a cryptocurrency price tracker that displays the top 250 by Market Cap. Prices by default are set to Great British Pounds (GBP) which you can change on the dropdown menu by the price column header. In the above Search bar, you can search by the currency name or its symbol. The webpage will automatically reload every 10 seconds to accommodate market volatility.</i></p>
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
                        price
                        <select value={currencyType} onChange={handleCurrency} multiple={false}>
                          <option value='GBP'>GBP</option>
                          <option value='USD'>USD</option>
                        </select>
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
                        volume (currency)
                    </p>
                </div>
            </td>

            <td>
                <div className="label-marketcap">
                    <p>
                    Mkt Cap (currency)
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
