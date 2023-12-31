
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from "../config.js";
import { Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function CreateCourse(){
    const [author, setAuthor] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [imageLink,setimageLink] = useState("");
    const [published,setPublished] =useState("No");

    const navigate = useNavigate();

useEffect( ()=>{
    async function username(){
        const response = await axios.get(`${BASE_URL}/admin/me`,{
            headers :{
                'authorization':"Bearer " + localStorage.getItem('token')
            }
        })
        setAuthor(response.data.username);
        
        
    
    }
    username();
    
} 

,[])

async function createcourse(){
    const response = await axios.post(`${BASE_URL}/admin/courses`,{
        title,
    description,
    price,
    author,
    imageLink,
    published
    },{
        headers :{
            'authorization':"Bearer " + localStorage.getItem('token')
        }
    });
    alert(response.data.message)
    navigate('/courses');
}


return (
    <>
   <h3>Creating new Course </h3>
   <h5>Created By : {author}</h5>
   <br></br>
  
    <input type='text' placeholder='title' onChange={(e)=>setTitle(e.target.value)}></input>
    <br></br><br></br>
    <input type='text' placeholder='Description' onChange={(e)=>setDescription(e.target.value)}></input>
    <br></br><br></br>
    <input type='number' placeholder='price' onChange={(e)=>setPrice(e.target.value)}></input>
    <br></br><br></br>
    <input type='text' placeholder='imageLink' onChange={(e)=>setimageLink(e.target.value)}></input>
    <br></br><br></br>
    <h5>Published</h5>
    <input type="radio" name="published" value="Yes"  onChange={(e)=>setPublished(e.target.value)}/> Yes
    <input type="radio" name="published" value="No" defaultChecked onChange={(e)=>setPublished(e.target.value)} /> No
    
    <button onClick={()=>createcourse()}>Create Course</button>


    </>
)


}


export default CreateCourse;
