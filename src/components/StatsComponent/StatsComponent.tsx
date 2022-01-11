import { formatTime } from "../../common/date-time.functions";
import styles from "./StatsComponent.module.scss";

type StatsProps = {
  countMines: number;
  markedMines: number;
  gameTime: number;
};

export function StatsComponent(props: StatsProps) {
  return (
    <div className="row m-10">
      <div className="col-4 col-sm-2 d-flex">
        <span className={styles.mineImage} />
        <span className="">
          X <strong>{props.countMines}</strong>
        </span>
      </div>
      <div className="col-4 col-sm-2 d-flex">
        <span className={styles.markedMinesImage}></span>
        <span className="">
          X <strong>{props.markedMines}</strong>
        </span>
      </div>
      <div className="col-4 col-sm-2 d-flex">
        <strong>{formatTime(props.gameTime)}</strong>
      </div>
    </div>
  );
}
