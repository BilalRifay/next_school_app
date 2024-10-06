'use client'

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, deleteUser, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebase';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const auth = getAuth();

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'Users')); 
    setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const approveUser = async (id) => {
    await updateDoc(doc(db, 'Users', id), { adminApproval: true });
    fetchUsers();
  };

  const removeAdminApproval = async (id) => {
    await updateDoc(doc(db, 'Users', id), { adminApproval: false });
    fetchUsers();
  };

  const rejectUser = async (user) => {
    
    await deleteDoc(doc(db, 'Users', user.id));
    if (currentUser === user.uid) {
      const authUser = auth.currentUser;
      if (authUser && authUser.uid === user.uid) {
        await deleteUser(authUser); 
      }
    }

    fetchUsers();
  };

  const checkCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
    checkCurrentUser();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search users by username or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <h2 className="text-xl font-semibold">Admin Approved Users</h2>
      {filteredUsers.filter(user => user.adminApproval).map(user => (
        <Card key={user.id} className="mt-4">
          <CardContent className="flex justify-between items-center flex-col md:flex-row">
            <div>
              <h3 className="font-semibold text-xl">{user.username} ({user.email})</h3>
              <p>Role: {user.role}</p>
              <p>Status: {currentUser === user.uid ? "Currently Logged In" : "Offline"}</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => removeAdminApproval(user.id)}>Remove Admin Approval</Button>
              <Button variant="destructive" onClick={() => rejectUser(user)}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-xl font-semibold mt-6">Pending Users</h2>
      {filteredUsers.filter(user => !user.adminApproval).map(user => (
        <Card key={user.id} className="mt-4">
          <CardContent className="flex justify-between items-center flex-col md:flex-row">
            <div>
              <h3 className="font-semibold text-xl">{user.username} ({user.email})</h3>
              <p>Role: {user.role}</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => approveUser(user.id)}>Approve</Button>
              <Button variant="destructive" onClick={() => rejectUser(user)}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserManagement;