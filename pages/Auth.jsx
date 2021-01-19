import { CircularProgress, Container } from "@material-ui/core";
import React, { createContext, useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/user";
import app from "../firebase";

export const AuthContext = createContext();

// const provider = new firebase.auth.GoogleAuthProvider();

function AuthProvider({ children, user, setUser }) {
  useEffect(() => {
    app
      .auth()
      .signInWithEmailAndPassword("test@test.com", "password")
      .then((user) => setUser(user))
      .catch((error) => console.log(error));
  }, []);
  return (
    <React.Fragment>
      {user ? (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
      ) : (
        <Container
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
