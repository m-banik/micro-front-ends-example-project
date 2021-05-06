import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'marketing',
});

export const App = ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path={'/auth/signin'} component={Signin}>
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path={'/auth/signup'}>
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
