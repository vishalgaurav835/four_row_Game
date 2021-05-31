import React, { Component } from "react";
import { Grid, Paper, TableContainer, Container } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Style from "./FourRowGame.style";
import AvtarOne from "../../assests/imgs/avatar01.png";
import AvtarTwo from "../../assests/imgs/avatar02.png";
import ButtonTag from "../../component/Button/Button";
import Row from "./Row";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class FourRowGame extends Component {
  constructor() {
    super();
    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: "",
      flag: "",
      score1: 0,
      score2: 0,
      displayStartBtn: false,
      roundStatus: "",
      noOfRounds: 1,
      isEndedGame: false,
      btnState: "",
      previousCellArray: [],
      currentPlayer: null,
      flagWin: "",
    };
    // Bind play function to App component
    this.play = this.play.bind(this);
  }
  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 8; r++) {
      let row = [];
      for (let c = 0; c < 8; c++) {
        row.push(null);
      }
      board.push(row);
    }

    this.setState({
      board,
      gameOver: false,
      message: "",
      roundStatus: "Playing Game" + this.state.noOfRounds,
      isEndedGame: false,
    });
    if (this.props.whostart == "Alternative turn") {
      this.setState({
        currentPlayer: this.state.player1,
      });
    }
    if (this.props.whostart == "Looser first") {
      if (this.state.flagWin && this.state.flagWin != "player1") {
        this.setState({
          currentPlayer: this.state.player2,
        });
      }
      if (this.state.flagWin && this.state.flagWin != "player2") {
        this.setState({
          currentPlayer: this.state.player1,
        });
      }
      if (!this.state.flagWin) {
        this.setState({
          currentPlayer: this.state.player1,
        });
      }
    }
    if (this.props.whostart == "Winner first") {
      if (this.state.flagWin && this.state.flagWin == "player1") {
        this.setState({
          currentPlayer: this.state.player1,
        });
      }
      if (this.state.flagWin && this.state.flagWin == "player2") {
        this.setState({
          currentPlayer: this.state.player2,
        });
      }
      if (!this.state.flagWin) {
        this.setState({
          currentPlayer: this.state.player1,
        });
      }
    }
    if (this.props.whostart == "Always player 01") {
      this.setState({
        currentPlayer: this.state.player1,
      });
    }
    if (this.props.whostart == "Always player 02") {
      this.setState({
        currentPlayer: this.state.player2,
      });
    }
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 7; r >= 0; r--) {
        if (!board[r][c]) {
          this.setState({
            previousCellArray: [...this.state.previousCellArray, [r, c]],
            playerCurrentValue: this.state.currentPlayer,
            onceUndoIsDone: false,
          });
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }

      // Check status of board
      let result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({
          board,
          gameOver: true,
          noOfRounds: this.state.noOfRounds + 1,
          message: this.props.playerOne,
          flagWin: "player1",
          score1: this.state.score1 + 1,
        });
      } else if (result === this.state.player2) {
        this.setState({
          board,
          gameOver: true,
          noOfRounds: this.state.noOfRounds + 1,
          message: this.props.playerTwo,
          flagWin: "player2",
          score2: this.state.score2 + 1,
        });
      } else if (result === "draw") {
        this.setState({
          board,
          gameOver: true,
          noOfRounds: this.state.noOfRounds + 1,
          message: "Draw game.",
        });
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      if (this.state.noOfRounds <= this.props.noOfGame) {
        this.setState({
          isEndedGame: true,
          roundStatus:
            this.state.message + ", you won Game" + (this.state.noOfRounds - 1),
          btnState: "startNewGame",
        });
      } else {
        if (this.state.score1 != this.state.score2) {
          this.setState({
            btnState: "startAgain",
            roundStatus:
              this.state.score1 < this.state.score2
                ? this.props.playerTwo + ", you won tournament"
                : this.props.playerOne + ", you won tournament",
            isEndedGame: true,
          });
        } else {
          this.setState({
            btnState: "startAgain",
            roundStatus: "Draw tournament",
            isEndedGame: true,
          });
        }
      }
    }
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 8; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 8; r++) {
      for (let c = 3; c < 8; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  }

  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board) ||
      this.checkDraw(board)
    );
  }

  componentWillMount() {
    this.initBoard();
  }

  handleUndoChanges = () => {
    if (!this.state.onceUndoIsDone && this.state.previousCellArray.length) {
      let board = this.state.board;
      board[
        this.state.previousCellArray[this.state.previousCellArray.length - 1][0]
      ][
        this.state.previousCellArray[this.state.previousCellArray.length - 1][1]
      ] = null;
      this.state.previousCellArray.pop();
      this.setState({
        board,
        onceUndoIsDone: true,
        currentPlayer: this.state.playerCurrentValue,
      });
    }
  };

  handlePlayAgain = () => {
    this.setState({
      btnState: "",
    },() => this.initBoard())
  };

  handleNextGame = () => {
    this.setState(
      {
        message: "",
        flag: "",
        score1: 0,
        score2: 0,
        displayStartBtn: false,
        roundStatus: "",
        noOfRounds: 1,
        isEndedGame: false,
        btnState: "",
        previousCellArray: [],
        currentPlayer: null,
      },
      () => this.initBoard()
    );
  };

  render() {
    const { classes } = this.props;
    let buttonState = (
      <ButtonTag
        styleOfBtn={classes.startOrUndoStyleBtn}
        onClick={() => this.handleUndoChanges()}
      >
        Undo Step
      </ButtonTag>
    );
    if (this.state.btnState == "startAgain") {
      buttonState = (
        <ButtonTag
          styleOfBtn={classes.startOrUndoStyleBtn}
          onClick={() => this.handleNextGame()}
        >
          Play Again
        </ButtonTag>
      );
    }
    if (this.state.btnState == "startNewGame") {
      buttonState = (
        <ButtonTag
          styleOfBtn={classes.startOrUndoStyleBtn}
          onClick={() => this.handlePlayAgain()}
        >
          Next Game
        </ButtonTag>
      );
    }
    return (
      <div className={classes.wrapperParentDiv}>
        <Paper className={classes.wrapperPaperForHeader}>
        <Grid container spacing={3}>
            <Grid item xs={6} className={classes.arrowStyleOfBackBtn}>
            <ArrowBackIcon onClick={this.props.backToPreviousScreen} />
            </Grid>
            <Grid item xs={6} className={classes.playerstxt}>
            Two Players Game
            </Grid>
          </Grid>
        </Paper>
          <Paper className={classes.wrapperPaperForGameDash}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <TableContainer>
                  <div>
                    <table className={classes.tableStyle}>
                      <thead></thead>
                      <tbody>
                        {this.state.board.map((row, i) => (
                          <Row key={i} row={row} play={this.play} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div className={classes.wrapperDivForGameTournamentTxt}>
                      {" "}
                      {this.props.noOfGame} Games Tournament{" "}
                    </div>
                    {this.state.isEndedGame ? (
                      <div className={classes.wrapperDivCongratulationTxt}>
                        {" "}
                        Congratulation!{" "}
                      </div>
                    ) : null}
                    <div className={classes.wrapperDivWonTournamentTxt}>
                      {this.state.roundStatus}
                    </div>
                    <div className={classes.wrapperDivPlayerOneTxt}>
                      <div className={classes.playerOne}>
                        <img
                          src={AvtarOne}
                          alt={AvtarOne}
                          style={{ width: "26px" }}
                        />
                      </div>
                      <div style={{ margin: "8% 4%" }}>
                        <div className={classes.playerStyleTxt}>
                          {" "}
                          Player 01{" "}
                        </div>
                        <div className={classes.playerNameTxt}>
                          {" "}
                          {this.props.playerOne}
                        </div>
                      </div>
                      <div style={{ margin: "8% 8%" }}>
                        <div className={classes.playerStyleTxt}> Score </div>
                        <div className={classes.playerNameTxt}>
                          {this.state.score1}
                        </div>
                      </div>
                    </div>
                    <div className={classes.wrapperDivPlayerTwoTxt}>
                      <div className={classes.playerTwo}>
                        <img
                          src={AvtarTwo}
                          alt={AvtarTwo}
                          style={{ width: "30px" }}
                        />
                      </div>
                      <div style={{ margin: "8% 4%" }}>
                        <div className={classes.playerStyleTxt}>
                          {" "}
                          Player 02{" "}
                        </div>
                        <div className={classes.playerNameTxt}>
                          {" "}
                          {this.props.playerTwo}{" "}
                        </div>
                      </div>
                      <div style={{ margin: "8% 8%" }}>
                        <div className={classes.playerStyleTxt}>Score</div>
                        <div className={classes.playerNameTxt}>
                          {this.state.score2}
                        </div>
                      </div>
                    </div>
                    <hr style={{ margin: "9% 12%", opacity: 1 }} />
                    <div>{buttonState}</div>
                    <div>
                      <ButtonTag
                        styleOfBtn={classes.endGameStyleBtn}
                        onClick={this.props.handleHomePage}
                      >
                        End Tournament
                      </ButtonTag>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        {/* </Container> */}
      </div>
    );
  }
}

export default withStyles(Style)(FourRowGame);
