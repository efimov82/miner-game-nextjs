import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";
import { DifficultyLevel, GameSettings } from "../../../types/game.types";
import styles from "./NewGameComponent.module.scss";
interface NewGameComponentProps extends WithTranslation {
  settings: GameSettings;
  onNewGameClick: (settings: GameSettings) => void;
  onNewGameModalClose: () => void;
}

interface NewGameComponentProps extends WithTranslation {
  settings: GameSettings;
  onNewGameClick: (settings: GameSettings) => void;
  onNewGameModalClose: () => void;
}

interface NewGameComponentState {
  show: boolean;
  gameSettings: GameSettings;
}

class NewGameComponent extends Component<
  NewGameComponentProps,
  NewGameComponentState
> {
  protected sizes = ["10x10", "15x15", "20x20", "25x25", "30x30", "40x40"];
  state = {
    show: true,
    gameSettings: this.props.settings,
  };

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
    const { t } = this.props;
    return (
      <select
        name="fieldSize"
        value={this.state.gameSettings.difficultyLevel}
        onChange={(e) => this.handleChangeLevel(e)}
      >
        <option value="low">{t("difficulty-low")}</option>
        <option value="medium">{t("difficulty-medium")}</option>
        <option value="high">{t("difficulty-high")}</option>
        <option value="hardcore">{t("difficulty-hardcore")}</option>
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
    const { t } = this.props;
    return (
      <Modal className={styles.body} show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("title-new-game")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {t("field-size")}: {this.genarateGameSizesSelect()}
          </p>
          <p>
            {t("difficulty")}: {this.generateDifficultyLevelsSelect()}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => this.props.onNewGameClick(this.state.gameSettings)}
          >
            {t("button-start")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withTranslation("popups")(NewGameComponent);
