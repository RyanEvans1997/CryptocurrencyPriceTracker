import './css/App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Currency from './Currency';
import CurrencyDetails from './CurrencyDetails';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// https://cryptoprices-cryptocurrency.netlify.app/
// npm run git -- "Message of the commit"

function App() {

  const[currency, setCurrencys] = useState([]);
  const[search, setSearch] = useState([]);
  const[currencyType, setCurrencyType] = useState("GBP");
  const[refresh, setRefresh] = useState(10);
  const[CurrencySymbol, setCurrencySymbol] = useState("£");
  let currencyCurrencyType = currencyType.toLowerCase();

  const AllCurrencies = {
    "USD": "$",
    "AUD": "$",
    "BRL": "R$",
    "CAD": "$",
    "CHF": "Fr",
    "CLP": "$",
    "CNY": "¥",
    "CZK": "Kč",
    "DKK": "kr",
    "EUR": "€",
    "GBP": "£",
    "HKD": "$",
    "HUF": "Ft",
    "IDR": "Rp",
    "ILS": "₪",
    "INR": "₹",
    "JPY": "¥",
    "KRW": "₩",
    "MNX": "$",
    "NOK": "kr",
    "NZD": "$",
    "PHP": "₱",
    "PKR": "$",
    "PLN": "zł",
    "RUB": "₽",
    "SEK": "kr",
    "SGD": "S$",
    "THB": "฿",
    "TRY": "₺",
    "TWD": "NT$",
    "ZAR": "R"  
}

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
    setCurrencySymbol(AllCurrencies[e.target.value]);
  }

  const filteredCurrencys = currency.filter(currency => 
    currency.name.toLowerCase().includes(search.toString().toLowerCase())
    )

  const filteredSymbols = currency.filter(currency => 
    currency.symbol.toLowerCase().includes(search.toString().toLowerCase())
    )

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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
                          <option value='AUD'>AUD</option>
                          <option value='BRL'>BRL</option>
                          <option value='CAD'>CAD</option>
                          <option value='CHF'>CHF</option>
                          <option value='CLP'>CLP</option>
                          <option value='CNY'>CNY</option>
                          <option value='CZK'>CZK</option>
                          <option value='DKK'>DKK</option>
                          <option value='EUR'>EUR</option>
                          <option value='GBP'>GBP</option>
                          <option value='HKD'>HKD</option>
                          <option value='HUF'>HUF</option>
                          <option value='ILS'>ILS</option>
                          <option value='INR'>INR</option>
                          <option value='JPY'>JPY</option>
                          <option value='KRW'>KRW</option>
                          <option value='MXN'>MXN</option>
                          <option value='MYR'>MYR</option>
                          <option value='NOK'>NOK</option>
                          <option value='NZD'>NZD</option>
                          <option value='PHP'>PHP</option>
                          <option value='PLN'>PLN</option>
                          <option value='RUB'>RUB</option>
                          <option value='SEK'>SEK</option>
                          <option value='SGD'>SGD</option>
                          <option value='THB'>THB</option>
                          <option value='TRY'>TRY</option>
                          <option value='TWD'>TWD</option>
                          <option value='ZAR'>ZAR</option>
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
                        volume
                    </p>
                </div>
            </td>

            <td>
                <div className="label-marketcap">
                    <p>
                    Mkt Cap
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
            <Currency key={currency.id} name={currency.name} image={currency.image} symbol={currency.symbol} marketcap={currency.market_cap} price={currency.current_price} priceChange={currency.price_change_percentage_24h} volume={currency.total_volume} currencyType={CurrencySymbol} />
            )
          }
        ) : (
            filteredCurrencys.map(currency => {
              return (
                <Currency key={currency.id} name={currency.name} image={currency.image} symbol={currency.symbol} marketcap={currency.market_cap} price={currency.current_price} priceChange={currency.price_change_percentage_24h} volume={currency.total_volume} currencyType={CurrencySymbol}/>
                )
              }
            )
        )
      }
      </tbody>
      </table>
    </div>
        </Route>
        <Route path="/:id">
          <CurrencyDetails currentCurrencyType={currencyCurrencyType} currentCurrencySymbol={CurrencySymbol} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
