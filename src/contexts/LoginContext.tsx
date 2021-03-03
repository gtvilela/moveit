import { createContext, ReactNode, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { LoginModal } from '../components/LoginModal';
import getUsername from '../services/apiGithub';

interface LoginContextValue {
  handleOnChangeUsername: (e) => void;
  handleOnClickLoginUsername: () => void;
  closeLoginModal: () => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextValue);

export function LoginProvider({ children }: LoginProviderProps) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleOnChangeUsername(e) {
    setUsername(e.target.value);
  }

  async function handleOnClickLoginUsername() {
    const response = await getUsername(username);
    if(response){
      const { avatar_url } = response.data;

      Cookies.set('avatarUrl', avatar_url);
      Cookies.set('usernameGithub', username);

      router.push('/');
    } else {
      setIsLoginModalOpen(true);
    }
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }

  const valueProvider: LoginContextValue = {
    handleOnChangeUsername,
    handleOnClickLoginUsername,
    closeLoginModal
  }

  return (
    <LoginContext.Provider value={valueProvider}>
      {children}
      { isLoginModalOpen && <LoginModal /> }
    </LoginContext.Provider>
  )
}