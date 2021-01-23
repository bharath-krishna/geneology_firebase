import { Breadcrumbs, Container, List } from "@material-ui/core";
import React, { useEffect } from "react";
import { fetchCollection } from "../../utils/temple";
import { connect } from "react-redux";
import { Temple } from "../../models/temple";
import { setTemples } from "../../redux/actions/temple";
import CustomAppBar from "../../components/CustomAppBar";
import Link from "../../src/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TempleItem from "../../components/TempleItem";

function Temples({ setTemples, temples }) {
  useEffect(() => {
    fetchCollection("temples", setTemples);
  }, []);

  return (
    <React.Fragment>
      <CustomAppBar />
      <Container>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href="/">Home</Link>
          <Link href="/temples">Temples</Link>
        </Breadcrumbs>
        <List>
          {temples.length > 0 ? (
            temples.map((temple: Temple, index) => {
              return <TempleItem temple={temple} key={index} />;
            })
          ) : (
            <div>No temples added</div>
          )}
        </List>
      </Container>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    temples: state.temples,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTemples: (temples: Temple[]) => dispatch(setTemples(temples)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Temples);
