import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./paginas/publicArea/Login";
import Registrar from "./paginas/publicArea/Registrar";
import ConfirmarCuenta from "./paginas/publicArea/ConfirmarCuenta";
import OlvidePassword from "./paginas/publicArea/OlvidePassword";
import NuevaPassword from "./paginas/publicArea/NuevaPassword";

import AdministrarPacientes from "./paginas/privateArea/AdministrarPacientes";
import EditarPerfil from "./paginas/privateArea/EditarPerfil";
import CambiarPassword from "./paginas/privateArea/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path="registrar" element={<Registrar/>} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
              <Route path="olvide-password" element={<OlvidePassword/>} />
              <Route path="olvide-password/:token" element={<NuevaPassword/>} />
            </Route>

            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path="perfil" element={<EditarPerfil/>} />
              <Route path="cambiar-password" element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
