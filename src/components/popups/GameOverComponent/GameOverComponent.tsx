import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type GameOverComponentProps = {
  onNewGameClick: () => void;
  onShowAllMinesClick: () => void;
};

export default function GameOverComponent(props: GameOverComponentProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const handleShowMines = () => {
    setShow(false);
    props.onShowAllMinesClick();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game over</Modal.Title>
      </Modal.Header>
      <Modal.Body>Sorry, you&apos;re lose... Let&apos;s play again?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShowMines}>
          Open all mines
        </Button>
        <Button variant="primary" onClick={props.onNewGameClick}>
          Play again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
