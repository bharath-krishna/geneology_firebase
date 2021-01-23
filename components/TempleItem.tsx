import {
  Card,
  CardContent,
  CardMedia,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Temple } from "../models/temple";

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

const templeItem: React.FC<{ temple: Temple }> = ({ temple }): JSX.Element => {
  const classes = useStyles();
  return (
    <ListItem>
      <Card className={classes.card}>
        <CardMedia image="./purple_landscape.jpeg" className={classes.media} />
        <CardContent className={classes.content}>
          <Typography>{temple.Name}</Typography>
          <Typography>{temple.Followers} Followers</Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default templeItem;
