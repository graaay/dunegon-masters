import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HomePage from '../pages/Home';
import Combat from '../pages/Combat';
import CharactersForm from '../pages/Characters';
import TablesList from '../pages/Tables/TableList';
import TablesForm from '../pages/Tables/TableForm';
import Authentication from '../pages/Authentication';
import { useAuth } from '../contexts/AuthContext';
import { AuthService }  from './authenticate';

const AuthenticatedRoutes = () => (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '10px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/Home" element={<HomePage />} />
          {/* <Route path="/Characters" element={<CharactersPage />} /> */}
          <Route path="/Characters/:mesaId" element={<CharactersForm />} />
          <Route path="/Characters/:mesaId/:personagemId" element={<CharactersForm />} />
          <Route path="/Tables" element={<TablesList />} />
          <Route path="/Tables/new" element={<TablesForm />} />
          <Route path="/Tables/edit/:mesaId" element={<TablesForm />} />
          <Route path="/Combat/:mesaId" element={<Combat />} />
        </Routes>
      </main>
    </div>
);

const NoAuthenticatedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Authentication />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

const Routers = () => {
    const { user, getToken } = useAuth();
    console.log(getToken());
    return (
        <>
            <AuthService>
                <Routes>

                    {!user ? <Route path="*" element={<NoAuthenticatedRoutes />} /> : null}
                    
                    {user ? <Route path="*" element={<AuthenticatedRoutes />} /> : null}
                </Routes>
            </AuthService>
        </>
    )
}

export { Routers }