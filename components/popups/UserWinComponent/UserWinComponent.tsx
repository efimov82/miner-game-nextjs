import React from "react";
import { Button, Modal } from "react-bootstrap";
import { formatTime } from "../../../common/date-time.functions";
import { WinnerResult } from "../../../types/game.types";

type UserWinProps = {
  gameResult: WinnerResult;
  onNewGameClick: () => void;
  onSaveRusultClick: (nackName: string) => void;
};

type UserWinState = {
  show: boolean;
  nickName: string;
};
export class UserWinComponent extends React.Component<
  UserWinProps,
  UserWinState
> {
  constructor(props: UserWinProps, state: UserWinState) {
    super(props);
    this.state = {
      show: true,
      nickName: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.setNickname = this.setNickname.bind(this);
    this.saveRusultClick = this.saveRusultClick.bind(this);
  }

  handleClose(): void {
    this.setState({ show: false });
  }

  handleNewGame() {
    this.setState({ show: false });
    this.props.onNewGameClick();
  }

  setNickname(value: string) {
    this.setState({ nickName: value });
  }

  saveRusultClick() {
    if (this.state.nickName) {
      this.props.onSaveRusultClick(this.state.nickName);
      this.setState({ show: false });
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You&apos;re win.</p>
          <div>
            <p className="d-flex">
              <span>
                <strong>Field:</strong> {this.props.gameResult.fieldSize},
              </span>
              <span className="mineImage" />
              <span>X {this.props.gameResult.countMines}</span>
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {formatTime(this.props.gameResult.gameTime)}
            </p>
            <p>
              <strong>Nickname:</strong>{" "}
              <input
                name="nickName"
                onChange={(e) => this.setNickname(e.target.value)}
                placeholder="Your nickname"
                value={this.state.nickName}
              ></input>
            </p>
            <p>
              <button
                className="btn btn-secondary"
                onClick={this.saveRusultClick}
              >
                Save my results
              </button>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleNewGame}>
            Play again
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
