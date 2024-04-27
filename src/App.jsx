
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Client from "./Client";
import Admin from "./Admin";
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="page-holder">
        <Header />
          <Routes>
            <Route path="*" element={<Client />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        <Footer />
      </div>
  </BrowserRouter>
  );
}

export default App;
