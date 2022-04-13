import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });

      window.location.reload();
    }
  },
});