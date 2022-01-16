import { useContext } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import AppContext from "../../AppContext";
import styles from "./SoundSwitcherComponent.module.scss";

export function SoundSwitcherComponent() {
  const context = useContext(AppContext);
  let { soundMute } = context.state;

  return soundMute ? (
    <BsFillVolumeMuteFill
      className={styles.soundIcon}
      onClick={() => context.setSoundMute(false)}
    />
  ) : (
    <BsFillVolumeUpFill
      className={styles.soundIcon}
      onClick={() => context.setSoundMute(true)}
    />
  );
}
