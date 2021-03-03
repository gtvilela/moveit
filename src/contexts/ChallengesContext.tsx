import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextValue {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  usernameGithub: string;
  avatarUrl: string;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallange: () => void;
  closeLevelUpModal: () => void;
  logout: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number; 
  currentExperience: number; 
  challengesCompleted: number;
  usernameGithub: string;
  avatarUrl: string;
}

export const ChallengesContext = createContext({} as ChallengesContextValue);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const router = useRouter();

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [usernameGithub, setUsernameGithub] = useState(rest.usernameGithub ?? null);
  const [avatarUrl, setAvatarUrl] = useState(rest.avatarUrl ?? null);
  
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();

    if(!usernameGithub || !avatarUrl){
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🤩️', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallange() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function logout() {
    Cookies.set('usernameGithub', '');
    Cookies.set('avatarUrl', '');
    setUsernameGithub('');
    setAvatarUrl('');
    
    router.push('/login');
  }

  const valueProvider: ChallengesContextValue = {
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted,
    activeChallenge,
    usernameGithub,
    avatarUrl,
    levelUp,
    startNewChallenge,
    resetChallenge,
    completeChallange,
    closeLevelUpModal,
    logout
  }

  return (
    <ChallengesContext.Provider value={valueProvider}>
      {children}
      { isLevelUpModalOpen && <LevelUpModal  /> }
    </ChallengesContext.Provider>
  );
}