import Checkbox from '@mui/material/Checkbox';
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../../config';

function CreateCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [active, setActive] = useState(false);

    async function handlesubmit() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        console.log(token);

        try {
            const response = await axios.post(`${BASE_URL}/admin/createcourse`, {
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
            window.location.reload();
            
        } catch (error) {
            console.error('Error creating course:', error);
        }
    }

    return (
        <div>
            <TextField id="title" label="Title" variant="outlined" fullWidth onChange={(e) => setTitle(e.target.value)} />
            <TextField id="description" label="Description" variant="outlined" fullWidth onChange={(e) => setDescription(e.target.value)} />
            <TextField id="image" label="Image" variant="outlined" fullWidth onChange={(e) => setImage(e.target.value)} />
            <TextField id="price" label="Price" variant="outlined" fullWidth onChange={(e) => setPrice(e.target.value)} />
            <div style={{ display: "flex" }}>
                <Typography variant="h6">Publish the course?</Typography>
                <Checkbox
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <Button variant="contained" onClick={handlesubmit}>Create</Button>
        </div>
    );
}

export default CreateCourse;
