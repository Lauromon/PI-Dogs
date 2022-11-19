import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from './pages/Landing/landing';
import HomePage from './pages/Home/home';
import DogDetail from './pages/Details/dogDetail';
import CreateForm from './pages/Create/createForm';
import Favs from './pages/Favs/favs';
import About from './pages/About/about';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/detail/:id" component={DogDetail} />
        <Route exact path="/create" component={CreateForm} />
        <Route exact path="/favs" component={Favs} />
        <Route exact path="/about" component={About} /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
