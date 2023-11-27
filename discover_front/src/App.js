import "./App.css";
import AppRouter from "./router";
import { AuthProvider } from "./authContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Search from "./components/search/Search";

function App() {
  return (
    <AuthProvider>
      <>
      <Search/>
        <Header />
        <AppRouter />
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
