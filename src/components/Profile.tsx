import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { ThemeContext } from '../contexts/ThemeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level, usernameGithub, avatarUrl, logout } = useContext(ChallengesContext);
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  return (
    <div className={styles.profileContainer}>
      <img src={avatarUrl} alt="Icaro Lettierri" />
      <div>

        <div>
          <strong>{usernameGithub}</strong>
          <button onClick={logout}>Sair</button>
        </div>

        <div>
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {level}
          </p>
          <button onClick={toggleTheme}>
            Enable { (currentTheme === 'theme-dark') ? 'Light' : 'Dark' } Mode
          </button>
        </div>

      </div>
    </div>
  );
}