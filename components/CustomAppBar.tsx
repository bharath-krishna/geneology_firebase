import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Link from "../src/Link";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "../firebase";
import { connect } from "react-redux";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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

function CustomAppBar({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className={classes.appbar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {user.displayName}
          </Typography>
          <Button color="inherit" component={Link} href="/temples">
            Temple
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* <MenuItem onClick={handleMenuClose}> */}
        <Button color="inherit" component={Link} href="/profile">
          Profile
        </Button>
        <br></br>
        {/* </MenuItem>
        <MenuItem onClick={handleMenuClose}> */}
        <Button color="inherit" component={Link} href="/account">
          My account
        </Button>
        {/* </MenuItem> */}
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    // people: state.people,
    // person: state.person,
    // editId: state.editId,
    // open: state.open,
    // searchName: state.searchName,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // setPeople: (people: PersonModel[]) => dispatch(setPeople(people)),
    // setPerson: (person: PersonModel) => dispatch(setPerson(person)),
    // setEditId: (editId: string) => dispatch(setEditId(editId)),
    // setOpen: (open: boolean) => dispatch(setOpen(open)),
    // setSearchName: (name: string) => dispatch(setSearchName(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
