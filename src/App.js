import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [currency, setCurrency] = useState([]);

  const getCurrency = async () => {
    const { data } = await axios("https://api.currencyfreaks.com/latest", {
      params: {
        apikey: "e85fa0b718a44accab96e410be5e76a6",
        symbols: "CAD,IDR,JPY,CHF,EUR,GBP",
      },
    });
    setCurrency(data.rates);
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-5">Display Rate Currency</h3>
      <table className="table table-striped mb-5">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">We Buy</th>
            <th scope="col">Exchange Rate</th>
            <th scope="col">We Sell</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currency).map((value, index) => {
            const currencyName = value[0];
            const currencyRate = Number(value[1]);
            const gap = currencyRate * (5 / 100);
            const weBuy = currencyRate + gap;
            const weSell = currencyRate - gap;
            return (
              <tr key={index}>
                <th scope="row">{currencyName}</th>
                <td>{weBuy}</td>
                <td>{currencyRate}</td>
                <td>{weSell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h6 className="text-center">Rates are based from 1 USD</h6>
      <h6 className="text-center">
        This aplication uses API from currencyfreaks
      </h6>
    </div>
  );
}

export default App;
