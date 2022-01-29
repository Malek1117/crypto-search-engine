import React from "react";
import Navbar from "../components/Navbar";
import { db } from "../config/firebase";
import { ref, get, child, remove } from "firebase/database";

export default function favorite(props) {
  const [fav, setFav] = React.useState([]);

  const handleClick = (e) => {
    remove(ref(db, props.uid + "/" + e.id));
    setFav(fav.filter((el) => el.name !== e.name));
  };

  React.useEffect(() => {
    const dbref = ref(db);

    get(child(dbref, props.uid)).then((data) => {
      let temp = [];
      let obj = data.val();
      for (let key in obj) {
        temp.push(obj[key]);
      }
      setFav(temp);
    });
  }, []);

  return (
    <>
      <Navbar active={"fav"} />
      <div className="w-2/5 mx-auto">
        {fav.map((e) => (
          <div
            key={e.id}
            className="flex w-11/12 h-20 justify-between mx-auto hover:"
          >
            <div className="flex space-x-16 items-center">
              <img className="h-11" src={e.image} alt={e.name} />
              <h1>{e.name}</h1>
            </div>
            <div className="flex items-center space-x-16">
              <p>₹ {e.current_price.toLocaleString()} /-</p>
              <button
                className="bg-cyan-600 text-white font-bold px-3 py-1 rounded-lg"
                onClick={() => handleClick(e)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

favorite.getInitialProps = async ({ query }) => {
  const { uid } = query;

  return { uid };
};
