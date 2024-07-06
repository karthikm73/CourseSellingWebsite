import { Checkbox,Typography, Button, TextField, Grid, Box , FormGroup, FormControlLabel} from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../../config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//should add a checkbox for login as admin

function Signin() {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [checked,setChecked] = useState(false);

    const navigate = useNavigate();
    let role = 'user';

    async function handlesignin(){

        if(checked){
            role = 'admin';
        }


        const response = await axios.post(`${BASE_URL}/common/signin`,{
            username,
            password,
            role
        });
        let data =response.data;
        // console.log(data);

        localStorage.setItem('token',data.token);
        if(role==='admin'){
            navigate('/admin/dashboard');
        }
        if(role==='user'){
            navigate('/user/dashboard');
        }


    }

    return (
        <>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>Signin</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',    // Full viewport width
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
                            <TextField id="email" label="Email" variant="outlined" fullWidth onChange={(e)=>setUsername(e.target.value)}/>
                        </Grid>

                        <Grid item>
                            <TextField id="password" label="Password" variant="outlined" type="password" fullWidth  onChange={(e)=>setPassword(e.target.value)} />
                        </Grid>
                        <Grid item>
                        <FormGroup>
                                <FormControlLabel 
                                    control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} 
                                    label="Login as Admin"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" fullWidth onClick={()=>handlesignin()}>Signin</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" fullWidth onClick={() => navigate('/signup')}>Don't have an account? Signup</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Signin;
