import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Cursor } from 'mongoose';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';


function Navigation() {
  const token = localStorage.getItem('token');
  

  const [username,setUsername] = useState('');
  const [role,setRole] = useState('');

  useEffect(() => {
    
    const getUsername = async () => {
      const response = await axios.get(`${BASE_URL}/common/me`, {
        headers: {
          "authorization": `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUsername(data.username);
      setRole(data.role);
    }

    getUsername();
    

  }, []);


  const navigate = useNavigate();
    return (

        <>
         <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" >
        <Toolbar >
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: 'pointer' }} onClick={() => navigate('/') }>
            TakeCourse.com
          </Typography>
          { !token && <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
          }
          {!token && <Button color="inherit" onClick={() => navigate('/signin')}>Sigin</Button>}
          {role ==='admin' && <Button color="inherit" onClick={() => navigate(`/admin/editprofile/${username}`)}>Edit Profile</Button>}
          {role ==='admin' && <Button color="inherit" onClick={() => navigate('/admin/addcourse')}>Add Course</Button>}
          {role === 'admin' && <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>}
          {role === 'user' && <Button color="inherit" onClick={() => navigate('/user/dashboard')}>Dashboard</Button>}
          {token && <Button color="inherit" onClick={() => {localStorage.removeItem('token');window.location.reload()}}>Logout</Button>}
          
        </Toolbar>
      </AppBar>
    </Box>



        
        </>
        
    )
}

export default Navigation;