import { Temple } from "../../models/temple";
import { SET_TEMPLES } from "../constants";

export const templeReducer = (state: Temple[] = [], action) => {
  switch (action.type) {
    case SET_TEMPLES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
