import Head from 'next/head';
import { GithubLogin } from '../components/GithubLogin';

import styles from '../styles/pages/Login.module.css';

export default function Login() {

  return (
    
    <div className={styles.container}>
      <Head>
        <title>Login | move.it</title>
      </Head>
      <section>
        <div className={styles.background}>
          <img src="/background-login.svg" alt=""/>
        </div>
        <div>
          <GithubLogin />
        </div>
      </section>
    </div>
  );
}

