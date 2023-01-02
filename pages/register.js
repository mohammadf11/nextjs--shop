import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { valid } from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from 'next/router';

function Register() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router = useRouter()
  const [userData, serUserData] = React.useState(initialState);
  const { name, email, password, confirmPassword } = userData;
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    serUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/register", userData);
    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });

  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);
  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>
      <form className="my-5 mx-auto"
        style={{ maxWidth: "800px" }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="InputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="InputName"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Input" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="InputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="InputPassword2" className="form-label">
            Password Confirm
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword2"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>
        <span className="my-5">
          Already have an account?
          <Link legacyBehavior href="/signin">
            <a style={{ color: "crimson" }}>Login Now</a>
          </Link>
        </span>
      </form>

    </div>
  );
}

export default Register;
