import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";

//student pages
import StudentDashboard from "./pages/student/Dashboard";
import ReportIssue from "./pages/student/ReportIssue";
import MyComplaints from "./pages/student/MyComplaints";
import ComplaintDetails from "./pages/student/ComplaintDetails";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";

//admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminComplaints from "./pages/admin/Complaints";
import AdminComplaintDetails from "./pages/admin/ComplaintDetails";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminNotifications from "./pages/admin/Notifications";
import AdminProfile from "./pages/admin/Profile";

//staff pages
import StaffDashboard from "./pages/staff/Dashboard";
import MyAssignedComplaints from "./pages/staff/MyAssignedComplaints";
import StaffComplaintDetails from "./pages/staff/ComplaintDetails";
import StaffNotifications from "./pages/staff/Notifications";
import StaffProfile from "./pages/staff/Profile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/student/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/student/report-issue",
        element: <ReportIssue />,
      },
      {
        path: "/student/my-complaints",
        element: <MyComplaints />,
      },
      {
        path: "/student/my-complaints/:id",
        element: <ComplaintDetails />,
      },
      {
        path: "/student/notifications",
        element: <Notifications />,
      },
      {
        path: "/student/profile",
        element: <Profile />,
      },

      // Admin
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/complaints",
        element: <AdminComplaints />,
      },
      {
        path: "/admin/complaints/:id",
        element: <AdminComplaintDetails />,
      },
      {
        path: "/admin/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/notifications",
        element: <AdminNotifications />,
      },
      {
        path: "/admin/profile",
        element: <AdminProfile />,
      },

      // Staff
      {
        path: "/staff/dashboard",
        element: <StaffDashboard />,
      },
      {
        path: "/staff/complaints",
        element: <MyAssignedComplaints />,
      },
      {
        path: "/staff/complaints/:id",
        element: <StaffComplaintDetails />,
      },
      {
        path: "/staff/notifications",
        element: <StaffNotifications />,
      },
      {
        path: "/staff/profile",
        element: <StaffProfile />,
      },
    ],
  },
]);

export default router;