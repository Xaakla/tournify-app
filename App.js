import Routes from "./src/routes";
import {GlobalProvider} from "./src/context";

export default function App() {
  return (
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
  );
}
