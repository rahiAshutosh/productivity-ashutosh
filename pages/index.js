import React from "react";
import Head from "next/head";
import Layout from "./hocs/Layout";
import TaskManagement from "./components/TaskManagement";

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" integrity="undefined" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lato-font-face@1.1.0/css/lato.min.css" />
      </Head>
      <div className="container">
        <TaskManagement />
      </div>
    </Layout>
  )
}
