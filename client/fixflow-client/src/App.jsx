import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import router from "./router";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;