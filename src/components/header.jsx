import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Context, server } from '../main';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Peo-Do</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;


// const Header = () => {
//   const { isAuthenticated, setIsAuthenticated, loading , setLoading } = useContext(Context);
  
//   const logoutHandler = async (e) => {
    
//     setLoading(true);

//     try {
//       await axios.get(
//         `${server}/users/logout`,
//         {
          
//           withCredentials: true,
//         }
//       );

//       toast.success("logged out successfully");
//       setIsAuthenticated(false);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setLoading(false);
//       setIsAuthenticated(true);
//     }
//   };




//   console.log("isAuthenticated:", isAuthenticated);

//   return (
//     <nav className='header'>
//       <div>
//         <h2>Todo App, by Pratham</h2>
//       </div>
//       <article>
//         <Link to={'/'}>Home</Link>
//         <Link to={'/profile'}>Profile</Link>

//         {
//           isAuthenticated ? <button disabled = {loading} className='btn' onClick={logoutHandler}>Logout</button> :
//           <Link to={'/login'}>Login</Link>
//         }

//         {/* <button className='btn'>Logout</button> */}
//         {/* <Link to={'/login'}>Login</Link> */}
//       </article>
//     </nav>
//   );
// };

// export default Header;
