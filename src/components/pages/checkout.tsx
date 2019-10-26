import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { IAppState } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { IProduct, IProductPlus } from "../../actions/shop";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    mainTitle: {
      fontFamily: "Yekan"
    },
    companyLink: {
      fontFamily: "Yekan",
      padding: "2px"
    },
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 2)
    },
    myFont: {
      fontFamily: "Yekan"
    },
    btn: {
      fontFamily: "Yekan",
      textAlign: "left",
      margin: theme.spacing(1, 2)
    }
  })
);

interface ICheckoutProps {
  products: IProduct[];
  cart: ICartState;
  marketId?: number;
  changePage: Function;
}

const Checkout: React.FC<ICheckoutProps> = (prop: ICheckoutProps) => {
  const classes = useStyles();

  const products: IProduct[] = prop.products.filter(
    (p: IProduct) => Number(p.markets_id) === Number(prop.marketId)
  );

  const productsPlus: IProductPlus[] = products
    .map((p: IProduct) => {
      const pplus: IProductPlus = p as IProductPlus;
      const count: number =
        prop.cart === undefined || prop.cart[p.id] === undefined
          ? 0
          : prop.cart[p.id];
      return { ...pplus, count: count };
    })
    .filter(p => p.count !== 0);

  // const products: IProductPlus[] = prop.products.map(pCart => {
  //   pCart.count =
  //     prop.cart === undefined || prop.cart[pCart.id] === undefined
  //       ? 0
  //       : prop.cart[pCart.id];
  //   return pCart;
  // }).filter(p => p.count !== 0);

  return (
    <Container maxWidth="md">
      <h3 className={classes.mainTitle}>لیست سفارش ها</h3>
      {productsPlus.length === 0 ? (
        <Paper className={classes.root}>
          <Typography className={classes.myFont} variant="h5" component="h3">
            سبد خرید خالی هست!
          </Typography>
          <Typography className={classes.myFont} component="p">
            لطفاً کالا یا کالاهایی را انتخاب کنید.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
          >
            بازگشت به صفحه اصلی
          </Button>
        </Paper>
      ) : (
        <>
          {productsPlus.map(p => (
            <h4>
              {p.count} * {p.title}
            </h4>
          ))}
          <h4>مجموع</h4>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  cart: State.shop.cart,
  products: State.shop.products,
  marketId: State.shop.lastMarketId
});

const mapDispatchToProps = {
  // changePage: changePage
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
