import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Register from "../pages/Register";
import FileDetails from "../pages/FileDetails";
import EditFile from "../pages/EditFile";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile"; 

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />

        <Route
          path="/files/:id"
          element={
            <PrivateRoute>
              <FileDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-file/:id"
          element={
            <PrivateRoute>
              <EditFile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
