import { connect } from "react-redux";
import {
  Avatar,
  Button,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PersonModel } from "../models/person";
import { setPeople, setPerson } from "../redux/actions/people";
import { db } from "../firebase";
import { GENDERS } from "../redux/constants";
import { Container } from "next/app";

const useStyles = makeStyles((theme) => ({}));

const PersonForm: React.FC<{
  people: PersonModel[];
  person: PersonModel;
  fetchPeopleData: (setter) => void;
  setPeople: (people: PersonModel[]) => void;
  setPerson: (person: PersonModel) => void;
}> = ({ people, person, setPerson, fetchPeopleData, setPeople }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const [id, setId] = useState<string>(person.id);
  const [name, setName] = useState<string>(person.Name);
  const [partners, setPartners] = useState<string[]>([]);
  const [children, setChildren] = useState<string[]>([]);
  const [defaultPartners, setDefaultPartners] = useState<PersonModel[]>([]);
  const [defaultChildren, setDefaultChildren] = useState<PersonModel[]>([]);
  const [gender, setGender] = useState<string>(person.Gender);

  const getById = async (id) => {
    const data = await db.collection("people").doc(id).get();
    return data.data();
  };

  useEffect(() => {
    setName(person.Name);

    setDefaultPartners([]);
    person.Partners.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setDefaultPartners((prevState: PersonModel[]) => {
          return [...prevState, result];
        });
      });
    });

    setDefaultChildren([]);
    person.Children.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setDefaultChildren((prevState: PersonModel[]) => {
          return [...prevState, result];
        });
      });
    });

    setGender(person.Gender);
    setId(person.id);
  }, [person]);

  const handleOnSubmit = (data) => {
    data.Partners = defaultPartners.map((person) => person.id);
    data.Children = defaultChildren.map((person) => person.id);
    data.Gender = gender;
    data.id = id;
    console.log("OnSubit", data);
    addEditPerson(data);
  };

  const addEditPerson = async (person: PersonModel) => {
    if (person.id !== "") {
      const doc = await db.collection("people").doc(person.id).set(person);
    } else {
      const doc = await db.collection("people").add(person);
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
    <form onSubmit={handleSubmit(handleOnSubmit)}>
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
        value={defaultPartners}
        onChange={(e: React.ChangeEvent, values: PersonModel[]) => {
          setDefaultPartners(values);
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
        value={defaultChildren}
        onChange={(e: React.ChangeEvent, values: PersonModel[]) => {
          setDefaultChildren(values);
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
        Submit
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
        }}
      >
        Clear
      </Button>
    </form>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
