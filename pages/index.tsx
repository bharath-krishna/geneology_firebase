import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setPeople, setPerson } from "../redux/actions/people";
import { db } from "../firebase";
import { PersonModel } from "../models/person";
import PersonForm from "./_personForm";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px",
  },
  formGrid: {
    minWidth: 350,
  },
  card: {
    minWidth: 550,
    minHeight: 150,
    display: "flex",
  },
  media: {
    height: 150,
    width: 100,
  },
  content: {
    flex: "1 0 auto",
  },
}));

export const fetchPeopleData = async (setter) => {
  const data = await db.collection("people").get();
  setter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

const Index: React.FC<{
  person: PersonModel;
  people: PersonModel[];
  setPerson: () => void;
  setPeople: ({}) => void;
}> = ({ person, setPerson, people, setPeople }) => {
  const classes = useStyles();
  // const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

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
                <PersonItem
                  item={elem}
                  key={index}
                  setPerson={setPerson}
                  people={people}
                />
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
  people: PersonModel[];
}> = ({ item, setPerson, people }) => {
  const classes = useStyles();

  const getPersonById = (id) => {
    const idPerson = people.filter((person: PersonModel) => {
      if (person.id === id) {
        return person;
      }
    });
    return idPerson;
  };

  const handleEdit = () => {
    setPerson(item);
  };
  const getById = async (id) => {
    const data = await db.collection("people").doc(id).get();
    return await data.data();
  };

  return (
    <ListItem button onClick={handleEdit}>
      <Card className={classes.card}>
        <CardMedia image="./purple_landscape.jpeg" className={classes.media} />
        <CardContent className={classes.content}>
          <Typography variant="h6">{item.Name}</Typography>
          <Typography>Partners</Typography>
          {item.Partners.length > 0 ? (
            item.Partners.map((id) => {
              if (getPersonById(id)) {
                return (
                  <Chip
                    label={getPersonById(id)[0].Name}
                    size="small"
                    color="primary"
                  />
                );
              }
            })
          ) : (
            <Typography variant="body2" color="secondary">
              Unknown
            </Typography>
          )}
          <Typography>Children</Typography>
          {item.Children.length > 0 ? (
            item.Children.map((id) => {
              if (getPersonById(id)) {
                return (
                  <Chip
                    label={getPersonById(id)[0].Name}
                    size="small"
                    color="primary"
                  />
                );
              }
            })
          ) : (
            <Typography variant="body2" color="secondary">
              None
            </Typography>
          )}
        </CardContent>
        {/* <CardContent>
          <PersonForm />
        </CardContent> */}
      </Card>
    </ListItem>
  );
};
