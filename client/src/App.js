import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notification from './pages/Notification';
import UserList from './pages/Admin/UserList';
import DoctorList from './pages/Admin/DoctorList';
import Profile from './pages/Doctor/Profile';
import BookAppointments from './pages/BookAppointments';
import Appointment from './pages/Appointment';
import DoctorAppoinments from './pages/Doctor/DoctorAppoinments';



function App() {
  const { loading } = useSelector((state) => state.alert);
    return (
      <BrowserRouter>
      {loading && (<div className='spinner-parent'>
          <div className="spinner-border" role='status'>

          </div>
      </div>)}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/login' element={<PublicRoute><Login></Login></PublicRoute>}></Route>
          <Route path='/register' element={<PublicRoute><Register></Register></PublicRoute>}></Route>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>}></Route>
          <Route path='/notifications' element={<ProtectedRoute><Notification /></ProtectedRoute>}></Route>
          <Route path='/users' element={<ProtectedRoute><UserList /></ProtectedRoute>}></Route>
          <Route path='/doctors' element={<ProtectedRoute><DoctorList /></ProtectedRoute>}></Route>
          <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointments /></ProtectedRoute>}></Route>
          <Route path='/appointments' element={<ProtectedRoute><Appointment /></ProtectedRoute>}></Route>
          <Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppoinments /></ProtectedRoute>}></Route>






        </Routes>
      </BrowserRouter>

  );
}

export default App;
