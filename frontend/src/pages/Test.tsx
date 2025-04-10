import axios from "axios";
import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import Button from "../components/ui/button/Button";
import React from "react";

export default function Test() {
  const { user, setUser } = useUserContext();

  const getUser = async () => {
    const res = await axios.get("http://localhost:3000/user/");
    setUser(res.data);
  };

  useEffect(() => {
    getUser(); // ✅ only run once on mount
  }, []);

  let deleteTrack: number = 0
  const deleteUser = async (username: string) => {
    
    const res = await axios.delete(`http://localhost:3000/user/delete?username=${username}`);
    
    if (res.status === 200) {
      deleteTrack += 1
      const updatedUsers = user.filter((us) => us.username !== username);
      setUser(updatedUsers);
    }
  };

  useEffect(() => {
    deleteUser("testuser"); // ✅ only run once on mount
  }, [deleteTrack]);

  return (
    <div className="p-10">
      {user.map((us: any, i: number) => (
        <div className="w-[50%]" key={i}>
          <div>user {i + 1}</div>
          <div>
            <span className="font-bold">USERID: </span> {us.id}
          </div>
          <div>
            <span className="font-bold">USERNAME: </span> {us.username}
          </div>
          <div>
            <span className="font-bold">USERPASSWORD: </span> {us.password}
          </div>
          <Button onClick={() => deleteUser(us.username)}>
            DELETE {us.username}
          </Button>
        </div>
      ))}
    </div>
  );
}

React.memo(Test);