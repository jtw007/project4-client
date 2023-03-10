import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'

// project route imports
import Inventory from './components/pages/Inventory'
import Search from './components/pages/Search'
import Create from './components/pages/Create'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        {currentUser && <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />}

        {/* if logged in, navbar will display */}

      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome 
              currentUser={currentUser}
              handleLogout={handleLogout}
            />}
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/inventory"
            element={<Inventory currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/search"
            element={<Search currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/create"
            element={<Create currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />



          <Route 
            path="/profile"
            element={<Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
