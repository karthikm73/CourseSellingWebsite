xs (extra-small): Typically for small devices like mobile phones (0px to 599px).
sm (small): For larger mobile devices and small tablets (600px to 959px).
md (medium): For tablets and small laptops (960px to 1279px).
lg (large): For desktops and larger laptops (1280px to 1919px).
xl (extra-large): For large desktop screens (1920px and up).

<Grid container spacing={4}>
          
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card sx={{ minWidth: 345, maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(`/course/${course._id}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{ minHeight: 250 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                    {role === 'user' && (
                      <Button onClick={() => purchaseCourse(course._id)}>Purchase Course</Button>
                    )}
                    {role === 'admin' && authorname === course.name && (
                      <Button onClick={() => navigate(`/admin/editcourse/${course._id}`)}>Edit Course</Button>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          
        </Grid>







        single
        import { Box, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

function SingleCourse() {
  const [course, setCourse] = useState([]);
  const [role, setRole] = useState('user'); // Example role; replace with actual role from your auth logic
  const [authorname, setAuthorname] = useState(''); // Example author name; replace with actual author name from your auth logic
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleRedirect = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

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
        setAuthorname(data.name);
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
    console.log('Course purchased:', courseId);
    // Implement your purchase logic here
  };

  return (
    <>
      <Typography variant="h4">Your Purchased Courses</Typography>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">{course.title}</Typography>
        <br></br>
        <Typography variant="subtitle1">Author: {authorname}</Typography>
        <br></br>
        <Typography variant="subtitle1">{course.description}</Typography>
        <img src={`${course.image}`} style={{ width: '300px' }} alt={course.title} />
        <Typography variant="subtitle1">Price: {course.price}</Typography>

        {role === 'user' && (
          <Button onClick={() => purchaseCourse(course._id)}>Purchase Course</Button>
        )}

        {role === 'admin' && authorname === course.name && (
          <Button onClick={() => navigate(`/admin/editcourse/${course._id}`) }variant="contained">Edit Course</Button>
        )}

        
      </Box>
    </>
  );
}

export default SingleCourse;
