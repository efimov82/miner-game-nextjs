import { useContext } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import AppContext from "../../AppContext";

export function SoundSwitcherComponent() {
  const context = useContext(AppContext);
  let { soundMute } = context.state;

  return soundMute ? (
    <BsFillVolumeMuteFill onClick={() => context.setSoundMute(false)} />
  ) : (
    <BsFillVolumeUpFill onClick={() => context.setSoundMute(true)} />
  );
}
