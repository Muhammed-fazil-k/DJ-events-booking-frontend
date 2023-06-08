import Layout from "@/components/Layout";
import { useContext, useState } from "react";
import styles from "@/styles/AuthForm.module.css";
import { FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
    const {login,error} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          {" "}
          <FaUser />
          Login
        </h1>
        <ToastContainer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email"> Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input type="submit" className="btn" value="Login" />
        </form>
        <p>
          Dont have an account?{" "}
          <Link href="/account/register">Register here</Link>
        </p>
      </div>
    </Layout>
  );
}
