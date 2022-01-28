import React from 'react';
import Navbar from "../components/Navbar";
import { db } from "../config/firebase";
import {ref, get, child} from "firebase/database";
import Coin from "../components/Coin";

export default function favorite (){
    const [fav, setFav] = React.useState([]);
    const userUUID = JSON.parse(localStorage.getItem("user"));

    React.useEffect(()=>{
        const dbref = ref(db);

        get(child(dbref, userUUID))
        .then((data)=>{
            let temp = [];
            let obj = data.val();
            for(let key in obj){
                temp.push(obj[key]);
            }
            setFav(temp);
        });
    },[fav]);

    return (
        <>
            <Navbar active={"fav"} />
            <div className="w-2/3 mx-auto">
                {fav.map((e)=><Coin key={e.id} data={e} />)}
            </div>
        </>
    )
}