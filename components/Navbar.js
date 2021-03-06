import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Navbar({ active }) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        router.push("/");
      } else {
        router.push({ query: { uid: user.uid } });
      }
    });
  }, []);

  return (
    <div className="flex justify-between">
      <ul className="px-10 py-3 flex space-x-4 text-white font-bold cursor-pointer text-lg">
        <li
          className={
            active === "home" ? "bg-cyan-600 rounded-lg px-4 py-1" : "px-4 py-1"
          }
        >
          <Link href={{ pathname: "/home", query: { uid: router.query.uid } }}>
            Home
          </Link>
        </li>
        <li
          className={
            active === "fav" ? "bg-cyan-600 rounded-lg px-4 py-1" : "px-4 py-1"
          }
        >
          <Link
            href={{ pathname: "/favorite", query: { uid: router.query.uid } }}
          >
            Fav Crpto
          </Link>
        </li>
      </ul>
      <div className="mx-10 mt-3">
        <button
          className="bg-cyan-600 rounded-lg px-4 py-1 text-white font-bold cursor-pointer text-lg"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
