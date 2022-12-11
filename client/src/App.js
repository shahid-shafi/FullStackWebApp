import axios from 'axios';
import './App.scss';
import AuthContext from './store/auth-context';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomRouter from './components/CustomRouter/CustomRouter';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({})

  const Authentication = async () => {
    // setLoading(true);

    try {
      const res = await axios({
        method: 'POST',
        url: `http://localhost:3000/api/v1/user/check-authentication/${token}`,
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (res.data.result === 'success') {
        let data = res.data.user

        setIsLoggedIn(res.data.isAuthanticated)
        setCurrentUser(data)
        setTimeout(() => {
          navigate('/user')
        }, 0)
      }
    } catch (error) {
      alert(error)
    }
    // setLoading(false);
  }

  useEffect(() => {
    if (token) {
      Authentication();
    } else {
      setIsLoggedIn(false)
      navigate('/login')
    }
  }, [token]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser }}>
        <Header />
        <CustomRouter />
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
