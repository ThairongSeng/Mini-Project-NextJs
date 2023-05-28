import User from '@/components/User';
import React from 'react'

export async function fetchUsers() {
    const resp = await fetch("https://api.escuelajs.co/api/v1/users?limit=8",{cache:"no-store"});
    return resp.json();
  }
  
export default async function Users() {
    const users = await fetchUsers();
    return (
    <div className="flex min-h-screen flex-col items-center">
        <h1 style={{fontSize:"30px",color:"green",fontWeight:"bold",marginTop:"20px",marginBottom:"30px"}}>All Users</h1>
      <div className="flex min-h-screen flex-wrap items-center justify-evenly gap-6">
          {users.map((user) => (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              avatar={user.avatar}            
            />
          ))

          }
      </div>
    </div>
  )
}
