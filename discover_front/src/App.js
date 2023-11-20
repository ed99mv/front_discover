import "./App.css";
import AppRouter from "./router";
import { AuthProvider } from "./authContext";

function App() {
  return (
    <AuthProvider>
      <>
        <AppRouter />
      </>
    </AuthProvider>
  );
}

export default App;
