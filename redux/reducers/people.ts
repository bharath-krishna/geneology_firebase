import { db } from "../../firebase";
import { PersonModel } from "../../models/person";
import { RELOAD_PEOPLE, SET_PEOPLE, SET_PERSON } from "../constants";

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
