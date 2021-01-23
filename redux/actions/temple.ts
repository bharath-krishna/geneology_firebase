import { SET_TEMPLES } from "../constants";

export const setTemples = (temples) => {
  return {
    type: SET_TEMPLES,
    payload: temples,
  };
};
