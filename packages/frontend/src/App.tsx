import React from 'react';

import { ThemeProvider, Router } from './model/providers';
import { BigWidget, HugeWidget, MediumWidget, SmallWidget, WidgetRow } from './ui';
import { Content, Sidebar } from './view';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Sidebar />
        <Content>
          <WidgetRow>
            <HugeWidget>Huge widget</HugeWidget>
          </WidgetRow>
          <WidgetRow>
            <BigWidget>Big widget</BigWidget>
            <SmallWidget>Small widget</SmallWidget>
          </WidgetRow>
          <WidgetRow>
            <MediumWidget>Medium widget</MediumWidget>
            <MediumWidget>Medium widget</MediumWidget>
          </WidgetRow>
          <WidgetRow>
            <SmallWidget>Small widget</SmallWidget>
            <SmallWidget>Small widget</SmallWidget>
            <SmallWidget>Small widget</SmallWidget>
            <SmallWidget>Small widget</SmallWidget>
          </WidgetRow>
        </Content>
      </ThemeProvider>
    </Router>
  );
}

export default App;
