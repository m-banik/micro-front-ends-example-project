import React from 'react';
import { render } from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { App } from './App';

export const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  if (el) {
    const history =
      defaultHistory ||
      createMemoryHistory({
        initialEntries: [initialPath],
      });
    if (onNavigate) {
      history.listen(onNavigate);
    }
    render(<App history={history} />, el);
    return {
      onParentNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    };
  }
};

if (process.env.NODE_ENV === 'development') {
  const rootElement = document.querySelector('#dev-marketing-root');
  if (rootElement) {
    mount(rootElement, { defaultHistory: createBrowserHistory() });
  }
}
