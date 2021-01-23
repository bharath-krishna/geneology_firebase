import { Button, Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import firebase from "../firebase";
import { setUser } from "../redux/actions/user";
import { connect } from "react-redux";

function Login({ user }) {
  const router = useRouter();
  useEffect(() => {
    user && router.push("/");
  }, [user]);

  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    !user &&
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          console.log(credential);

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.toJSON();
          console.log(token);
          // The signed-in user info.
          setUser(result.user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
  };
  return (
    <Container>
      <Button onClick={login}>Login</Button>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
