import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Components/Pages/Blog";
import HomePage from "./Components/Pages/Blog/HomePage";
import Layout from "./HOC/Layout/Layout";
import EditForm from "./Components/PagesComponent/blog/ADD/EditForm";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/edit/:id" element={<EditForm />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
