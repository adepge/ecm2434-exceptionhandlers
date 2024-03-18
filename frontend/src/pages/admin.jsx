import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "./stylesheets/admin.css";
import postimg from '../assets/admin/posts.svg';
import usersimg from '../assets/admin/users.svg';
import databaseimg from '../assets/admin/database.svg';
import DashboardCard from '../features/dashboardCard';

const Admin = () => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('posts');
    const [posts, setPosts] = useState(undefined);
    const [users, setUsers] = useState(undefined);
    const [postView, setPostView] = useState(false);
    const [activePost, setActivePost] = useState(undefined);
    const cookies = new Cookies();
    const token = cookies.get('token');
    

    const checkSuperUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/isSuperUser/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setAdmin(response.data.is_superuser);
        } catch (error) {
            console.log(error);
        }
    };

    const getPosts = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/getAllPosts/", {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
          return response.data;
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getUsers = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/getAllUsers/", {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
          return response.data;
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/deletePost/${id}`, {
                  headers: {
                      'Authorization': `Token ${token}`
                  }
              });
            alert(response.data);
          } catch (error) {
            console.error(error);
          }
    };

    const banAuthor = async (id) => {
        try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/deleteUser/${id}`, {
                  headers: {
                      'Authorization': `Token ${token}`
                  }
              });
            alert(response.data);
          } catch (error) {
            console.error(error);
          }
    };

    useEffect(() => {
        checkSuperUser();
        getPosts().then((data) => {
            setPosts(data.map(post => ({ ...post, open: false })).sort((a, b) => new Date(b.datetime) - new Date(a.datetime)));
        });
        getUsers().then((data) => {
            console.log(data);
            setUsers(data);
        });
    }, []);

    useEffect(() => {
        console.log(activePost);
    }, [activePost]);
    
    function formatDate(dateString) {
        const options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = `${date.toLocaleTimeString('en-GB', options)}`;
    
        return formattedDate;
    }

    const handleDashboardPost = (id) => {
        setActivePost(posts.find(post => post.id === id));
        setPostView(true);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div id="admin-dashboard">
                <h1 className='dashboard-title'>Admin Dashboard</h1>
                    <div id="dashboard-navbar">
                        <button type='button' onClick={() => handlePageChange('posts')} className={page == 'posts' ? "active-button dashboard-navbar-buttons" : "dashboard-navbar-buttons"}><img src={postimg}></img>Posts</button>
                        <button type='button' onClick={() => handlePageChange('users')} className={page == 'users' ? "active-button dashboard-navbar-buttons" : "dashboard-navbar-buttons"}><img src={usersimg}></img>Users</button>
                    </div>
                    {page == 'posts'  && <div id="dashboard-post-list">
                        {postView &&
                        <DashboardCard 
                            id = {activePost?.id}
                            username={activePost?.username} 
                            isSuperUser={activePost?.is_superuser}
                            image={activePost?.image} 
                            caption={activePost?.caption} 
                            datetime={activePost?.datetime} 
                            location={activePost?.position.location} 
                            userid={activePost?.userid} 
                            setPostView={setPostView} 
                            deletePost={deletePost}
                            deleteUser={banAuthor} />
                        }
                        <div id="dashboard-post-inner">
                            {!loading && posts.map((post) => {
                                return (
                                    <div className="dashboard-post" key={post.id} onClick={() => handleDashboardPost(post.id)}>
                                        <img className="dashboard-post-image" src={"http://127.0.0.1:8000" + post.image} alt={post.caption} />
                                        <div className="dashboard-post-date">
                                            {formatDate(post.datetime)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>}
                    {page == 'users'  && <div id="dashboard-user-list">
                        <table>
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Picture</th>
                                <th>Username</th>
                                <th>Bio</th>
                                <th>Twitter</th>
                                <th>Instagram</th>
                                <th>Youtube</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (<tr><td> Loading ... </td></tr>) :
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.profilePicture}</td>
                                            <td>{user.username}</td>
                                            <td>{user.bio}</td>
                                            <td>{user.twitter}</td>
                                            <td>{user.instagram}</td>
                                            <td>{user.youtube}</td>
                                            <td>
                                                <button type='button' disabled={user.is_superuser} onClick={() => banAuthor(user.id)} className="delete-button">Ban User</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>}
            </div>
        );
    }
};

export default Admin;