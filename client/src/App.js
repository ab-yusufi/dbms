import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PSignUp from "./auth/PSignUp/PSignUp";
import SignIn from "./auth/SignIn/SignIn";
import HSignUp from "./auth/HSignUp/HSignUp";
import Home from "./auth/Home";
import Patient from "./auth/Patient/Patient";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/p/signup" component={PSignUp} />
        <Route exact path="/h/signup" component={HSignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/patient/dashboard" component={Patient} />
        {/* <Route exact path="/hospital/dashboard" component={SignIn} /> */}
        {/* <Route exact path="/service/create" component={SignIn} /> */}
        {/* <Route exact path="/booking/create" component={SignIn} /> */}
      </Switch>
    </Router>
  );
}

export default App;
