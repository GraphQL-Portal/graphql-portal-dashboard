import React from 'react';

import { ThemeProvider, Router } from './model/providers';
import { Content, Sidebar } from './view';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Sidebar />
        <Content>Main content here</Content>
      </ThemeProvider>
    </Router>
  );
}

export default App;
