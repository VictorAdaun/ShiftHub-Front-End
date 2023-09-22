import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/auth/login';
import EmailLogin from './pages/auth/email-login';
import ResetPassword from './pages/auth/reset-password';
import Signup from './pages/auth/signup';
import Onboarding from './pages/auth/onboarding';
import Schedule from './pages/schedule';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}/>
      <Route path="/login/email" element={<EmailLogin />}/>
      <Route path="/login/reset-password" element={<ResetPassword />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/onboarding" element={<Onboarding/>}/>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App;