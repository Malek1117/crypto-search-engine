import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialUser = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = React.useState(initialUser);
  const [page, setPage] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        router.push({
          pathname: "/home",
          query: { uid: currentUser.uid },
        });
      }
    });
  }, []);

  const handlePage = () => {
    setPage((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (page && email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          alert("User is successfully logged");
          router.push({
            pathname: "/home",
            query: { uid: res.user.uid },
          });
        })
        .catch((err) => {
          setUser({ email: "", password: "" });
          alert(err.message);
        });
    } else if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          alert("User is successfully signup");
          router.push({
            pathname: "/home",
            query: { uid: res.user.uid },
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Email and Password both required");
    }
  };

  return (
    <>
      <Head>
        <title>{page ? "Login Page" : "Sign Up Page"}</title>
      </Head>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-opacity-30 bg-white h-1/2 w-1/4 rounded-lg">
          <h1 className="text-center mt-8 text-white font-bold text-3xl">
            {page ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block mx-auto mt-8 pl-4 py-2 text-xl w-4/5 rounded-lg outline-none"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              className="block mx-auto mt-8 pl-4 py-2 text-xl w-4/5 rounded-lg outline-none"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="submit"
              className="block mx-auto mt-8 w-3/5 bg-cyan-600 cursor-pointer text-white py-1 font-bold rounded-lg text-xl active:bg-cyan-500"
              value={page ? "Login" : "Sign Up"}
            />
          </form>
          <p className="text-center mt-5">
            <span>{page ? "New here? " : "Already signed up. "} </span>
            <span className="cursor-pointer font-semibold" onClick={handlePage}>
              {page ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
