import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PersonModel } from "../models/person";
import PersonForm from "./PersonForm";

const useStyles = makeStyles((theme) => ({
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

const PersonItem: React.FC<{
  item: PersonModel;
  setPerson: (item) => void;
  people: PersonModel[];
  setEditId: (editId: string) => void;
  editId: string;
  setSearchName;
}> = ({
  item,
  setPerson,
  people,
  setEditId,
  editId,
  setSearchName,
}): JSX.Element => {
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

export default PersonItem;
