"use client";

import { AppStore, makeStore } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { useRef } from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};
export default function LayoutProvider({ children }: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <>
      <Provider store={storeRef.current}>
        <NextUIProvider>{children}</NextUIProvider>;
      </Provider>
    </>
  );
}
