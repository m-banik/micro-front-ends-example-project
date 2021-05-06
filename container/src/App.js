import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Header from './components/Header';
import { Progress } from './components/Progress';
import { createBrowserHistory } from 'history';

const AuthApp = lazy(() => import('./components/AuthApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container',
});

const history = createBrowserHistory();

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState();
  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path={'/auth'}>
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path={'/dashboard'}>
                {!isSignedIn && <Redirect to={'/'} />}
                <DashboardApp />
              </Route>
              <Route path={'/'} component={MarketingApp} />
            </Switch>
          </Suspense>
        </Router>
      </StylesProvider>
    </div>
  );
};
