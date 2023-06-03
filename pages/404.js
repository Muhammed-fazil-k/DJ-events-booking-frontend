import React from "react";
import Layout from "@/components/Layout";
import styles from "../styles/404.module.css";
import Link from "next/link";
import {FaExclamationTriangle} from 'react-icons/fa'
//For unmatched routing next js will automatically redirect towards 404.js
export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1> <FaExclamationTriangle/> 404</h1>
        <h4>Sorry there is nothing here</h4>
        <Link href='/'>Go back to Home</Link>
      </div>
    </Layout>
  );
}
