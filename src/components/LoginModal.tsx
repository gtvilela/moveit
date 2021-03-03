  
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import styles from '../styles/components/LoginModal.module.css';

export function LoginModal() {
  const { closeLoginModal } = useContext(LoginContext);

  return (
    <div className={styles.levelUpModalOverlay}>
      <div className={styles.levelUpModalContainer}>
        <header>move.it</header>  

        <strong>Alerta</strong>
        <p>Username não encontrado no github.</p>

        <button type="button" onClick={closeLoginModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  );
}