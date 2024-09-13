import App from "../App";
import About from "../screens/About";
import Login from "../screens/Login";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import ToDoApp from "../screens/ToDoApp";
import ProfileComponent from "../screens/MyProfile";
import SignupComponent from "../screens/Signup";
import ForgotPasswordComponent from "../screens/ForgotPassword";
import VerifyEmail from "../screens/VerifyEmail";

export const loginRoutes = [
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
];

export const publicRoutes = [
  {
    name: "Privacy Policy",
    path: "/privacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    name: "Signup",
    path: "/signup",
    element: <SignupComponent />,
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    element: <ForgotPasswordComponent />,
  },
  {
    name: "VerifyEmail",
    path: "/verify-email",
    element: <VerifyEmail />,
  },
];

export const protectedRoutes = [
  {
    name: "Home",
    path: "/",
    element: <App />,
  },
  {
    name: "ToDo App",
    path: "/todoApp",
    element: <ToDoApp />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Profile",
    path: "/myProfile",
    element: <ProfileComponent />,
  },
];
