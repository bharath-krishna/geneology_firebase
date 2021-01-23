import { Container, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import CustomAppBar from "../components/CustomAppBar";

function Profile() {
  const { register, handleSubmit } = useForm();
  const onFormSubmit = () => {};
  return (
    <React.Fragment>
      <CustomAppBar />
      <Container>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <TextField />
        </form>
      </Container>
    </React.Fragment>
  );
}

export default Profile;
