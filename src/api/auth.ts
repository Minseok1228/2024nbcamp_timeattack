import axios from "axios";
export type UserData = {
  id: string;
  nickname: string;
  password: string;
};
// NEXT_PUBLIC_AUTH
export const signUpUser = async (userData: UserData) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH}/register`,
    userData
  );
  return res;
};
export const loginUser = async (userData: Omit<UserData, "nickname">) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH}/login`,
    userData
  );
  return res;
};
