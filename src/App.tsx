import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/index';
import HomePage from './pages/Home/index';
import Combat from './pages/Combat/index';
import CharactersForm from './pages/Characters/index';
import TablesList from './pages/Tables/TableList/index';
import TablesForm from './pages/Tables/TableForm/index';
import GlobalStyle from './App';



function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '10px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Combate/:mesaId" element={<HomePage />} />

              {/* <Route path="/Characters" element={<CharactersPage />} /> */}
              <Route path="/Characters/:mesaId" element={<CharactersForm />} />

              <Route path="/Tables" element={<TablesList />} />
              <Route path="/Tables/new" element={<TablesForm />} />
              <Route path="/Tables/edit/:mesaId" element={<TablesForm />} />
              <Route path="/Combat/:mesaId" element={<Combat />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;