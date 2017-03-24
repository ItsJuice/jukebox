import React from 'react';
import { Router, Route } from 'react-router';
import AppContent from './containers/app-content';
import VideoPage from './videos/video-page';

function AppRouter( { history } ) {
  return  <Router history={ history }>
            <Route path="/" component={AppContent}>
              <Route path="stream/:streamId" component={VideoPage} />
            </Route>
          </Router>
}

AppRouter.propTypes = {
  history: React.PropTypes.object
}

export default AppRouter;
