import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();
    const [adminApproval, setAdminApproval] = useState(null);

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, "Users", user.email);
            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setAdminApproval(docSnapshot.data().adminApproval);
                } else {
                    setAdminApproval(false);
                }
            });
            return () => unsubscribe();
        }
    }, [user]);

    if (user === null) {
        return <div>Loading...</div>;
    }

    if (adminApproval === null) {
        return <div>Loading admin approval...</div>;
    }

    if (allowedRoles.includes(user.role) && adminApproval) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
