import React from 'react';
import { Provider } from 'react-redux';
import ConnectedFeaturesPage from './pages/FeaturesPage';
import store from './store/store';

const App = () => (
  <Provider store={store}>
    <div className="mt-5 mb-5">
      <div>
        <h2>Features List</h2>
        <ConnectedFeaturesPage />
      </div>
    </div>
  </Provider>
);

export default App;
