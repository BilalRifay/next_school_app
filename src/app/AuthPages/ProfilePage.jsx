import { User2Icon } from 'lucide-react';  // Ensure this icon exists in lucide-react
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useAuth } from '../context/authContext';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn-primary">
          <User2Icon />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="p-4">
            {user ? (
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username || user.email.split('@')[0] || 'N/A'}</p>
                <p><strong>Role:</strong> {user.role || 'N/A'}</p>

                {/* Display data only for admin */}
                {user.role === 'admin' && (
                  <div>
                    <p><strong>Name:</strong> {user.name || 'Admin'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                )}

                {/* Display data for students */}
                {user.role === 'student' && (
                  <div>
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Class:</strong> {user.className || 'N/A'}</p>
                    <p><strong>Section:</strong> {user.sectionName || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {user.dateOfBirth || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {user.bloodGroup || 'N/A'}</p>
                  </div>
                )}

                {/* Display data for teachers */}
                {user.role === 'teacher' && (
                  <div>
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                    <p><strong>Age:</strong> {user.age || 'N/A'}</p>
                    <p><strong>Contact Number:</strong> {user.contactNumber || 'N/A'}</p>
                    <p><strong>Qualifications:</strong> {user.qualifications?.join(', ') || 'N/A'}</p>
                    <p><strong>Subjects Can Teach:</strong> {user.subjectsCanTeach?.join(', ') || 'N/A'}</p>
                  </div>
                )}

                <Button
                  onClick={logout}
                  className="btn-secondary mt-4"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePage;
