import React, { ReactNode } from "react";

import { withTranslation, WithTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CellTypeEnum } from "../src/common/cell";
import {
  calculateNumbers,
  generateEmptyGameField,
  generateMines,
  getCountMinesForLevel,
  getIndexesById,
  openEmptyCells,
} from "../src/common/functions";
import {
  DifficultyLevel,
  GameSettings,
  GameState,
  GameStatus,
} from "../src/types/game.types";
import { FieldComponent } from "../src/components/FieldComponent/FieldComponent";
import GameOverComponent from "../src/components/popups/GameOverComponent/GameOverComponent";
import NewGameComponent from "../src/components/popups/NewGameComponent/NewGameComponent";
import UserWinComponent from "../src/components/popups/UserWinComponent/UserWinComponent";
import { StatsComponent } from "../src/components/StatsComponent/StatsComponent";
import { Winner } from "../src/models";
import { fetchWinnersList, saveGameResult } from "../src/services/game.service";

interface GameProps extends WithTranslation {}

class Game extends React.Component<GameProps, GameState> {
  mines: Set<string> = new Set();
  markedMines: Set<string> = new Set();
  timer: number = 0;
  gameTimeSeconds = 0;
  settings: GameSettings = {
    rows: 10,
    cells: 10,
    difficultyLevel: DifficultyLevel.low,
  };

  constructor(props: GameProps, state: GameState) {
    super(props);
    this.state = {
      field: null,
      gameStatus: GameStatus.empty,
      showModalNewGame: true,
      gameTimeSeconds: 0,
      winnersList: null,
    };

    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.onCellMarked = this.onCellMarked.bind(this);

    this.startNewGame = this.startNewGame.bind(this);
    this.showAllMines = this.showAllMines.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
    this.saveGameResult = this.saveGameResult.bind(this);

    this.handleNewGameClick = this.handleNewGameClick.bind(this);
    this.handleModalNewGameClose = this.handleModalNewGameClose.bind(this);
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  public handleNewGameClick() {
    this.setState({
      gameStatus: GameStatus.empty,
      showModalNewGame: true,
    });
  }

  protected onNewGameClick(): void {
    if (this.state.gameStatus !== GameStatus.open) {
      this.handleNewGameClick();
    } else {
      this.setState({
        showModalNewGame: true,
      });
    }
  }

  public async startNewGame(settings?: GameSettings) {
    if (settings) {
      this.settings = settings;
    }

    this.createGame();
    const fieldSize = `${this.settings.rows}x${this.settings.cells}`;
    const winnersList = await fetchWinnersList(fieldSize, this.mines.size);
    
    this.setState({ winnersList });

    clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.setState({ gameTimeSeconds: this.state.gameTimeSeconds + 1 });
    }, 1000);
  }

  protected createGame() {
    const fieldData = generateEmptyGameField(
      this.settings.rows,
      this.settings.cells
    );
    const countMines = getCountMinesForLevel(this.settings);
    this.mines = generateMines(fieldData, countMines);
    calculateNumbers(fieldData);
    this.markedMines = new Set();

    this.setState({
      field: { data: fieldData },
      gameStatus: GameStatus.open,
      gameTimeSeconds: 0,
      showModalNewGame: false,
    });
  }

  public onCellClick(cellId: string): void {
    if (
      this.state.gameStatus !== GameStatus.open ||
      this.state.field?.data === undefined
    ) {
      return;
    }

    const { rowIndex, cellIndex } = getIndexesById(cellId);
    const newFields = this.state.field.data;

    if (
      newFields[rowIndex][cellIndex].isOpen ||
      newFields[rowIndex][cellIndex].isMarked
    ) {
      return;
    }

    switch (newFields[rowIndex][cellIndex].type) {
      case CellTypeEnum.empty:
        if (newFields[rowIndex][cellIndex].minesAround === 0) {
          openEmptyCells(newFields, rowIndex, cellIndex);
        }
        break;
      case CellTypeEnum.mine:
        this.gameOver();
    }

    newFields[rowIndex][cellIndex].open();
    this.setState({ field: { data: newFields } });
  }

  public onCellMarked(cellId: string): void {
    if (this.state.gameStatus !== GameStatus.open || !this.state.field) {
      return;
    }

    const { rowIndex, cellIndex } = getIndexesById(cellId);
    const newFields = this.state.field.data;
    const cell = newFields[rowIndex][cellIndex];

    if (cell.isOpen) {
      return;
    }

    if (!cell.isMarked) {
      if (this.markedMines.size === this.mines.size) {
        return;
      }

      this.markedMines.add(cellId);
    } else {
      this.markedMines.delete(cellId);
    }

    newFields[rowIndex][cellIndex].setMarked(!cell.isMarked);
    this.setState({ field: { data: newFields } });
    if (this.checkAllMinesMarked()) {
      this.setState({
        gameStatus: GameStatus.userWin,
      });
      clearInterval(this.timer);
    }
  }

  protected checkAllMinesMarked(): boolean {
    for (let cell of this.mines) {
      if (!this.markedMines.has(cell)) {
        return false;
      }
    }

    return true;
  }

  protected gameOver(): void {
    this.setState({
      gameStatus: GameStatus.userLose,
    });
    clearInterval(this.timer);
  }

  protected showAllMines(): void {
    const newField = this.state.field?.data;
    if (!newField) {
      return;
    }

    this.mines.forEach((cell) => {
      const { rowIndex, cellIndex } = getIndexesById(cell);
      newField[rowIndex][cellIndex].open();
    });

    this.setState({ field: { data: newField } });
  }

  protected handleModalNewGameClose() {
    this.setState({ showModalNewGame: false });
  }

  protected getPopupContent(): ReactNode {
    switch (this.state.gameStatus) {
      case GameStatus.empty:
      case GameStatus.open:
        return (
          this.state.showModalNewGame && (
            <NewGameComponent
              settings={this.settings}
              onNewGameClick={this.startNewGame}
              onNewGameModalClose={this.handleModalNewGameClose}
            ></NewGameComponent>
          )
        );
      case GameStatus.userLose:
        return (
          <GameOverComponent
            onNewGameClick={this.handleNewGameClick}
            onShowAllMinesClick={this.showAllMines}
          />
        );
      case GameStatus.userWin:
        return (
          <UserWinComponent
            gameResult={this.getGameResult()}
            onSaveRusultClick={this.saveGameResult}
            onNewGameClick={this.handleNewGameClick}
          />
        );
      default:
        return "";
    }
  }

  protected saveGameResult(nickName: string) {
    const data = this.getGameResult(nickName);

    const res = saveGameResult(data);
    console.log(res);
  }

  protected getGameResult(nickName = ""): Winner {
    if (!this.state.field) {
      throw Error("Error get game result");
    }

    const fieldSize = `${this.state.field?.data.length}x${this.state.field?.data[0].length}`;
    return {
      fieldSize: fieldSize,
      countMines: this.mines.size,
      gameTime: this.state.gameTimeSeconds,
      timestamp: 0,
      nickName,
    };
  }

  public render() {
    const popUp: ReactNode = this.getPopupContent();
    const { t } = this.props;

    return (
      <div className="container">
        <div className="row m-2">
          <div className="col">
            {popUp}
            <div className="row mt-2 mb-2">
              <StatsComponent
                countMines={this.mines.size}
                markedMines={this.markedMines.size}
                gameTime={this.state.gameTimeSeconds}
                winnersList={this.state.winnersList}
              />
            </div>
            <div className="row mb-3">
              <FieldComponent
                field={this.state.field}
                onCellClick={this.onCellClick}
                onCellMarked={this.onCellMarked}
              />
            </div>
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={this.onNewGameClick}
                >
                  {t("new-game")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
  },
});

export default withTranslation("game")(Game);
