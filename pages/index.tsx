import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Breadcrumbs,
  Button,
  Grid,
  List,
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
import firebase from "../firebase";
import { PersonModel } from "../models/person";
import AddPersonDialog from "../components/AddPersonDialog";
import CustomAppBar from "../components/CustomAppBar";
import PersonItem from "../components/PersonItem";
import Link from "../src/Link";
import { fetchCollection } from "../utils/temple";

const useStyles = makeStyles((theme) => ({
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
  appbar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Index: React.FC<{
  person: PersonModel;
  people: PersonModel[];
  setPerson: (person: PersonModel) => void;
  setPeople: ({}) => void;
  editId: string;
  setEditId: (editId: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  searchName: string;
  setSearchName: (name: string) => void;
  user;
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
  user,
}) => {
  const classes = useStyles();
  const [filteredPeople, setFilteredPeople] = useState<PersonModel[]>([]);

  useEffect(() => {
    fetchCollection("people", setPeople);
    fetchCollection("people", setFilteredPeople);
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
    setEditId("");
    setPerson({
      id: "",
      Name: "",
      Partners: [],
      Children: [],
      Gender: "",
    });
    setOpen(true);
  };

  return (
    <React.Fragment>
      <CustomAppBar />
      <Container>
        <Breadcrumbs>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
        </Breadcrumbs>
        <Grid container alignContent="center">
          <Grid item sm={12} md={6}>
            <Typography variant="h5">Search People</Typography>
            <TextField
              size="small"
              variant="outlined"
              label="Enter Name"
              value={searchName}
              onChange={(e) => {
                setEditId("");
                setPerson({
                  id: "",
                  Name: "",
                  Partners: [],
                  Children: [],
                  Gender: "",
                });
                setSearchName(e.target.value);
              }}
            />
            <Button
              onClick={() => setSearchName("")}
              variant="contained"
              color="primary"
            >
              Clear
            </Button>
            <Button
              onClick={handleAddPerson}
              variant="contained"
              color="primary"
            >
              Add person
            </Button>
            <AddPersonDialog />
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
        </Grid>
      </Container>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    people: state.people,
    person: state.person,
    editId: state.editId,
    open: state.open,
    searchName: state.searchName,
    user: state.user,
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
