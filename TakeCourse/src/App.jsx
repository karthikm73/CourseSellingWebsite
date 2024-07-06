import Navigation from './components/Navigation.jsx';
import './App.css';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminDashboard from './components/AdminDashboard.jsx';
import AllCourses from './components/AllCourses.jsx';
import SingleCourse from './components/SingleCourse.jsx'
import UserDashboard from './components/UserDashboard.jsx';
import EditCourse from './components/EditCourse.jsx';
import EditProfile from './components/EditProfile.jsx';


function App() {
  return (
    <BrowserRouter >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navigation />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
          }}
        >
          <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/editcourse/:id" element={<EditCourse />} />
            <Route path="/admin/editprofile/:username" element={<EditProfile />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/course/:id" element={<SingleCourse />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
