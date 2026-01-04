import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserPreferencesProvider>
      <App />
    </UserPreferencesProvider>
  </BrowserRouter>
);
