import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import { theme } from "./theme";

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
