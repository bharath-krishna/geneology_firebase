import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
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
    height: 140,
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
  editId: string;
  setEditId: (editId: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  searchName: string;
  setSearchName: (name: string) => void;
}> = ({
  person,
  setPerson,
  people,
  setPeople,
  editId,
  setEditId,
  open,
  setOpen,
  searchName,
  setSearchName,
}) => {
  const classes = useStyles();
  // const { user } = useContext(AuthContext);
  // const [searchName, setSearchName] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<PersonModel[]>([]);

  useEffect(() => {
    fetchPeopleData(setPeople);
    fetchPeopleData(setFilteredPeople);
  }, []);

  useEffect(() => {
    if (searchName) {
      setFilteredPeople(
        people.filter((elem: PersonModel) =>
          elem.Name.toLowerCase().includes(searchName.toLowerCase())
        )
      );
    } else {
      setFilteredPeople(people);
    }
  }, [searchName, person, editId]);

  const handleAddPerson = () => {
    console.log("dfsdfsd");
  };

  return (
    <Container className={classes.container}>
      <Grid container alignContent="center">
        <Grid item sm={12} md={6}>
          <Typography variant="h5">Search People</Typography>
          <TextField
            variant="outlined"
            label="Enter Name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <List>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((elem, index) => {
                return (
                  <PersonItem
                    item={elem}
                    key={index}
                    setPerson={setPerson}
                    people={people}
                    setEditId={setEditId}
                    editId={editId}
                    setSearchName={setSearchName}
                  />
                );
              })
            ) : (
              <div>No matches</div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const PersonItem: React.FC<{
  item: PersonModel;
  setPerson: (item) => void;
  people: PersonModel[];
  setEditId: (editId: string) => void;
  editId: string;
  setSearchName;
}> = ({ item, setPerson, people, setEditId, editId, setSearchName }) => {
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
    setEditId(item.id);
  };

  return (
    <ListItem>
      <Card className={classes.card}>
        <CardMedia image="./purple_landscape.jpeg" className={classes.media} />
        {editId === item.id ? (
          <PersonForm />
        ) : (
          <CardContent className={classes.content}>
            <Grid container>
              <Grid>
                <Typography variant="h6">{item.Name}</Typography>
              </Grid>
              <Grid>
                <Button onClick={handleEdit}>Edit</Button>
              </Grid>
            </Grid>
            <Typography>Partners</Typography>
            {item.Partners.length > 0 ? (
              item.Partners.map((id) => {
                if (getPersonById(id)) {
                  const idPerson = getPersonById(id)[0];
                  return (
                    <Chip
                      key={id}
                      label={idPerson.Name}
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSearchName(idPerson.Name);
                      }}
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
                  const idPerson = getPersonById(id)[0];
                  return (
                    <Chip
                      key={id}
                      label={idPerson.Name}
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSearchName(idPerson.Name);
                      }}
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
        )}
      </Card>
    </ListItem>
  );
};
