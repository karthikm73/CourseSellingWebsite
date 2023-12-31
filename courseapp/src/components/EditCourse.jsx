import { useEffect, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../config.js";  // Fix the import statement
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState("No");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/admin/course/${id}`, {
          headers: {
            "authorization": "Bearer " + localStorage.getItem("token"),
          },
        });
        const fetchedCourse = response.data.course;
        setCourse(fetchedCourse);
        setAuthor(fetchedCourse.author);
        setTitle(fetchedCourse.title);
        setDescription(fetchedCourse.description);
        setPrice(fetchedCourse.price);
        setImageLink(fetchedCourse.imageLink);
        setPublished(fetchedCourse.published ? "Yes" : "No");
      } catch (error) {
        // Handle error
        console.error("Error fetching course details:", error);
      }
    }

    fetchData();
  }, [id]);

  const updateCourse = async () => {
    const response = await axios.put(`${BASE_URL}/admin/courses/${id}`,{
        title,
        description,
        price,
        author,
        imageLink,
        published
    },{
        headers:{
            "authorization": "Bearer " + localStorage.getItem("token"),
        }
    })
    navigate("/courses");
  };

  return (
    <>
      <h5>Created By : {author}</h5>
      <br></br>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <br></br><br></br>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <br></br><br></br>
      <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
      <br></br><br></br>
      <input type='text' value={imageLink} onChange={(e) => setImageLink(e.target.value)}></input>
      <br></br><br></br>
      <h5>Published</h5>
      <input type="radio" name="published" value="Yes" checked={published === "Yes"} onChange={(e) => setPublished(e.target.value)} /> Yes
      <input type="radio" name="published" value="No" checked={published === "No"} onChange={(e) => setPublished(e.target.value)} /> No

      <button onClick={updateCourse}>Update Course</button>
    </>
  );
}

export default EditCourse;
