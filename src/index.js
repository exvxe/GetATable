import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './components/store/reducers/rootReducer';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}

const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
      reduxFirestore(fbConfig),
      devTools,
    )
  );


store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}><App /></Provider>, document.getElementById("root")
    );
    registerServiceWorker();
})

