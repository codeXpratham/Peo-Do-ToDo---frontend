import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import TodoItems from '../components/TodoItems';
import { Context, server } from '../main';

const Home = () => {
  
  const [title , setTitle ]  = useState("");
  const [description , setDescription] = useState("");
  const [loading , setLoading ]  = useState(false);
  const [tasks , setTask ]  = useState([]);
  const [refresh , setRefresh] = useState(false);

  const { isAuthenticated, } = 
    useContext(Context);

  const updateHandler = async (id) => {
    
    try {
       const {data} =await axios.put(`${server}/task/${id}` , {} , {
        withCredentials : true,
       });

       toast.success(data.message);
       setRefresh(prev => !prev );
    } catch (error) {
       toast.error(error.resposnse.data.message);
    }

    //  toast.success(id);
  };
  const deleteHandler = async (id) => {
        // toast.error(id);
        try {
       const {data} =await axios.delete(`${server}/task/${id}`  , {
        withCredentials : true,
       });

       toast.success(data.message);
       setRefresh(prev => !prev );
    } catch (error) {
       toast.error(error.resposnse.data.message);
    }

     toast.success(id);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`${server}/task/new` , { 
        title , description
      },{
        withCredentials : true,
        headers : {
           "Content-Type": "application/json"
        }
      });
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh(prev => !prev );

    } catch (error) {
      toast.error(error.resposnse.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
     
     axios.get(`${server}/task/myTask` , {
      withCredentials : true,
     }).then((res) => {
        console.log(res.data.tasks);
        setTask(res.data.tasks);
     }).catch((e) => {
        toast.error(e.resposnse.data.message);
     })
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
       
       <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="Text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="Text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <button disabled={loading}  type="submit">
            Add task
          </button>
        </form>
      </section>
    </div>
     <section className="todosContainer">
       {
      tasks.map((task) => {
       return <TodoItems 
       title={task.title} 
       description = {task.description}
       isComplete={task.isComplete}
       updateHandler = {updateHandler}
       deleteHandler = {deleteHandler}
       id = {task._id}
       key = {task._id}

       /> 

        })

     }
     </section>
     
    </div>
  )
}

export default Home