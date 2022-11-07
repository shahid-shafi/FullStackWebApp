import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import CustomRouter from './components/CustomRouter/CustomRouter';
import Header from './components/Header/Header';
import Loader from './components/Loaders/Loader';

function App() {

  // const token = localStorage.getItem("token");
  //api call token. token authorize. user Authorized
  return (
    <div className="App">
      <Router>
        <Header />
        <CustomRouter />
      </Router>
    </div>
  );
}

export default App;
