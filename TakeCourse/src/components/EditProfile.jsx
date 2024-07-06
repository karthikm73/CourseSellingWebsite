import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Typography, Button, TextField, Grid, Box, InputAdornment } from "@mui/material";

function EditProfile() {
  const { username } = useParams();
  const [admin, setAdmin] = useState({});
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const getProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/admin/${username}`, {
          headers: {
            "authorization": "Bearer " + token,
          },
        });
        const data = response.data;
        setAdmin(data);
        setName(data.username); // Update state with fetched data
        setPassword(data.password); // Update state with fetched data
        setImg(data.image); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();
  }, [username]);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const payload = {
      username: name || admin.username,
      password: password || admin.password,
      image: img || admin.image,
    };

    console.log('Updating profile with payload:', payload);

    try {
      const response = await axios.put(`${BASE_URL}/admin/admin/${username}`, payload, {
        headers: {
          "authorization": "Bearer " + token,
        },
      });
      const data = response.data;
      console.log('Profile updated successfully:', data);
      alert("Profile updated successfully");
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }

  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '75%',
            maxWidth: '500px',
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Grid container spacing={2} direction="column" rowSpacing={4}>
            <Grid item>
              <TextField
                id="title"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name} // Updated to use 'name' state
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="description"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password} // Updated to use 'password' state
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="price"
                label="Image"
                variant="outlined"
                type="text"
                fullWidth
                onChange={(e) => setImg(e.target.value)}
                value={img} // Updated to use 'img' state
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </Grid>

            <Grid item>
              <Button variant="contained" fullWidth onClick={updateProfile}>Update Profile</Button>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
