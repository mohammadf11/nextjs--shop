import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { valid } from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

function signin() {
  const initialState = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const [userData, serUserData] = React.useState(initialState);
  const { email, password } = userData;
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    serUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    Cookie.set("refresh_token", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);

    return dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    });
  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0)  router.push("/");
  }, [auth]);
  return (
    <div>
      <Head>
        <title>sign in Page</title>
      </Head>
      <form
        className="my-5 mx-auto"
        style={{ maxWidth: "800px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
        <span className="my-5">
          you don't have an account{" "}
          <Link legacyBehavior href="/register">
            <a style={{ color: "crimson" }}>Register</a>
          </Link>
        </span>
      </form>
    </div>
  );
}

export default signin;
