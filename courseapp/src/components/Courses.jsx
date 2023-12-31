import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import axios from 'axios';
import {Card} from '@mui/material'
import { useNavigate } from "react-router-dom";

function Courses(){

    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();
    

    try{

        useEffect(
            ()=>{
                async function fetchData(){

                    const response = await axios.get(`${BASE_URL}/admin/courses`,
                    {headers : {
                        "authorization": "Bearer " + localStorage.getItem("token")
                    }});
               setCourses(response.data.courses);
        
                    };
                    fetchData();
            }
           
            
        ,[])
        
    }
    catch(error){
        if(error.response.status === 401){
            console.log(error.response.message);
        }
    }

return (
    <>
   <button onClick={() => navigate('/createcourse')}>Create New Course</button>

     {courses.map((course)=>{
        return <Course course={course} />
        
    })}
    
    </>
)


}



function Course(props){
    const navigate = useNavigate();

    function edit (id){
        navigate('/course/'+id);

    }
    return(
        <>
        <Card >
        <h3>{props.course.title}</h3>
        <h6>{props.course.description}</h6>
        <h6>{props.course.price}</h6>
        <img src={props.course.imageLink} style={{width: 100}}></img>
        <br></br>
        <button onClick={()=>edit(props.course._id)}>Edit Course</button>
        </Card>
        <br></br>
        
        
        </>
    )
}

export default Courses;