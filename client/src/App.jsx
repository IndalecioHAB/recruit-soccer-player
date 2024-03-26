// Importamos las rutas para la paginación.
import { Route, Routes } from "react-router-dom";

// Importamos el css
import "./App.css";

// Importamos toast
import { Toaster } from "react-hot-toast";

// Importamos los componentes que necesitamos
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Importamos las paginas que necesitamos
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import UserPlayersPage from "./pages/UserPlayersPage/UserPlayersPage";
import PlayersProfilePage from "./pages/PlayersProfilePage/PlayersProfilePage";
import NewEntryPage from "./pages/NewEntryPage/NewEntryPage";
import EntryDetailsPage from "./pages/EntryDetailsPage/EntryDetailsPage";
import ContractsPage from "./pages/ContractsPage/ContractsPage";
import FamilyContractsPage from "./pages/ContractsFamilyPage/familyContractsPage.jsx";
import ValidateUserPage from "./pages/ValidateUserPage/ValidateUserPage.jsx";

// Importamos los datos de usuario para prohibir que pueda entrar donde no debe
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Header />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        {/*Rutas que todos pueden visitar*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/users/validate/:registrationCode"
          element={<ValidateUserPage />}
        />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/entries/:entryId" element={<EntryDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/*Rutas que solo puede visitar RECRUITER*/}
        <Route
          path="/recruiter-contracts"
          element={
            authUser && authUser.role === "recruiter" ? (
              <ContractsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/*Rutas que solo puede visitar FAMILY*/}
        <Route
          path="/player"
          element={
            authUser && authUser.role === "family" ? (
              <UserPlayersPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/player/profile/:playerId"
          element={
            authUser && authUser.role === "family" ? (
              <PlayersProfilePage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/entry"
          element={
            authUser && authUser.role === "family" ? (
              <NewEntryPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/family-contracts"
          element={
            authUser && authUser.role === "family" ? (
              <FamilyContractsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
