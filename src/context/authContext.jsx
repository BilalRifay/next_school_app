import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'Users', firebaseUser.email);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          setUser({
            email: userSnapshot.data().email,
            role: userSnapshot.data().role,
            adminApproval: userSnapshot.data().adminApproval,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  const registerOrLogin = async ({ email, password, role = null }) => {
    try {
      const userDocRef = doc(db, "Users", email);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          email,
          role,
          adminApproval: false,
          uid: null,
          username: email.split('@')[0]
        });

        alert('Account created! Please wait for admin approval.');
        return;
      }

      const userData = userSnapshot.data();

      if (!userData.adminApproval) {
        alert('Admin approval is pending.');
        return;
      }

      if (userData.adminApproval && !userData.uid) {
        alert('Admin approved! Completing registration... login again');

        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          const currentUser = result.user;
          await setDoc(userDocRef, { uid: currentUser.uid }, { merge: true });

          const userDetailsRef = doc(db, userData.role, email);
          const userDetailsSnapshot = await getDoc(userDetailsRef);
          if (userDetailsSnapshot.exists()) {
            const userDetails = userDetailsSnapshot.data();
            setUser({
              ...userData,
              ...userDetails,
              adminApproval: true,
            });

            alert('Registration completed! You can now log in.');
            navigate(`/${userData.role}`);
          } else {
            console.error('User details not found in the role collection.');
            alert('User details not found.');
          }
        } catch (error) {
          console.error('Error completing registration:', error);
          alert('Failed to complete registration.');
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        const userDetailsRef = doc(db, "Users", email);
        const userDetailsSnapshot = await getDoc(userDetailsRef);

        if (userDetailsSnapshot.exists()) {
          const userDetails = userDetailsSnapshot.data();
          setUser({
            ...userDetails,
            adminApproval: true,
          });

          navigate(`/${userDetails.role}`);
        } else {
          console.error('User details not found in the Users collection.');
          alert('User details not found.');
        }
      }
    } catch (error) {
      console.error('Login/Registration failed:', error);
      alert('Login/Registration failed.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      console.error("Password reset failed:", error);
      alert('Failed to send password reset email.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerOrLogin, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
