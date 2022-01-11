import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button, Modal } from "react-bootstrap";
import { formatTime } from "../../../common/date-time.functions";
import { WinnerResult } from "../../../types/game.types";
import styles from "./UserWinComponent.module.scss";

interface UserWinProps {
  gameResult: WinnerResult;
  onNewGameClick: () => void;
  onSaveRusultClick: (nickName: string) => void;
}

export default function UserWinComponent(props: UserWinProps) {
  const [show, setShow] = useState(true);
  const [nickname, setNickname] = useState("");
  const { t } = useTranslation("popups");

  const handleClose = () => {
    setShow(false);
  };

  const handleNewGame = () => {
    setShow(false);
    this.props.onNewGameClick();
  };

  const saveRusultClick = () => {
    if (this.state.nickName) {
      this.props.onSaveRusultClick(this.state.nickName);
      this.setState({ show: false });
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t("user-win-title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("user-win-body")}</p>
        <div>
          <p className="d-flex">
            <span>
              <strong>Field:</strong> {props.gameResult.fieldSize},
            </span>
            <span className={styles.mineImage} />
            <span>X {props.gameResult.countMines}</span>
          </p>
          <p>
            <strong>{t("user-win-time")}:</strong>{" "}
            {formatTime(props.gameResult.gameTime)}
          </p>
          <p>
            <strong>{t("user-win-nickname")}:</strong>{" "}
            <input
              name="nickName"
              onChange={(e) => setNickname(e.target.value)}
              placeholder={t("user-win-nickname-placeholder")}
              value={nickname}
            ></input>
          </p>
          <p>
            <button className="btn btn-secondary" onClick={saveRusultClick}>
              {t("btn-save-results")}
            </button>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleNewGame}>
          {t("btn-play-again")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
