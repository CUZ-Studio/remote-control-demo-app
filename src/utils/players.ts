import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

interface Status {
  moveForward: number;
}

const addPlayer = async ({
  userId,
  displayName,
  status,
}: {
  userId: string;
  displayName: string;
  status: Status;
}) => {
  try {
    await addDoc(collection(db, "player"), {
      user: userId,
      displayName,
      status,
      createdAt: new Date().getTime(),
    });
  } catch (error) {
    console.error(error);
  }
};

const updatePlayerStatus = async ({ docId, status }: { docId: string; status: Status }) => {
  try {
    const playerRef = doc(db, "player", docId);
    await updateDoc(playerRef, {
      status,
    });
  } catch (error) {
    console.error(error);
  }
};

const deletePlayer = async (docId: string) => {
  try {
    const playerRef = doc(db, "player", docId);
    await deleteDoc(playerRef);
  } catch (error) {
    console.error(error);
  }
};

export { addPlayer, deletePlayer, updatePlayerStatus };
