import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link";
import { AuthContext } from "./Auth";

export default function Index() {
  const { user } = useContext(AuthContext);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Firebase Next.js biolerplate.
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom>
          This includes user authentication by firebase material ui (core, icons
          and lab), protected routes, material and next integration etc.
        </Typography>

        <br></br>
      </Box>
    </Container>
  );
}
