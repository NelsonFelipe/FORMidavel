import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop

import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import EditForm from './pages/EditForm';
import FormsList from './pages/FormsList';
import ViewForm from './pages/ViewForm';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThankYou from './pages/ThankYou';
import './App.css';

const EditFormWrapper = () => {
  const { id } = useParams();
  return <EditForm formId={id} />;
};

const ViewFormWrapper = () => {
  const { id } = useParams();
  return <ViewForm formId={id} />;
};

const ThankYouWrapper = () => {
  const { id } = useParams();
  return <ThankYou formId={id} />;
};

function App() {
  return (
    <>
      <ScrollToTop /> {/* Render ScrollToTop here */}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/forms" element={<FormsList />} />
          <Route path="/edit/:id" element={<EditFormWrapper />} />
          <Route path="/form/:id" element={<ViewFormWrapper />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/thank-you/:id" element={<ThankYouWrapper />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocus draggable pauseOnHover theme="colored" />
    </>
  );
}

export default App;
