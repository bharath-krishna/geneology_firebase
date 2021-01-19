import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import PersonForm from "./_personForm";
import { setPeople, setPerson } from "../redux/actions/people";
import { PersonModel } from "../models/Person";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const handleChange = (e) => {
  console.log(e.target.value);
};

function PersonModal({ open, setOpen }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="add-person_dialog"
    >
      <DialogTitle id="add-person_dialog">Add Person</DialogTitle>
      <DialogContent>
        <PersonForm />
      </DialogContent>
    </Dialog>
  );
}

function mapStateToProps(state) {
  return {
    people: state.people,
    person: state.person,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPeople: (people: PersonModel[]) => dispatch(setPeople(people)),
    setPerson: (person: PersonModel) => dispatch(setPerson(person)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonModal);
