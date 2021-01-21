import { PersonModel } from "../../models/person";
import { RELOAD_PEOPLE, SET_PEOPLE, SET_PERSON } from "../constants";

export const setPeople = (personObject) => {
  return {
    type: SET_PEOPLE,
    payload: personObject,
  };
};

export const setPerson = (person) => {
  return {
    type: SET_PERSON,
    payload: person,
  };
};
