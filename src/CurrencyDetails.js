import axios from 'axios';
import React, {useState, useEffect} from 'react';

const IndividualCurrency = ({name}) => {
    const [isLoading, setLoading] = useState(true);
    const [currency, setCurrency] = useState([]);
    const individual = window.location.href.slice(22,).toLowerCase();

    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${individual}`)
      .then((res) => {
        setCurrency(res.data);
        setLoading(false);
      },)
      .catch(error => {
        console.log(error);
      })
    }, [])

    if (isLoading) {
      return <div>Loading...</div>
    }

    return ( 
        <div>
          <h1>{currency.id}</h1>
          <p>{currency.description.en}</p>
          <p>xd</p>
        </div>
    );
}
 
export default IndividualCurrency;