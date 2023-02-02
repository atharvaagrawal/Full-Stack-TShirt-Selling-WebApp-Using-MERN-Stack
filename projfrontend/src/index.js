import { createRoot } from "react-dom/client";
import Home from "./core/Home";
import Routes from "./Routes";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Routes />);
