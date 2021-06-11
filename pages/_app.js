import '../styles/globals.css';
import "../styles/layout.scss";
import "../styles/addTask.scss";
import "../styles/login.scss";
import 'antd/dist/antd.css';
import AuthProvider from "./hocs/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component { ...pageProps } />
    </AuthProvider>
  );
}

export default MyApp
