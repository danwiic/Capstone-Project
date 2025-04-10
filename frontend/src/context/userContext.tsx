import React, { createContext, useContext, useState } from "react";

type SingleUser = {
  id: string;
  username: string;
  password: string;
};

type UserContextType = {
  user: SingleUser[];
  setUser: React.Dispatch<React.SetStateAction<SingleUser[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SingleUser[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
