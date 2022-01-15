import { formatTime } from "../../common/date-time.functions";
import { Winner } from "../../models";
import styles from "./StatsComponent.module.scss";

type StatsProps = {
  countMines: number;
  markedMines: number;
  gameTime: number;
  winnersList: Winner[];
};

export function StatsComponent(props: StatsProps) {
  return (
    <>
      <div className="row m-10">
        <div className="col col-sm-8">
          <span className={styles.mineImage} />
          <span className="">
            X <strong>{props.countMines}</strong>
          </span>

          <span className={styles.markedMinesImage}></span>
          <span className="">
            X <strong>{props.markedMines}</strong>
          </span>

          <span>
            {" "}
            Time: <strong>{formatTime(props.gameTime)}</strong>
          </span>
        </div>
      </div>
      <div className="row m-10">
        <div className="col col-sm-10">
          <span className={styles.currentTop}>
            {getCurrentWinner(props.gameTime, props.winnersList)}
          </span>
        </div>
      </div>
    </>
  );

  function getCurrentWinner(gameTime: number, winnersList: Winner[]): string {
    if (!winnersList || !winnersList.length) return "";

    for (let i = 0; i < winnersList.length; i++) {
      const winner = winnersList[i];
      if (gameTime < winner.gameTime) {
        return _formatCurrectTop(i + 1, winner.gameTime, winner.nickName);
      }
    }

    return _formatCurrectTop(
      winnersList.length,
      winnersList[winnersList.length - 1].gameTime,
      winnersList[winnersList.length - 1].nickName
    );
  }

  function _formatCurrectTop(
    num: number,
    gameTime: number,
    nickname: string
  ): string {
    return `TOP-${num}: ${formatTime(gameTime)} (${nickname})`;
  }
}
