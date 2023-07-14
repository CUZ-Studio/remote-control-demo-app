import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { isMobile } from "react-device-detect";

import { updatePlayer } from "@/firebase/players";
import useGameActions from "@/hooks/useGameActions";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import { Page, PinNumberError, PinNumberErrorMessage, PinNumberErrorType } from "@/types";
import randomIntsFromInterval from "@/utils/randomIntsFromInterval";

import {
  Container,
  Hint,
  Inner,
  Message,
  Option,
  PinNumbers,
  Wrapper,
} from "@/styles/verify.styles";

export default function Verify() {
  const router = useRouter();

  const user = useUser();
  const player = usePlayer();
  const gameRound = useGameStatus();
  const { assignPlayer } = useGameActions();

  const [timeLeft, setTimeLeft] = useState(0);
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [error, setError] = useState<PinNumberError>({
    message: undefined,
    type: undefined,
  });
  const [pinNumber, setPinNumber] = useState({
    currentPinNumber: -1,
    previousPinNumber: -1,
  });
  const [options, setOptions] = useState<number[]>([]);

  const targetRestTime = 30 * 1000 + new Date().getTime();
  const [restTimeLeft, setRestTimeLeft] = useState(targetRestTime - Date.now());

  useEffect(() => {
    if (restTimeLeft < 0) return;
    if (!error.message) return;

    const interval = setInterval(() => {
      const diff = targetRestTime - Date.now();
      if (diff > 0) {
        setRestTimeLeft(diff);
      } else {
        setRestTimeLeft(0);
        setIsNotAvailable(false);
        setError({
          message: undefined,
          type: undefined,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isNotAvailable]);

  const countDown = useMemo(() => {
    if (_.isNil(timeLeft)) return 0;
    else return timeLeft * 1000 + new Date().getTime();
  }, [timeLeft, pinNumber.currentPinNumber]);
  const [countDownLeft, setCountDownLeft] = useState(countDown - Date.now());

  useEffect(() => {
    if (countDownLeft <= 0) {
      axios
        .put(`${process.env.NEXT_PUBLIC_UNREAL_DOMAIN}/remote/object/call`, {
          objectPath: gameRound.gameModeBaseObjectPath,
          functionName: "GetPinNumber",
          generateTransaction: true,
        })
        .then((res) => {
          setPinNumber({
            currentPinNumber: res.data.CurrentPinNumber,
            previousPinNumber: res.data.PreviousPinNumber,
          });
          setTimeLeft(res.data.RemainTime);
          const threeDigitsIncludingPinNumber = randomIntsFromInterval(
            res.data.CurrentPinNumber,
          ).concat(res.data.CurrentPinNumber);
          const shuffled = threeDigitsIncludingPinNumber.sort(() => 0.5 - Math.random());
          setOptions(shuffled);
        });
    }
  }, [countDownLeft]);

  useEffect(() => {
    if (countDownLeft < 0) return;

    const interval = setInterval(() => {
      const diff = countDown - Date.now();
      if (diff < 0) {
        setCountDownLeft(0);
      } else {
        setCountDownLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setError({
      message: undefined,
      type: undefined,
    });

    const selectedNum = e.currentTarget.innerHTML;

    // 현재 게임화면에 떠있는 pinNumber를 제대로 고른 경우
    if (Number(selectedNum) === pinNumber.currentPinNumber) {
      // 데이터베이스에 인증성공한 일시 저장
      if (user) {
        const verifiedAt = Date.now();
        updatePlayer({
          documentId: user?.uid,
          updated: {
            verifiedAt,
          },
        }).then(() => {
          assignPlayer({
            ...(player as Player),
            verifiedAt,
          });
          router.push(Page.GOING_TO_HANGAR);
        });
      }
      // 이전 pinNumber를 고른 경우
    } else if (Number(selectedNum) === pinNumber.previousPinNumber) {
      setError({
        type: PinNumberErrorType.PREVIOUS_NUMBER,
        message: PinNumberErrorMessage.PREVIOUS_NUMBER,
      });
      // 아예 틀린 경우
    } else {
      // 에러 메시지 표시
      setError({
        type: PinNumberErrorType.WRONG_NUMBER,
        message: PinNumberErrorMessage.WRONG_NUMBER,
      });
      setIsNotAvailable(true);
    }
  };

  const disabled = useMemo(
    () => restTimeLeft > 0 && error.type === PinNumberErrorType.WRONG_NUMBER,
    [restTimeLeft, error],
  );
  return (
    <Container isMobile={isMobile}>
      <Inner>
        <Hint>보안 코드를 선택해주세요</Hint>
        <Wrapper>
          <PinNumbers>
            {options.map((opt) => (
              <Option
                key={`opt-${opt}`}
                isError={!!error.message}
                disabled={disabled}
                onClick={handleClick}
              >
                {opt}
              </Option>
            ))}
          </PinNumbers>
          <Message>{error.message}</Message>
        </Wrapper>
      </Inner>
    </Container>
  );
}
