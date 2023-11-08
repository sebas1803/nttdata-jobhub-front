import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </div>
  );
}

export default App;
