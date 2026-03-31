import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/index';
import Dashboard from './pages/Dashboard';
import AtleetPagina from './pages/AtleetPagina';
import PubliekePagina from './pages/PubliekePagina';
import MethodePagina from './pages/MethodePagina';

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isPublic = location.pathname.startsWith('/p/');

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1L12 6.5L6.5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 6.5H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight text-base">
            {t('app_name')}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {!isPublic && (
            <>
              <Link to="/" className="text-sm text-slate-400 hover:text-slate-100 transition-colors font-medium">
                {t('nav_athletes')}
              </Link>
              <Link to="/methode" className="text-sm text-slate-400 hover:text-slate-100 transition-colors font-medium">
                {t('nav_method')}
              </Link>
            </>
          )}
          <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => i18n.changeLanguage('nl')}
              className={`px-3 py-1.5 transition-colors ${
                i18n.language === 'nl'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              NL
            </button>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-3 py-1.5 transition-colors ${
                i18n.language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/atleet/:id" element={<AtleetPagina />} />
          <Route path="/p/:id" element={<PubliekePagina />} />
          <Route path="/methode" element={<MethodePagina />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
