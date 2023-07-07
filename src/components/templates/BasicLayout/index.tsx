import { ReactNode, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import Header from "@/components/organisms/Header";
import useUser from "@/hooks/useUser";

import { Root } from "./styles";

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const [windowHeight, setWindowHeight] = useState<number>();
  const user = useUser();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <>
      {user && <Header />}
      <Root windowHeight={windowHeight}>{children}</Root>
    </>
  );
}
