import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/index.js";
import { TOKEN_KEY } from "../api/client.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const finish = (res) => {
    localStorage.setItem(TOKEN_KEY, res.access_token);
    setUser(res.user);
  };

  const login = async (form) => finish(await api.login(form));
  const signup = async (form) => finish(await api.signup(form));
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
