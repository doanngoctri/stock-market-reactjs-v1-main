import Footer from './components/Common/Footer';
import Home from 'components/Home';
import User from 'components/User';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import AdminPage from 'pages/AdminPage';

function App() {
  const token = useSelector(state => state.Token)
  const isAdmin = useSelector(state => state.isAdmin);
  return (
    <Router>
      {isAdmin ? <AdminPage /> : token && !isAdmin ? <User /> : <Home />}
      <Footer />
    </Router>
  );
}


export default App;
