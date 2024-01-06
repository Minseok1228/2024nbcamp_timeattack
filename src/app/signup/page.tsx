"use client";
import { UserData, signUpUser } from "@/api/auth";
import Spacer from "@/ui/Spacer";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [checkNickname, setCheckNickname] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [canUseEmail, setCanUseEmail] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const eamilRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (email) setIsValidEmail(eamilRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (error === "이미 존재하는 유저 id입니다.") setCanUseEmail(false);
    if (error === "이미 존재하는 유저 id입니다." && !canUseEmail) {
      setError("");
      setCanUseEmail(true);
    }
  }, [email, error]);
  useEffect(() => {
    if (nickname) {
      if (nickname.length < 2) setCheckNickname(false);
      if (nickname.length >= 2) setCheckNickname(true);
    }
    if (!nickname) setCheckNickname(true);
  }, [nickname]);
  useEffect(() => {
    if (password) {
      if (password.length < 4) setPasswordLength(false);
      if (password.length >= 4) setPasswordLength(true);
    }
    if (!password) setPasswordLength(true);
  }, [password]);
  useEffect(() => {
    if (password && checkPassword) {
      if (password === checkPassword) setIsSamePassword(true);
      if (password !== checkPassword) setIsSamePassword(false);
    }
  }, [checkPassword, password]);
  const onHandleSubmit = async () => {
    const newUser: UserData = {
      id: email,
      nickname,
      password,
    };
    try {
      const res = await signUpUser(newUser);
      console.log(res);
      router.push("/login");
    } catch (error) {
      if (error) setError(error.response.data.message);
    }
  };
  const onHandleClickToggle = () => {
    router.push("/login");
  };
  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col items-center">
        <Card>
          <CardHeader>
            <p className="text-xl w-full text-center">회원가입</p>
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
                isInvalid={!isValidEmail || !canUseEmail}
                color={!isValidEmail ? "danger" : "success"}
                errorMessage={
                  (!isValidEmail && "올바른 이메일을 작성해 주세요.") ||
                  (!canUseEmail && "다른 존재하는 email 입니다.")
                }
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                isRequired
                name="nickname"
                type="text"
                label="nickname"
                value={nickname}
                variant="bordered"
                isInvalid={!checkNickname}
                color={!checkNickname ? "danger" : "success"}
                errorMessage={
                  !checkNickname && "닉네임은 2글자 이상 입력해 주세요."
                }
                onChange={(e) => setNickname(e.target.value)}
              />
              <Input
                isRequired
                name="password"
                type="password"
                label="password"
                value={password}
                variant="bordered"
                isInvalid={!passwordLength}
                color={!passwordLength ? "danger" : "success"}
                errorMessage={
                  !passwordLength && "비밀번호는 4글자 이상 입력해 주세요."
                }
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                isRequired
                name="checkPassword"
                type="password"
                label="checkPassword"
                value={checkPassword}
                variant="bordered"
                isInvalid={!isSamePassword}
                color={!isSamePassword ? "danger" : "success"}
                errorMessage={
                  !isSamePassword && "비밀번호가 일치하지 않습니다."
                }
                onChange={(e) => setCheckPassword(e.target.value)}
              />

              <Button
                type="submit"
                onClick={onHandleSubmit}
                className="h-[50px]"
                color="primary"
                variant="ghost"
                disabled={
                  !nickname ||
                  !email ||
                  !password! ||
                  !checkPassword ||
                  !isValidEmail ||
                  !checkNickname ||
                  !passwordLength ||
                  !isSamePassword
                }
              >
                회원가입
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
