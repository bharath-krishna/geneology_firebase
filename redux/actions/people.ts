import { PersonModel } from "../../models/person";
import {
  SET_EDIT_ID,
  SET_OPEN,
  SET_PEOPLE,
  SET_PERSON,
  SET_SEARCH_NAME,
} from "../constants";

export const setPeople = (peopleList) => {
  return {
    type: SET_PEOPLE,
    payload: peopleList,
  };
};

export const setPerson = (person) => {
  return {
    type: SET_PERSON,
    payload: person,
  };
};

export const setSearchName = (name) => {
  return {
    type: SET_SEARCH_NAME,
    payload: name,
  };
};

export const setEditId = (edit) => {
  return {
    type: SET_EDIT_ID,
    payload: edit,
  };
};

export const setOpen = (open) => {
  return {
    type: SET_OPEN,
    payload: open,
  };
};
