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

          <h2 className="generalInfo">Detailed overview about {individual}</h2>

          <table className="detailsTable">
            <thead>
            <tr>
              <th>
                Current Price
              </th>
              <th>
                All Time High (ATH)
              </th>
              <th>
                % since ATH
              </th>
              <th>
                date of ATH
              </th>
              <th>
                All Time Low (ATL)
              </th>
              <th>
                % since ATL
              </th>
              <th>
                date of ATL
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
               {numberWithCommas(currency.market_data.current_price[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.ath[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.ath_change_percentage[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.ath_date[currentCurrencyType]}
              </td>
              <td>
               {numberWithCommas(currency.market_data.atl[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.atl_change_percentage[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.atl_date[currentCurrencyType]}
              </td>
              </tr>
            </tbody>
          </table>

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
                Fully diulated valuation
              </th>
              <th>
                Total Volume
              </th>
              <th>
                Highest value in last 24h
              </th>
              <th>
                Lowest Value in last 24h
              </th>
              <th>
                Price change in last 24h
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
                 {numberWithCommas(currency.market_data.fully_diluted_valuation[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.total_volume[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.high_24h[currentCurrencyType])}
              </td>
              <td>
               {numberWithCommas(currency.market_data.low_24h[currentCurrencyType])}
              </td>
              <td>
               {currency.market_data.price_change_24h}
              </td>
              </tr>
            </tbody>
          </table>

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

          <table className="detailsTable">
            <thead>
            <tr>
              <th>
                Market cap change (24h)
              </th>
              <th>
                market cap change % (24h)
              </th>
              <th>
                price change in specific currency (24h)
              </th>
              <th>
                price change % in specific currency (1h)
              </th>
              <th>
                price change % in specific currency (24h)
              </th>
              <th>
                price change % in specific currency (7d)
              </th>
              <th>
                price change % in specific currency (14d)
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
               {numberWithCommas(currency.market_data.market_cap_change_24h)}
              </td>
              <td>
              {currency.market_data.market_cap_change_percentage_24h}
              </td>
              <td>
               {numberWithCommas(currency.market_data.price_change_24h_in_currency[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.price_change_percentage_1h_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_24h_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_7d_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_14d_in_currency[currentCurrencyType]}
              </td>
              </tr>
            </tbody>
          </table>

          <table className="detailsTable">
            <thead>
            <tr>
              <th>
                price change % in specific currency (30d)
              </th>
              <th>
                price change % in specific currency (60d)
              </th>
              <th>
                price change % in specific currency (200d)
              </th>
              <th>
                price change % in specific currency (1y)
              </th>
              <th>
                market cap change in specific currency (24h)
              </th>
              <th>
                market cap change % in specific currency (24h)
              </th>
              <th>
                total supply
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
              {currency.market_data.price_change_percentage_30d_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_60d_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_200d_in_currency[currentCurrencyType]}
              </td>
              <td>
              {currency.market_data.price_change_percentage_1y_in_currency[currentCurrencyType]}
              </td>
              <td>
              {numberWithCommas(currency.market_data.market_cap_change_24h_in_currency[currentCurrencyType])}
              </td>
              <td>
              {currency.market_data.market_cap_change_percentage_24h_in_currency[currentCurrencyType]}
              </td>
              <td>
               {numberWithCommas(currency.market_data.total_supply)}
              </td>
              </tr>
            </tbody>
          </table>

          <table className="detailsTable endOfPage">
            <thead>
            <tr>
              <th>
                max supply
              </th>
              <th>
                circulating supply
              </th>
              <th>
                last updated
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>
               {numberWithCommas(currency.market_data.max_supply)}
              </td>
              <td>
              {numberWithCommas(currency.market_data.circulating_supply)}
              </td>
              <td>
              {currency.market_data.last_updated}
              </td>
              </tr>
            </tbody>
          </table>
          </div>
    );
}
 
export default CurrencyDetails;