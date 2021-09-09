import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
// common route/page
import MainScreen from './components/mainScreen';
//students 
//routes
import HomeRoute from './components/student/routing/HomeRoute';
import ProfileRoute from './components/student/routing/ProfileRoute';
import TeachersRoute from './components/student/routing/TeachersRoute';
import UniversityRoute from './components/student/routing/UniversityRoute';
import InstructionRoute from "./components/student/routing/InstructionRoute";

//screens
import ForgotPasswordScreen from './components/student/screens/js/ForgorPasswordScreen';
import HomeScreen from './components/student/screens/js/HomeScreen';
import LoginScreen from './components/student/screens/js/LoginScreen';
import ProfileScreen from './components/student/screens/js/ProfileScreen';
import RegisterScreen from './components/student/screens/js/RegisterScreen';
import ResetPasswordScreen from './components/student/screens/js/ResetPasswordScreen';
import TeachersScreen from './components/student/screens/js/TeachersScreen';
import UniversityScreen from './components/student/screens/js/UniversityScreen';
import InstructionScreen from "./components/student/screens/js/InstructionScreen";
//teachers
//routes
import HomeRoutet from './components/teacher/routing/HomeRoute';
import ProfileRoutet from './components/teacher/routing/ProfileRoute';
import RequestRoutet from './components/teacher/routing/RequestRoute';
import StudentsRoutet from './components/teacher/routing/StudentsRoute';
import StudentUniListRoutet from './components/teacher/routing/StudentUniListRoute';
import InstructionRoutet from "./components/teacher/routing/InstructionRoute";

//screen
import ForgotPasswordScreent from './components/teacher/screens/js/ForgorPasswordScreen';
import HomeScreent from './components/teacher/screens/js/HomeScreen';
import LoginScreent from './components/teacher/screens/js/LoginScreen';
import ProfileScreent from './components/teacher/screens/js/ProfileScreen';
import RegisterScreent from './components/teacher/screens/js/RegisterScreen';
import RequestScreent from './components/teacher/screens/js/RequestScreen';
import ResetPasswordScreent from './components/teacher/screens/js/ResetPasswordScreen'
import StudentsScreent from './components/teacher/screens/js/StudentsScreen';
import StudentsUniListScreent from './components/teacher/screens/js/StudentUniListScreen';
import InstructionScreent from "./components/teacher/screens/js/InstructionScreen";
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* main screen  */}
          <Route exact path="/" component={MainScreen} />
          {/* students */}
          <HomeRoute exact path="/student/home" component={HomeScreen} />
          <ProfileRoute exact path="/student/profile" component={ProfileScreen} />
          <TeachersRoute exact path="/student/teachers" component={TeachersScreen} />
          <UniversityRoute exact path="/student/university" component={UniversityScreen} />
          <InstructionRoute exact path="/student/instruction" component={InstructionScreen} />
          <Route exact path="/student/login" component={LoginScreen}/>
          <Route exact path="/student/register" component={RegisterScreen}/>
          <Route exact path="/student/forgotpassword" component={ForgotPasswordScreen}/>
          <Route exact path="/student/passwordreset/:resetToken" component={ResetPasswordScreen}/>

          {/* teachers */}
          <HomeRoutet exact path="/teacher/home" component={HomeScreent}/>
          <ProfileRoutet exact path="/teacher/profile" component={ProfileScreent}/>
          <RequestRoutet exact path="/teacher/request" component={RequestScreent}/>
          <StudentsRoutet exact path="/teacher/students" component={StudentsScreent}/>
          <StudentUniListRoutet exact path="/teacher/studentunilist" component={StudentsUniListScreent}/>
          <InstructionRoutet exact path="/teacher/instruction" component={InstructionScreent} />
          <Route exact path="/teacher/login"  component={LoginScreent}/>
          <Route exact path="/teacher/register"  component={RegisterScreent}/>
          <Route exact path="/teacher/forgotpassword"  component={ForgotPasswordScreent}/>
          <Route exact path="/teacher/passwordreset/:resetToken"  component={ResetPasswordScreent}/>
   
        </Switch>
      </div>
    </Router>
  )
}

export default App
