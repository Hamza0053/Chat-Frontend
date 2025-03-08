import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/Login';
import Chat from '../pages/Chat';
import Welcome from '../pages/auth/Welcome';
import UserProfileForm from '../components/Forms/UserProfileForm';
import ChatScreen from '../pages/views/ChatScreen';
import Calls from '../pages/views/Calls';
import Status from '../pages/views/Status';



const AppRouter = () => {
  const { user } = useAuth();

  const PrivateRoute = () => {
    console.log('user in UseAuth is ', user);

    return user ? <Outlet /> : <Navigate to="/welcome" />;
  };

  const PublicRoute = () => {
    return user?.isLogin ? <Navigate to="/chat/messages" /> : <Outlet />;
  };


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/chat" element={<Chat />}>
            <Route path='messages' element={<ChatScreen />} />
            <Route path="calls" element={<Calls />} />
            <Route path="status" element={<Status />} />
          </Route>

          <Route path="/profile" element={<UserProfileForm />} />
        </Route>
        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
};



export default AppRouter;
