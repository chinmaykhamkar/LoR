import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
//students 
//routes
import HomeRoute from './components/student/routing/HomeRoute';
import ProfileRoute from './components/student/routing/ProfileRoute';
import TeachersRoute from './components/student/routing/TeachersRoute';
import UniversityRoute from './components/student/routing/UniversityRoute';

//screens
import ForgotPasswordScreen from './components/student/screens/js/ForgorPasswordScreen';
import HomeScreen from './components/student/screens/js/HomeScreen';
import LoginScreen from './components/student/screens/js/LoginScreen';
import ProfileScreen from './components/student/screens/js/ProfileScreen';
import RegisterScreen from './components/student/screens/js/RegisterScreen';
import ResetPasswordScreen from './components/student/screens/js/ResetPasswordScreen';
import TeachersScreen from './components/student/screens/js/TeachersScreen';
import UniversityScreen from './components/student/screens/js/UniversityScreen';

//teachers
//routes
import HomeRoute from './components/teacher/routing/HomeRoute';
import ProfileRoute from './components/teacher/routing/ProfileRoute';
import RequestRoute from './components/teacher/routing/RequestRoute';
import StudentsRoute from './components/teacher/routing/StudentsRoute';
import StudentUniListRoute from './components/teacher/routing/StudentUniListRoute';

//screen
import ForgotPasswordScreen from './components/teacher/screens/js/ForgorPasswordScreen';
import HomeScreen from './components/teacher/screens/js/HomeScreen';
import LoginScreen from './components/teacher/screens/js/LoginScreen';
import ProfileScreen from './components/teacher/screens/js/ProfileScreen';
import RegisterScreen from './components/teacher/screens/js/RegisterScreen';
import RequestScreen from './components/teacher/screens/js/RequestScreen';
import ForgotPasswordScreen from './components/teacher/screens/js/ResetPasswordScreen';
import StudentsScreen from './components/teacher/screens/js/StudentsScreen';
import StudentsUniListScreen from './components/teacher/screens/js/StudentUniListScreen';


const App = () => {
  return (
    <div>
      
    </div>
  )
}

export default App
