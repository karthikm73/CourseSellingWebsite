import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { Checkbox, Typography, Button, TextField, Grid, Box, FormGroup, FormControlLabel } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

function EditCourse() {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const updateCourse = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        try {
            const response = await axios.put(`${BASE_URL}/admin/course/${id}`, {
                title,
                description,
                image,
                price,
                isPublished: active
            }, {
                headers: {
                    "authorization": "Bearer " + token,
                }
            });
            let data = response.data;
            console.log(data);
            alert("Course updated");
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteCourse = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }
        const response = axios.delete(`${BASE_URL}/admin/course/${id}`, {
            headers: {
                "authorization": "Bearer " + token,
            }
        });
        alert("Course deleted");
        navigate('/admin/dashboard');
    }

    useEffect(() => {
        const handleRedirect = async () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if (!token) {
                window.location.href = '/signin';
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/common/course/${id}`, {
                    headers: {
                        "authorization": "Bearer " + token,
                    },
                });

                const data = response.data;
                setCourse(data);
                setTitle(data.title || '');
                setDescription(data.description || '');
                setImage(data.image || '');
                setPrice(data.price || '');
                setActive(data.isPublished || false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        handleRedirect();
    }, [id]);

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
                                label="Title" 
                                variant="outlined" 
                                fullWidth 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField 
                                id="description" 
                                label="Description" 
                                variant="outlined" 
                                type="text" 
                                fullWidth  
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="price" 
                                label="Price" 
                                variant="outlined" 
                                type="text" 
                                fullWidth  
                                onChange={(e) => setPrice(e.target.value)} 
                                value={price} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <FormGroup>
                                <FormControlLabel 
                                    control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />} 
                                    label="Publish the course?" 
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" fullWidth onClick={updateCourse}>Update Course</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" fullWidth onClick={deleteCourse}>Delete Course</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default EditCourse;
