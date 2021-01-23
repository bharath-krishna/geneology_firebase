import { Button, CircularProgress, Container } from "@material-ui/core";
import React, { createContext, useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/user";
import firebase from "../firebase";
import { useRouter } from "next/router";

export const AuthContext = createContext();

function AuthProvider({ children, user, setUser }) {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // useEffect(() => {
  //   user && router.push("/");
  // }, [user]);

  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    !user &&
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then((result) => {
          var credential = result.credential;
          var token = credential.toJSON();
          setUser(result.user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
  };

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
          {/* <CircularProgress /> */}
          <Container>
            <Button onClick={login}>Login</Button>
          </Container>
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
