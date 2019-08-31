import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PageCart from "./page-cart";

import { PRODUCT_GROUPS, IProductGroup } from "../../../actions/shop";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Main: React.FC = () => {
  const classes = useStyles();

  const groups: IProductGroup[] = PRODUCT_GROUPS;

  return (
    <Container maxWidth="md">
      <h3>main page</h3>
      <Grid container spacing={3} justify="space-around" alignItems="stretch">
        {groups.map(group => (
          <Grid key={group.id} item xs={6}>
            <PageCart
              title={group.persianTitle}
              subtitle={group.persianSubtitle}
              img={group.img}
            />
          </Grid>
        ))}
      </Grid>

      {/* <Grid container spacing={3} justify="space-around" alignItems="center">
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
      <PageCart /> */}
    </Container>
  );
};

export default Main;
