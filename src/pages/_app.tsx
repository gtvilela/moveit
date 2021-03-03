  
import { LoginProvider } from '../contexts/LoginContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </ThemeProvider>
  );
}

export default MyApp