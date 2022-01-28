import React from "react";
import Head from "next/head";
import Coin from "../components/Coin";
import Navbar from "../components/Navbar";

export default function Home() {
  const [queryData, setQueryData] = React.useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
        }, 500);
    };
};

  const handleChange = (el) => {
    if (el.target.value !== "") {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let temp = data.filter((e) =>
            e.name.toLowerCase().includes(el.target.value.trim().toLowerCase())
          );
          setQueryData(temp);
        });
    } else {
      setQueryData([]);
    }
  };

  const optimizedSearch = React.useMemo(()=>debounce(handleChange), []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar active={"home"} />
      <div className="flex w-fit flex-col mt-20 mx-auto">
        <h1 className="p-5 text-6xl font-bold">
          <span className="text-red-500">Crypto </span>
          <span className="text-white">Search </span>
          <span className="text-green-800">Engine</span>
        </h1>
        <h2 className="text-center mt-5 text-lg text-white">
          Search here and add cryptocurrency in favorite for track currency
          prices
        </h2>
        <div className="mt-5">
          <input
            type="text"
            className="w-full py-3 pl-4 rounded-lg bg-cyan-100 outline-none text-xl"
            placeholder="Search crypto currency here...."
            onChange={optimizedSearch}
          />
        </div>
        <div className="overflow-y-scroll max-h-60 bg-cyan-100">
          {queryData.map((e)=><Coin key={e.id} data={e} />)}
        </div>
      </div>
    </>
  );
}
