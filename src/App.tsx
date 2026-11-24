import { Navigate, Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { NotFoundPage } from './pages/NotFoundPage';

// App solo ensambla: la cabecera y las rutas. No tiene datos ni lógica.
const App = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          {/* La raíz lleva a la lista. replace evita que "atrás" vuelva a una dirección que redirige. */}
          <Route path="/" element={<Navigate to="/candidates" replace />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidates/:id" element={<CandidateDetailPage />} />
          {/* Cualquier otra dirección. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
