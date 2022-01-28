import React from "react";
import { db } from "../config/firebase";
import { ref, set, get, child, remove } from "firebase/database";

export default function Coin({ data }) {
  const [status, setStatus] = React.useState(false);
  const userUUID = JSON.parse(localStorage.getItem("user"));

  const handleClick = (flag) => {
    if (flag) {
      setStatus(false);
      remove(ref(db, userUUID + "/" + data.id));
    } else {
      setStatus(true);
      set(ref(db, userUUID + "/" + data.id), data);
    }
  };

  React.useEffect(() => {
    const dbref = ref(db);

    get(child(dbref, userUUID + "/" + data.id)).then((data) => {
      if (data.val() === null) {
        setStatus(false);
      } else {
        setStatus(true);
      }
    });
  }, []);

  return (
    <div className="flex w-11/12 h-20 justify-between mx-auto hover:">
      <div className="flex space-x-16 items-center">
        <img className="h-11" src={data.image} alt={data.name} />
        <h1>{data.name}</h1>
      </div>
      <div className="flex items-center space-x-16">
        <p>₹ {data.current_price.toLocaleString()} /-</p>
        <button
          className="bg-cyan-600 text-white font-bold px-3 py-1 rounded-lg"
          onClick={() => handleClick()}
        >
          {status ? "Remove" : "Add to Fav"}
        </button>
      </div>
    </div>
  );
}
