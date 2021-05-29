import '../styles/globals.css';
import "../styles/layout.scss";
import "../styles/addTask.scss";

function MyApp({ Component, pageProps }) {
  return <div><Component {...pageProps} /></div>
}

export default MyApp
