import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Divider, Input } from 'antd';

const EditPost = (props) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        subject: props.subject,
        body: props.body,
        image: props.image,
        video: props.video
      });

      const updateState = e => setState({
        ...state,
        [e.target.name]: e.target.value
      });

      const submitFormHandler = e => {
        // e.preventDefault()
        console.log('form submit works');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/forum/edit/${props.forumId}`,{
          subject: state.subject,
          body: state.body,
          image: state.image,
          video: state.video
        } ,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        } )
          .then(axiosResponse => {
            console.log(axiosResponse.data);
            navigate(`/forum/${props.forumId}`)
            
          })
          .catch(err => console.log(err))
      }

    return(
        <>
    <div>
    <h1>Edit your post:</h1>
     <form onSubmit={submitFormHandler}>

         <label>Subject: </label>
         <Input name="subject" value={state.subject} placeholder="" onChange={updateState}/>

         <label>Body: </label>
         <Input name="body"  value={state.body} onChange={updateState}/>

         <label>Image:</label>
         <Input name="image"  value={state.image} onChange={updateState}/>
          
          <label>Video:</label>
          <Input name="video" value={state.video} onChange={updateState}/>
       

        <button className="customBttn" role="button">Edit</button>
     
     </form>
  </div>
    </>
    )
}

export default EditPost;