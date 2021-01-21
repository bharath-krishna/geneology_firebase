import { PersonModel } from "../../models/person";
import {
  SET_EDIT_ID,
  SET_OPEN,
  SET_PEOPLE,
  SET_PERSON,
  SET_SEARCH_NAME,
} from "../constants";

let initialPeopleState = [];

export const peopleReducer = (state = initialPeopleState, action) => {
  switch (action.type) {
    case SET_PEOPLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

let initialPersonState = {
  id: "",
  Name: "",
  Children: [],
  Partners: [],
  Gender: "",
};

export const personReducer = (
  state: PersonModel = initialPersonState,
  action
) => {
  switch (action.type) {
    case SET_PERSON: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const searchNameReducer = (state: string = "", action) => {
  switch (action.type) {
    case SET_SEARCH_NAME: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const editIdReducer = (state: string = "", action) => {
  switch (action.type) {
    case SET_EDIT_ID: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const openReducer = (state: boolean = false, action) => {
  switch (action.type) {
    case SET_OPEN: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
