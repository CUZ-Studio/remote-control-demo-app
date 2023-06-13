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

import { firestore } from "./clientApp";

const playersCollection = collection(firestore, "players");

interface Props {
  playerId: string;
  displayName: string;
  userId: string;
}

const createPlayer = async ({ playerId, displayName, userId }: Props) => {
  const _player = doc(firestore, `players/${playerId}`);
  const playerData = {
    displayName,
    status: {
      moveForward: 0,
    },
    userId,
  };

  try {
    await setDoc(_player, playerData);
  } catch (e) {
    console.error(e);
  }
};

const getPlayer = async (username: string) => {
  const playersQuery = query(playersCollection, where("userId", "==", username));
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
    displayName: string;
    status: {
      moveForward: number;
    };
    userId: string;
  };
}) => {
  const _player = doc(firestore, `players/${documentId}`);

  try {
    await updateDoc(_player, {
      displayName: updated.displayName,
      "status.moveForward": updated.status.moveForward,
      userId: updated.userId,
    });
  } catch (error) {
    console.error(error);
  }
};

const deletePlayer = async (documentId: string) => {
  const _player = doc(firestore, `players/${documentId}`);
  await deleteDoc(_player);
};

export { createPlayer, deletePlayer, getPlayer, updatePlayer };
