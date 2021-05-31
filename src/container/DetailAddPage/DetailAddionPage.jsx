import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import detailPageStyle from './DetailAdditionPage.style';
import CustomInputBox from '../../component/InputBox/SimpleInputBox';
import AvtarOne from '../../assests/imgs/avatar01.png';
import AvtarTwo from '../../assests/imgs/avatar02.png';
import AvtarRun from '../../assests/imgs/run.png';
import AvtarWinner from '../../assests/imgs/winner.png';
import ButtonTag from '../../component/Button/Button';
import ConfirmationDialogRaw from '../../component/ConfirmationDialoguePopup/ConfirmationDialoguePopup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const detailAdditionPage = ({ ...props }) => {
    let { classes } = props;
    let [valuePlayerOne, setValuePlayerOne] = useState("");
    let [valuePlayerTwo, setValuePlayerTwo] = useState("");
    let [value, setValue] = useState("");
    let [labelOptionTxt, setLabelOptionTxt] = useState("");
    const [open, setOpen] = useState(false);
    let [valueForNoOfPlayer, setValueForNoOfPlayer] = useState("");
    let [valueForWhoStart, setValueForWhoStart] = useState("");
    let [styleForSelectedOption, setStyleForSelectedOption] = useState("");
    let [options, setOption] = useState([])
    const handleChangePlayerOne = (event) => {
        setValuePlayerOne(event.target.value);
    };
    const handleChangePlayerTwo = (event) => {
        setValuePlayerTwo(event.target.value);
    };

    const openPopupForNoOfPlayer = () => {
        setOpen(true);
        setOption(["2 Games", "3 Games", "5 Games", "10 Games"])
        setLabelOptionTxt("Number of game")
        setStyleForSelectedOption("noOfPlayerStyle")
    };

    const openPopupForWhoStart = () => {
        setOpen(true);
        setOption(["Alternative turn", "Looser first", "Winner first", "Always player 01", "Always player 02"])
        setLabelOptionTxt("Who starts")
        setStyleForSelectedOption("playerWhoStartStyle")
    };

    const handleClose = (newValue) => {
        setOpen(false);
        setOption([]);
        if (labelOptionTxt === "Number of game"){
            if (newValue) {
                setValueForNoOfPlayer(newValue);
            }
        }
        if (labelOptionTxt === "Who starts"){
            if (newValue) {
                setValueForWhoStart(newValue);
            }
        }

    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.wrapperDivOfHeader}>
                <Grid container spacing={3}>
                        <Grid item xs={4} className={classes.arrowStyleOfBackBtn}>
                            <ArrowBackIcon onClick={props.backToHomeScreen} />
                        </Grid>
                        <Grid item xs={8} className={classes.playerstxt}>
                            Two Players Game
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.wrapperDivOfDetail}>
                    <div className={classes.divForFirstPlayer}>
                        <CustomInputBox value={valuePlayerOne} imagePath={AvtarOne} ImgOfDifferentAvatar={classes.AvatarOneImgStyle} label={"Player 01"} playerStyleName={"playerOne"} handleChange={handleChangePlayerOne} />
                    </div>
                    <div className={classes.divForSecondPlayer}>
                        <CustomInputBox value={valuePlayerTwo} imagePath={AvtarTwo} ImgOfDifferentAvatar={classes.AvatarTwoImgStyle} label={"Player 02"} playerStyleName={"playerTwo"} handleChange={handleChangePlayerTwo} />
                    </div>
                    <div className={classes.divForNoOfPlayer} onClick={openPopupForNoOfPlayer}>
                        <CustomInputBox value={valueForNoOfPlayer} imagePath={AvtarWinner} ImgOfDifferentAvatar={classes.AvatarWinnerImgStyle} label={"Number of game"} playerStyleName={"playerAdditioalData"} />
                    </div>
                    <div className={classes.divForWhoStart} onClick={openPopupForWhoStart}>
                        <CustomInputBox value={valueForWhoStart} imagePath={AvtarRun} ImgOfDifferentAvatar={classes.AvatarRunImgStyle} label={"Alternative turn"} playerStyleName={"playerAdditioalData"} />
                    </div>
                    <hr className={classes.dividerStyle} />
                    <div>
                        <ButtonTag styleOfBtn={classes.startGameStyleBtn}  onClick={() => props.handlePlayPageOpen("startGame",valuePlayerOne,valuePlayerTwo,valueForNoOfPlayer,valueForWhoStart) }>
                            Start Game
                    </ButtonTag>
                    </div>
                </Paper>
            </Grid>
            <ConfirmationDialogRaw
                keepMounted
                options={options}
                open={open}
                onClose={handleClose}
                LabelOfOption={ labelOptionTxt }
                styleForSelectedOption={styleForSelectedOption}
            />
        </Grid>
    )
}

export default withStyles(detailPageStyle)(detailAdditionPage);