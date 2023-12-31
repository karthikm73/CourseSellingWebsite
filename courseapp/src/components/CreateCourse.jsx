
import axios from 'axios';
import { useEffect,useState } from 'react';
import { BASE_URL } from "../config,js";
import { Radio } from '@mui/material';


function CreateCourse(){
    const [author, setAuthor] = useState("");
     // title: String,
// description: String,
// price: Number,
// author: String,
// imageLink: String,
// published: Boolean
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [imageLink,setimageLink] = useState("");
    const [published,setPublished] =useState("No");


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
    
    <button>Create Course</button>


    </>
)


}


export default CreateCourse;
