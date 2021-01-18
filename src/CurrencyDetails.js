import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './css/App.css';

const CurrencyDetails = ({currentCurrencyType, currentCurrencySymbol}) => {
    const [isLoading, setLoading] = useState(true);
    const [currency, setCurrency] = useState();

    let individual = window.location.href.includes('http://localhost:3000/') ? window.location.href.slice(22,).toLowerCase() : window.location.href.slice(47,).toLowerCase();

    function numberWithCommas(x) {
      if(Boolean(x)) {
        return currentCurrencySymbol + x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return  "N/A";
      }
    }

    function formatDate(date) {
      let year = date.slice(0,4);
      let month = date.slice(5,7);
      let day = date.slice(8,10);
      return(`${day}/${month}/${year}`)
    }

    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${individual}`)
      .then((res) => {
        setCurrency(res.data);
        setLoading(false);
      },)
      .catch(error => {
        console.log(error);
      })
    }, [individual])

    if (isLoading) {
      return <div>Loading...</div>
    }

    return ( 
        <div className="container">
          <a className="navBar" href="/">Home</a>
          <h1> <img src={currency.image.small} alt=""></img> {currency.name} ( {currency.symbol.toUpperCase()} )</h1>

          <h3>Homepage found at: {currency.links.homepage}</h3>

          <div className="description">
            {
              <p dangerouslySetInnerHTML={{__html: currency.description.en}} >
                </p>
            }
          </div>

          <h2>General price trends</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
              Current Price
              </th>
              <th>
              Price change (24h)
              </th>
              <th>
              Highest Value (24h)
              </th>
              <th>
              Lowest Value (24h)
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
               {numberWithCommas(currency.market_data.current_price[currentCurrencyType])}
              </td>
              <td>
              {numberWithCommas(currency.market_data.price_change_24h)}
              </td>
              <td>
              {numberWithCommas(currency.market_data.high_24h[currentCurrencyType])}
              </td>
              <td>
              {numberWithCommas(currency.market_data.low_24h[currentCurrencyType])}
              </td>
              </tr>
            </tbody>
          </table>

          

          <h2>Volume and supply</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
              Total Volume
              </th>
              <th>
              Fully diulated valuation
              </th>
              <th>
              circulating supply
              </th>
              <th>
              total supply
              </th>
              <th>
              max supply
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {numberWithCommas(currency.market_data.total_volume[currentCurrencyType])}
              </td>
              <td>
              {numberWithCommas(currency.market_data.fully_diluted_valuation[currentCurrencyType])}
              </td>
              <td>
              {numberWithCommas(currency.market_data.circulating_supply)}
              </td>
              <td>
              {numberWithCommas(currency.market_data.total_supply)}
              </td>
              <td>
              {numberWithCommas(currency.market_data.max_supply)}
              </td>
              </tr>
            </tbody>
          </table>

          <h2>Market Cap information</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
                Market Cap
              </th>
              <th>
                Market Cap Rank
              </th>
              <th>
              Market cap change (24h)
              </th>
              <th>
              market cap change % (24h)
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {numberWithCommas(currency.market_data.market_cap[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.market_cap_rank}
              </td>
              <td>
              {numberWithCommas(currency.market_data.market_cap_change_24h)}
              </td>
              <td>
              {currency.market_data.market_cap_change_percentage_24h}
              </td> 
              </tr>
            </tbody>
          </table>

          <h2>ATH Information</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
              All Time High (ATH)
              </th>
              <th>
              % since ATH
              </th>
              <th>
              date of ATH
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {numberWithCommas(currency.market_data.ath[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.ath_change_percentage[currentCurrencyType]}
              </td>
              <td>
              {formatDate(currency.market_data.ath_date[currentCurrencyType])}
              </td>
              </tr>
            </tbody>
          </table>

          <h2>ATL information</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
              All Time Low (ATL)
              </th>
              <th>
              % since ATL
              </th>
              <th>
               Date of ATL
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {numberWithCommas(currency.market_data.atl[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.atl_change_percentage[currentCurrencyType]}
              </td>
              <td>
              {formatDate(currency.market_data.atl_date[currentCurrencyType])}
              </td>
              </tr>
            </tbody>
          </table>

          <h2>Price change percentage timeframe</h2>
          <table className="detailsTable">
            <thead>
            <tr>
              <th>
              % price change (24h)
              </th>
              <th>
              % price change (7d)
              </th>
              <th>
              % price change (14d)
              </th>
              <th>
              % price change (30d)
              </th>
              <th>
              % price change (60d)
              </th>
              <th>
              % price change (200d)
              </th>
              <th>
              % price change (1y)
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {currency.market_data.price_change_percentage_24h}
              </td>
              <td>
              {currency.market_data.price_change_percentage_7d}
              </td>
              <td>
              {currency.market_data.price_change_percentage_14d}
              </td>
              <td>
              {currency.market_data.price_change_percentage_30d}
              </td>
              <td>
              {currency.market_data.price_change_percentage_60d}
              </td>
              <td>
              {currency.market_data.price_change_percentage_200d}
              </td>
              <td>
              {currency.market_data.price_change_percentage_1y}
              </td>
              </tr>
            </tbody>
          </table>

          <h2>Last Updated</h2>
          <table className="detailsTable endOfPage">
            <thead>

            </thead>
            <tbody>
              <tr>
              <td>
              {formatDate(currency.market_data.last_updated)}
              </td>
              </tr>
              </tbody>
          </table>
          </div>
    );
}
 
export default CurrencyDetails;