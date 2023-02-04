import { createRoot } from "react-dom/client";
import AllRoutes from "./Routes";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AllRoutes />);
