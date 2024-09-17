import { Box, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

function SingleCourse() {
  const [course, setCourse] = useState([]);
  const [role, setRole] = useState('user'); 
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleRedirect = async () => {
      const token = localStorage.getItem('token');
      

      if (!token) {
        alert('signin first');
        navigate('/signin');
        return;
      }

      // Send request to /me and get the role
      try {
        const response = await axios.get(`${BASE_URL}/common/me`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });
        const data = response.data;
        // console.log(data);
        setRole(data.role);
        setAuthor(data.username);

      } catch (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      // Fetch the specific course
      try {
        const response = await axios.get(`${BASE_URL}/common/course/${id}`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });

        const data = response.data;
        // console.log(data); used for debugging
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    handleRedirect();
  }, [id, navigate]);

  const purchaseCourse = (courseId) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      alert('signin first');
      navigate('/signin');
      return;
    }

    try {
      axios
        .put(`${BASE_URL}/user/purchase/${courseId}`, {}, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert('Course purchased successfully');
          navigate('/user/dashboard');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error purchasing course:', error);
        });
    } catch (error) {
      console.error('Error purchasing course:', error);
    }
  }

  console.log(course);

    return (
      <>
        <Typography variant="h4">Your Purchased Courses</Typography>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5">{course.title}</Typography>
          <br></br>
          {/* <Typography variant="subtitle1">Author: {author}</Typography> */}
          <br></br>
          <Typography variant="subtitle1">{course.description}</Typography>
          <img src={`${course.image}`} style={{ width: '300px' }} alt={course.title} />
          <Typography variant="subtitle1">Price: {course.price}</Typography>

          {role === 'user' && (
            <Button onClick={() => purchaseCourse(course._id)}>Purchase Course</Button>
          )}

          {role === 'admin' && (
            <Button onClick={() => navigate(`/admin/editcourse/${course._id}`)} variant="contained">Edit Course</Button>
          )}


        </Box>
      </>
    );
  }


  export default SingleCourse;
