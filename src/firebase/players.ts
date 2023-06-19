import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { RobotColor, RobotModelType } from "@/types";

import { firestore } from "./clientApp";

const playersCollection = collection(firestore, "players");

interface Props {
  uid: string;
  headTag: string;
  modelColor: RobotColor;
  modelType: RobotModelType;
  username: string;
  score: number;
  playedNum: number;
}

const createPlayer = async ({
  uid,
  headTag,
  modelColor,
  modelType,
  username,
  score,
  playedNum,
}: Props) => {
  const _player = doc(firestore, `players/${uid}`);
  const playerData = {
    uid,
    headTag,
    modelColor,
    modelType,
    username,
    score,
    playedNum,
  };

  try {
    await setDoc(_player, playerData);
  } catch (e) {
    console.error(e);
  }
};

const getPlayer = async (uid: string) => {
  const playersQuery = query(playersCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(playersQuery);

  const res: DocumentData[] = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return res;
};

const updatePlayer = async ({
  documentId,
  updated,
}: {
  documentId: string;
  updated: {
    score?: number;
    playedNum?: number;
  };
}) => {
  const _player = doc(firestore, `players/${documentId}`);

  try {
    const res = await updateDoc(_player, updated);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const deletePlayer = async (documentId: string) => {
  const _player = doc(firestore, `players/${documentId}`);
  await deleteDoc(_player);
};

export { createPlayer, deletePlayer, getPlayer, updatePlayer };
