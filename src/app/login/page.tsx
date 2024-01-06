"use client";
import { UserData, loginUser } from "@/api/auth";
import { login } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Spacer from "@/ui/Spacer";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { error } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  console.log("@@", error);
  console.log("@@", emailCheck);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const eamilRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (email) setIsValidEmail(eamilRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (error === "존재하지 않는 유저입니다.") setEmailCheck(false);
    if (error === "존재하지 않는 유저입니다." && !emailCheck) {
      setError("");
      setEmailCheck(true);
    }
  }, [email, error]);

  useEffect(() => {
    if (error === "비밀번호가 일치하지 않습니다.") setPasswordCheck(false);
    if (error === "비밀번호가 일치하지 않습니다." && !passwordCheck) {
      setError("");
      setPasswordCheck(true);
    }
    if (password) {
      if (password.length < 4) setPasswordLength(false);
      if (password.length >= 4) setPasswordLength(true);
    }
    if (!password) setPasswordLength(true);
  }, [password, error]);
  const onHandleClickToggle = () => {
    router.push("/signup");
  };

  const onHandleSubmit = async () => {
    const logInUser: Omit<UserData, "nickname"> = {
      id: email,
      password,
    };
    try {
      const res = await loginUser(logInUser);
      console.log(res.data);
      dispatch(login(res.data));
      router.push("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error) {
        return setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col items-center">
        <Card>
          <CardHeader>
            <p className="text-xl w-full text-center">로그인</p>
          </CardHeader>
          <Spacer y={30} />
          <CardBody>
            <form
              className="flex flex-col gap-[10px] w-[500px] "
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                isRequired
                value={email}
                type="email"
                label="Email"
                variant="bordered"
                isInvalid={!isValidEmail || !emailCheck}
                color={!isValidEmail ? "danger" : "success"}
                errorMessage={
                  (!isValidEmail && "올바른 이메일을 작성해 주세요.") ||
                  (!emailCheck && "존재하지 않는 유저입니다.")
                }
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                isRequired
                name="password"
                type="password"
                label="password"
                value={password}
                variant="bordered"
                isInvalid={!passwordLength || !passwordCheck || !emailCheck}
                color={!passwordLength ? "danger" : "success"}
                errorMessage={
                  (!passwordLength && "비밀번호는 4글자 이상 입력해 주세요.") ||
                  (!passwordCheck && "비밀번호가 일치하지 않습니다.")
                }
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                onClick={onHandleSubmit}
                className="h-[50px]"
                color="primary"
                variant="ghost"
                disabled={
                  !email || !password! || !isValidEmail || !passwordLength
                }
              >
                로그인
              </Button>
              <Button
                type="submit"
                className="h-[50px]"
                color="primary"
                variant="ghost"
                onClick={onHandleClickToggle}
              >
                회원가입/로그인
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
