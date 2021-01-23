import firebase from "../firebase";

export const fetchCollection = async (collectionName, setter) => {
  const data = await firebase.firestore().collection(collectionName).get();
  setter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};
