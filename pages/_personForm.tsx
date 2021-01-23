import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Container,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PersonModel } from "../models/person";
import {
  setEditId,
  setOpen,
  setPeople,
  setPerson,
  setSearchName,
} from "../redux/actions/people";
import firebase from "../firebase";
import { GENDERS } from "../redux/constants";
import { fetchPeopleData } from "./index";

const useStyles = makeStyles((theme) => ({}));

const PersonForm: React.FC<{
  people: PersonModel[];
  person: PersonModel;
  setPeople: (people: PersonModel[]) => void;
  setPerson: (person: PersonModel) => void;
  editId: string;
  setEditId: (editId: string) => void;
  setOpen: (open: boolean) => void;
}> = ({ people, person, setPerson, setPeople, editId, setEditId, setOpen }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const [id, setId] = useState<string>(person.id);
  const [name, setName] = useState<string>(person.Name);
  const [partners, setPartners] = useState<PersonModel[]>([]);
  const [children, setChildren] = useState<PersonModel[]>([]);
  const [gender, setGender] = useState<string>(person.Gender);

  const getById = async (id) => {
    const data = await firebase.firestore().collection("people").doc(id).get();
    return data.data();
  };

  useEffect(() => {
    setName(person.Name);

    setPartners([]);
    person.Partners.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setPartners((prevState: PersonModel[]) => {
          return [...prevState, result];
        });
      });
    });

    setChildren([]);
    person.Children.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setChildren((prevState: PersonModel[]) => {
          return [...prevState, result];
        });
      });
    });

    setGender(person.Gender);
    setId(person.id);
  }, [person]);

  const handleOnSubmit = (data) => {
    data.Partners = partners.map((person) => person.id);
    data.Children = children.map((person) => person.id);
    data.Gender = gender;
    data.id = id;
    addEditPerson(data);
    setPerson({
      id: "",
      Name: "",
      Partners: [],
      Children: [],
      Gender: "",
    });

    setEditId("");
    setOpen(false);
  };

  const addEditPerson = async (person: PersonModel) => {
    if (person.id !== "") {
      const doc = await firebase
        .firestore()
        .collection("people")
        .doc(person.id)
        .set(person);
    } else {
      const doc = await firebase.firestore().collection("people").add(person);
    }
    setPerson({
      id: "",
      Name: "",
      Partners: [],
      Children: [],
      Gender: "",
    });

    fetchPeopleData(setPeople);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {editId === person.id && (
          <React.Fragment>
            <TextField
              inputRef={register}
              name="Name"
              label="Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              fullWidth
            />

            <Autocomplete
              ref={register}
              options={people}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Partners"
                  name="Partners"
                  inputRef={register}
                />
              )}
              value={partners}
              onChange={(e: React.ChangeEvent, values: PersonModel[]) => {
                setPartners(values);
              }}
              getOptionLabel={(option) => {
                return option.Name;
              }}
              getOptionSelected={(option: PersonModel, value: PersonModel) => {
                2;
                if (!value) {
                  return false;
                }

                if (option.id == value.id) {
                  return true;
                } else {
                  return false;
                }
              }}
              ChipProps={{
                color: "primary",
                size: "small",
                icon: <Avatar sizes="small" />,
              }}
              multiple
              filterSelectedOptions
              autoHighlight
            />

            <Autocomplete
              ref={register}
              options={people}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Children"
                  name="Children"
                  inputRef={register}
                />
              )}
              value={children}
              onChange={(e: React.ChangeEvent, values: PersonModel[]) => {
                setChildren(values);
              }}
              getOptionLabel={(option) => {
                return option.Name;
              }}
              getOptionSelected={(option: PersonModel, value: PersonModel) => {
                if (!value) {
                  return false;
                }

                if (option.id == value.id) {
                  return true;
                } else {
                  return false;
                }
              }}
              ChipProps={{
                color: "primary",
                size: "small",
                icon: <Avatar />,
              }}
              multiple
              filterSelectedOptions
              autoHighlight
            />

            <TextField
              inputRef={register}
              select
              label="Gender"
              name="Gender"
              value={gender}
              onChange={(e: any) => {
                setGender(e.target.value);
              }}
              fullWidth
            >
              {GENDERS.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPerson({
                  id: "",
                  Name: "",
                  Partners: [],
                  Children: [],
                  Gender: "",
                });
                setEditId("");
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
