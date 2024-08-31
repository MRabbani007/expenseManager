import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface Auth {
  user: string;
  token: string;
}

interface InitialState {
  auth?: Auth | null;
  setAuth?: Dispatch<SetStateAction<Auth | null>>;
}

const initialState: InitialState = {
  auth: null,
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
