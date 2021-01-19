import React, { useContext, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "./Auth";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setPeople, setPerson } from "../redux/actions/people";
import { db } from "../firebase";
import { PersonModel } from "../models/Person";
import PersonModal from "./_personModal";
import { useForm } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import PersonForm from "./_personForm";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px",
  },
  formGrid: {
    minWidth: 350,
  },
}));

const Index: React.FC<{
  person: PersonModel;
  people: PersonModel[];
  setPerson: () => void;
  setPeople: ({}) => void;
}> = ({ person, setPerson, people, setPeople }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const fetchPeopleData = async (setter) => {
    const data = await db.collection("people").get();
    setter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchPeopleData(setPeople);
  }, []);

  const handleAddPerson = () => {
    console.log("dfsdfsd");
  };

  return (
    <Container className={classes.container}>
      <Grid container alignContent="center">
        <Grid item sm={12} md={6}>
          <List>
            {people.map((elem, index) => {
              return (
                <PersonItem item={elem} key={index} setPerson={setPerson} />
              );
            })}
          </List>
        </Grid>
        <Grid item sm={12} md={6} className={classes.formGrid}>
          <PersonForm />
        </Grid>
      </Grid>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const PersonItem: React.FC<{
  item: PersonModel;
  setPerson: (item) => void;
}> = ({ item, setPerson }) => {
  const handleEdit = () => {
    setPerson(item);
  };
  const getById = async (id) => {
    const data = await db.collection("people").doc(id).get();
    return await data.data();
  };

  return (
    <ListItem button onClick={handleEdit}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={item.Name}
        secondary={
          <React.Fragment>
            <Typography variant="body2" component="span">
              {item.Gender}, has children{" "}
              {item.Children.map((id) => {
                return id;
              })}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        {/* <Button onClick={handleEdit}>Edit</Button> */}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
