import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "jessjelly",
    avatar_url:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/15/12/darth-vader.jpeg",
  });
  return (
   <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
   </UserContext.Provider>
  )
};
