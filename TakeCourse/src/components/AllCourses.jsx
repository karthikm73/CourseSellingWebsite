import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { Box, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [author,setAuthor] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const courses = async () => {
      const response = await axios.get(`${BASE_URL}/common/allcourses`);
      // console.log(response.data);
      setCourses(response.data);

      

    }
    const author = async () => {
      const response = await axios.get(`${BASE_URL}/common/author`);
      // console.log(response.data);
      setAuthor(response.data);
    }
    courses();
    author();

  }, [])
  return (<>
  <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>All Courses</Typography>
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={8}>

      {courses.map((course) => {
        return (
          
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card sx={{ minWidth: 345, maxWidth: 345 }} onClick={() => navigate(`/course/${course._id}`)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{minHeight:250}}
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

          

        )
      })}

    </Grid >
  </Box >

  <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>All Authors</Typography>
  <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {author.filter(author => author.img).map((author) => (
          <Grid item xs={12} sm={6} md={4} key={author.id}>
            <Card sx={{ minWidth: 345, maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={author.img}
                  alt={author.username}
                  sx={{minHeight:200}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {author.username}
                  </Typography>
                  {/* Uncomment the following line if you want to display the author's bio */}
                  {/* <Typography variant="body2" color="text.secondary">
                    {author.bio}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Box>

  </>)
}

export default AllCourses;
