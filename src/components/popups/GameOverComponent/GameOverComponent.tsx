import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import styles from "./GameOverComponent.module.scss";

type GameOverComponentProps = {
  onNewGameClick: () => void;
  onShowAllMinesClick: () => void;
};

export default function GameOverComponent(props: GameOverComponentProps) {
  const [show, setShow] = useState(true);
  const { t } = useTranslation("popups");
  const handleClose = () => setShow(false);

  const handleShowMines = () => {
    setShow(false);
    props.onShowAllMinesClick();
  };

  return (
    <Modal className={styles.body} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-title">
            <div className={styles.mine}> </div>
            <div className={styles.title}>{t("game-over-title")}</div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("game-over-body")}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShowMines}>
          {t("btn-open-all-mines")}
        </Button>
        <Button variant="primary" onClick={props.onNewGameClick}>
          {t("btn-play-again")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
