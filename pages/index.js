import React from "react";
import Head from "next/head";
import Layout from "./hocs/Layout";
import AddTask from "./components/AddTask";

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lato-font-face@1.1.0/css/lato.min.css" />
      </Head>
      <AddTask />
    </Layout>
  )
}
