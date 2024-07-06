import { Box, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/mycourses`, {
          headers: {
            "authorization": "Bearer " + token,
          },
        });

        const data = response.data;
        console.log(data);
        setCourses(data.courses);
        console.log("courses", data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCourses([]);
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <>
      {courses.length === 0 ? (
        <>
          <Typography variant="h4">No Courses Purchased</Typography>
          <Button onClick={() => navigate('/')} variant="contained">Browse Courses</Button>
        </>
      ) : (
        <>
          <Typography variant="h4">Your Purchased Courses</Typography>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={4}>
              {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <Card sx={{ minWidth: 345, maxWidth: 345 }} onClick={() => navigate(`/course/${course._id}`)}>
                    <CardActionArea>
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
                          {course.author?.name}
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
          </Box>
        </>
      )}
    </>
  );
}

export default UserDashboard;
