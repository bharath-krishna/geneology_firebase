import { connect } from "react-redux";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PersonModel } from "../models/person";
import { setPeople, setPerson } from "../redux/actions/people";
import { db } from "../firebase";
import { GENDERS } from "../redux/constants";

const PersonForm: React.FC<{ people: PersonModel[]; person: PersonModel }> = ({
  people,
  person,
}) => {
  const { register, handleSubmit } = useForm();

  const [name, setName] = useState<string>(person.Name);
  const [partners, setPartners] = useState<string[]>([]);
  const [children, setChildren] = useState<string[]>([]);
  const [defaultPartners, setDefaultPartners] = useState<PersonModel[]>([]);
  const [defaultChildren, setDefaultChildren] = useState<PersonModel[]>([]);
  const [gender, setGender] = useState<string>(person.Gender);

  const getById = async (id) => {
    const data = await db.collection("people").doc(id).get();
    return await data.data();
  };

  useEffect(() => {
    setName(person.Name);

    setDefaultPartners([]);
    person.Partners.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setDefaultPartners([result]);
      });
    });

    setDefaultChildren([]);
    person.Children.map((id) => {
      const data = getById(id).then((result: PersonModel) => {
        result.id = id;
        setDefaultChildren([result]);
      });
    });

    setGender(person.Gender);
  }, [person]);

  const handleOnSubmit = (data) => {
    data.Partners = defaultPartners;
    console.log("OnSubit", data);
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
        multiple
        filterSelectedOptions
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
        multiple
        filterSelectedOptions
      />

      <TextField
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
