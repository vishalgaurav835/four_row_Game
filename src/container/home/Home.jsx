import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles, Grid, Card, Button } from "@material-ui/core";
import homeStyle from "./Home.style";
import FourRowImg from "../../assests/imgs/4inarow.png";
import Play from "../../assests/imgs/play.png";
import One from "../../assests/imgs/one.png";
import Online from "../../assests/imgs/online.png";
import Two from "../../assests/imgs/two.png";
import Training from "../../assests/imgs/training.png";

const home = ({ ...props }) => {
  const useStyles = makeStyles(homeStyle);
  const classes = useStyles();
  return (
    <div className={classes.mainDivHome}>
      <Card minWidth="400" className={classes.mainCardHome}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6} style={{ minHeight: "150px" }}>
            <Button
              variant="contained"
              color="default"
              className={classes.styleOfBtn}
              onClick={() => props.handleDetailPageOpen("detailPage")}
              fullWidth
            >
              <img src={Play} alt={Play} className={classes.playStyle} />
              Play
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <img
              src={FourRowImg}
              alt={FourRowImg}
              className={classes.imgStyle}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="contained"
              color="default"
              className={classes.OneBtnStyle}
              fullWidth
              onClick = { () => alert("Comming Soon")}
            >
              <img src={One} alt={One} className={classes.ImgOfDifferentBtn} />
              <div className={ classes.btnStyleForCommingSoon }> Custom Game </div>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="contained"
              color="default"
              className={classes.TwoBtnStyle}
              onClick={() => props.handleDetailPageOpen("detailPage")}
              fullWidth
            >
              <img src={Two} alt={Two} className={classes.ImgOfDifferentBtn} />
           <div  className={ classes.btnStyleForCommingSoon }>    Two Players </div>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="contained"
              color="default"
              className={classes.OnlineBtnStyle}
              fullWidth
              onClick = { () => alert("Comming Soon")}
            >
              <img
                src={Online}
                alt={Online}
                className={classes.ImgOfDifferentBtn}
              />
              <div  className={ classes.btnStyleForCommingSoon }> Game Online </div>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="contained"
              color="default"
              className={classes.TrainingBtnStyle}
              fullWidth
              onClick = { () => alert("Comming Soon")}
            >
              <img
                src={Training}
                alt={Training}
                className={classes.ImgOfDifferentBtn}
              />
             <div  className={ classes.btnStyleForCommingSoon }> Training Game </div>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default withStyles(homeStyle)(home);
