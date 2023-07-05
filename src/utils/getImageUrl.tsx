import { getDownloadURL, listAll, ref } from "firebase/storage";

import { storage } from "@/services/firebase/clientApp";

const fetchImagesInFirebaseStorage = async () => {
  const storageRef = ref(storage);
  const result = await listAll(storageRef);

  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  return Promise.all(urlPromises);
};

export default fetchImagesInFirebaseStorage;
