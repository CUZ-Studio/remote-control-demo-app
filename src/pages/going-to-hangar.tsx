import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import usePlayer from "@/hooks/usePlayer";
import { Page } from "@/types";

import { Container, LoadingMessage } from "@/styles/going-to-hangar";

export default function GoingToHangar() {
  const router = useRouter();
  const player = usePlayer();

  useEffect(() => {
    if (!player?.objectPath) return;

    try {
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: player.objectPath,
          functionName: "SetPlayerLocation",
          generateTransaction: true,
        })
        .then(() => router.push(Page.PLAY));
    } catch (error) {
      toast.error("캐릭터를 나타낼 수 없습니다");
    }
  }, []);
  return (
    <Container>
      <LoadingMessage>{`로봇 격납고로\n보내는 중`}</LoadingMessage>
    </Container>
  );
}
