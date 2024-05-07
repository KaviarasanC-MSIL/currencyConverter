
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("INR")
  const [convertAmt, setConvertAmt] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)
  useEffect(() => {
    const getExchangedata = async () => {
      let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

      try {
        const response = await axios.get(url)
        console.log(response)
        setExchangeRate(response.data.rates[toCurrency])
        console.log(response.data.rates[toCurrency])
      } catch (error) {
        console.error("Something went wrong ", error)
      }
    };
    getExchangedata()

  }, [fromCurrency, toCurrency])
  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertAmt((amount * exchangeRate).toFixed(2))
    }
  }, [amount, exchangeRate])
  const handleAmountChange = (e) => {
    let value = e.target.value.trim();
    setAmount(value === '' ? '' : parseFloat(value));


  }
  const handleFromCurrency = (e) => {
    setFromCurrency(e.target.value)
  }
  const handleToCurrency = (e) => {
    setToCurrency(e.target.value)
  }
  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount :</label>
            <input type="number" value={amount} id='amt' onChange={handleAmountChange} />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency :</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrency}>

              <option value="USD">USD - United States Dollor</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Doolar</option>
              <option value="CAD">CAD - Canadian Doolar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency :</label>
            <select id="toCurrency" value={toCurrency} onChange={handleToCurrency}>
              <option value="USD">USD - United States Dollor</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Doolar</option>
              <option value="CAD">CAD - Canadian Doolar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>
              {amount} {fromCurrency}  is equal to {convertAmt} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
