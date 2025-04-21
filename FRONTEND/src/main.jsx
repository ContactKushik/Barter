import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store, { persistor } from "./redux/Store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
