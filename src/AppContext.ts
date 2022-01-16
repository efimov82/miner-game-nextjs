import React from "react";

const AppContext = React.createContext({
  state: {
    soundMute: false,
  },
  setSoundMute: (boolean) => {},
});

export default AppContext;
