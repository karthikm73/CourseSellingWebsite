import { Typography, Box, Grid, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import CreateCourse from "../components/CreateCourse.jsx";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const token = localStorage.getItem('token');
      // console.log(token);

      if (!token) {
        window.location.href = '/signin';
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/admin/mycourses`, {
          headers: {
            "authorization": "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = response.data;
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    handleRedirect();
  }, []);

  return (
    <>
      <Typography variant="h4">Admin Dashboard</Typography>
      <br />
      <Typography variant="h6">Your Courses</Typography>
      <Box sx={{ width: '100%' }}>
        {courses.length === 0 ? (
          <Typography variant="h6">You have not created any courses yet.</Typography>
        ) : (
          <Grid container spacing={8}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card sx={{ minWidth: 250, maxWidth: 345 }} onClick={() => navigate(`/course/${course._id}`)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image}
                      alt={course.title}
                      sx={{ minHeight: 200 }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {course.author.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <br />
      <Typography variant="h4">Create a New Course</Typography>
      <CreateCourse />
    </>
  );
}

export default AdminDashboard;
