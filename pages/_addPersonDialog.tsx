import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  setEditId,
  setOpen,
  setPeople,
  setPerson,
  setSearchName,
} from "../redux/actions/people";
import { PersonModel } from "../models/person";
import PersonForm from "./_personForm";

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

function AddPersonDialog({ open, setOpen }) {
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
    editId: state.editId,
    open: state.open,
    searchName: state.searchName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPeople: (people: PersonModel[]) => dispatch(setPeople(people)),
    setPerson: (person: PersonModel) => dispatch(setPerson(person)),
    setEditId: (editId: string) => dispatch(setEditId(editId)),
    setOpen: (open: boolean) => dispatch(setOpen(open)),
    setSearchName: (name: string) => dispatch(setSearchName(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonDialog);
