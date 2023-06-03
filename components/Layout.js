import Head from "next/head";
import React from "react";
import styles from '../styles/Layout.module.css'
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header/>
      <div className={styles.container}>{children}</div>
      <Footer/>
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find latest DJs",
  keywords: "DJ,EDM",
};
