
// import {applyMiddleware} from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import rootreducers from './components/redux/reducers/main';

// const middleware=[thunk];

// const store=configureStore(
//     rootreducers,
//     composeWithDevTools(applyMiddleware(...middleware))
// );


// export default store;
import { configureStore } from '@reduxjs/toolkit';
import rootreducers from './components/redux/reducers/main';

const store = configureStore({
  reducer: rootreducers,
  // Redux Toolkit enables Redux DevTools extension automatically in development mode,
  // and it already includes redux-thunk middleware by default.
  // You can still add additional middleware if needed.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* other middleware */),
});

export default store;
