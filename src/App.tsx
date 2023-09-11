import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/login';
import EmailLogin from './pages/auth/email-login';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}/>
      <Route path="/login/email" element={<EmailLogin />}/>
    </>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;