import React, { createContext, useContext, useState } from "react";

// Define the type of the context value
type UserContextType = {
  userID: string | null;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
};

// Define user data structure
type UserData = {
  userID: string | null;
  isLoggedIn: boolean;
};

// Create the context with a default empty value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context provider component
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData>({
    userID: null,
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ userID: user.userID, isLoggedIn: user.isLoggedIn, setUser }}>
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
  
