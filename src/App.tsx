import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/auth/login';
import EmailLogin from './pages/auth/email-login';
import Dashboard from './pages/dashboard';
import DashboardLayout from './layouts/dashboard';
import Schedules from './pages/dashboard/schedule/schedules';
import ShiftSwaps from './pages/dashboard/schedule/shift-swaps';
import TimeOff from './pages/dashboard/schedule/time-off';
import Availability from './pages/dashboard/schedule/availability';
import Employees from './pages/dashboard/team/employees';
import Engagement from './pages/dashboard/team/engagement';
import Task from './pages/dashboard/task';
import Drafts from './pages/dashboard/task/drafts';
import TaskDetails from './pages/dashboard/task/task-details';
import TaskList from './pages/dashboard/task/task-list';
import AssignTask from './pages/dashboard/task/assign-task';
import View from "./pages/dashboard/task/view";
import Report from './pages/dashboard/report';
import Settings from './pages/dashboard/settings';
import Profile from './pages/dashboard/settings/profile';
import Security from './pages/dashboard/settings/security';
import Privacy from './pages/dashboard/settings/privacy';
import Plans from './pages/dashboard/settings/plans';
import Notifications from './pages/dashboard/settings/notifications';
import Compliance from './pages/dashboard/settings/compliance';

import ResetPassword from './pages/auth/reset-password';
import Signup from './pages/auth/signup';
import Onboarding from './pages/auth/onboarding';
import SingleSchedule from './pages/dashboard/schedule/single-schedule';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/login/email" element={<EmailLogin />} />
      <Route path="/login/reset-password" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Dashboard */}
      <Route path='/' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/schedule' element={<Outlet />}>
          <Route index element={<Navigate to="schedules" replace />} />
          <Route path='schedules' element={<Schedules />} />
          <Route path='schedules/:schedule' element={<SingleSchedule />} />
          <Route path='shift-swaps' element={<ShiftSwaps />} />
          <Route path='time-off' element={<TimeOff />} />
          <Route path='availability' element={<Availability />} />
        </Route>
        <Route path='/team' element={<Outlet />}>
          <Route path='employees' element={<Employees />} />
          <Route index element={<Navigate to="employees" replace />} />
          <Route path='employees' element={<Employees />} />
          <Route path='engagement' element={<Engagement />} />
        </Route>
        <Route path='/task' element={<Task />} />
        <Route path='/task/drafts' element={<Drafts />} />
        <Route path='/task/view' element={<View />} />
        <Route path='/task/create-task' element={<Outlet />}>
          <Route path='task-details' element={<TaskDetails />} />
          <Route index element={<Navigate to="task-details" replace />} />
          <Route path='task-list' element={<TaskList />} />
          <Route path='assign-task' element={<AssignTask />} />
        </Route>
        <Route path='/report' element={<Report />} />
        <Route path='/settings' element={<Outlet />}>
          <Route path='general' element={<Settings />} />
          <Route index element={<Navigate to="general" replace />} />
          <Route path='profile' element={<Profile />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='plans' element={<Plans />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='security' element={<Security />} />
          <Route path='compliance' element={<Compliance />} />
        </Route>
      </Route>
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