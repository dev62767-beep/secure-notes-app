import React from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/users',
             { withCredentials: true } 
        );
        
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    }
   const getNotes = async () =>{
    try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/notes',
             { withCredentials: true } 
        );
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error.response?.data || error.message);
      }
   }
   
  return (
    <div className='flex gap-2 justify-center align-center'>
      <h2 className='font-bold font-4xl'>Admin Console</h2>

      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2  rounded-lg transition gap-2" onClick={getUsers}>View All Users</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition gap-2" onClick={getNotes}>View All Notes</button>
    </div>
  );
};

export default AdminPanel;