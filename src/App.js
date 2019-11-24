import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import CmsRouter from './cms/router';

function App() {
  return (
    <Router>
      <Route path='/cms' component={CmsRouter} />
    </Router>
  );
}

export default App;
