import React from "react";
import { Button, Modal } from "react-bootstrap";
import { DifficultyLevel, GameSettings } from "../../../types/game.types";

type NewGameComponentProps = {
  settings: GameSettings;
  onNewGameClick: (settings: GameSettings) => void;
  onNewGameModalClose: () => void;
};

type NewGameComponentState = {
  show: boolean;
  gameSettings: GameSettings;
};

export class NewGameComponent extends React.Component<
  NewGameComponentProps,
  NewGameComponentState
> {
  protected sizes = ["10x10", "15x15", "20x20", "25x25", "30x30", "40x40"];

  constructor(props: NewGameComponentProps, state: NewGameComponentState) {
    super(props);
    this.state = {
      show: true,
      gameSettings: props.settings,
    };
  }

  handleClose = () => this.props.onNewGameModalClose();

  handleChangeLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    let level: DifficultyLevel;

    switch (value) {
      case "low":
        level = DifficultyLevel.low;
        break;
      case "medium":
        level = DifficultyLevel.medium;
        break;
      case "high":
        level = DifficultyLevel.high;
        break;
      case "hardcore":
        level = DifficultyLevel.hardcore;
        break;
      default:
        throw new Error("Wrong DifficultyLevel value");
    }

    let settings = this.state.gameSettings;
    settings.difficultyLevel = level;
    this.setState({ gameSettings: settings });
  };

  handleFieldSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.split("x");

    let settings = this.state.gameSettings;
    settings.rows = Number(value[0]);
    settings.cells = Number(value[1]);

    this.setState({ gameSettings: settings });
  };

  generateDifficultyLevelsSelect() {
    return (
      <select
        name="fieldSize"
        value={this.state.gameSettings.difficultyLevel}
        onChange={(e) => this.handleChangeLevel(e)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="hardcore">Hardcore</option>
      </select>
    );
  }

  genarateGameSizesSelect() {
    const options = this.sizes.map((value, index) => {
      return <option key={index}>{value}</option>;
    });

    const selected =
      this.state.gameSettings.rows + "x" + this.state.gameSettings.rows;

    return (
      <select
        name="fieldSize"
        onChange={(e) => this.handleFieldSizeChange(e)}
        value={selected}
      >
        {options}
      </select>
    );
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Field size: {this.genarateGameSizesSelect()}</p>
          <p>Difficulty: {this.generateDifficultyLevelsSelect()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => this.props.onNewGameClick(this.state.gameSettings)}
          >
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
