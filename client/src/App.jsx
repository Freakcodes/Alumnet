import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PrivateRoutes } from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";

import Feed from "./pages/Feed";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/MyProfile";
import EditProfileAlumni from "./pages/EditProfileAlumni";
import Ask from "./pages/Ask";
import Search from "./pages/Search";
import PostSection from "./components/ShowPost";
import AuthLayout from "./pages/AuthLayout";
import Error from "./pages/Error";
import { useEffect } from "react";
import AlumniProfile from "./pages/AlumniProfile";
import Post from "./pages/Post";
import ShowPost from "./components/ShowPost";
import ShowFeed from "./pages/ShowFeed";

function App() {
  const userType = localStorage.getItem('userType');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="" element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="" element={<Feed />}>
          <Route path="search" element={<Search />} />
            {userType === "student" && (
              <>
                <Route path="feed" element={<ShowFeed />} />
                <Route path="myprofile" element={<Profile />} />
                <Route path="/search/profile/:id" element={<AlumniProfile />} />
                <Route path="edit/student" element={<EditProfile />} />
              </>
            )}
            {userType === "alumni" && (
              <>
                
                
                <Route path="feed" element={<ShowFeed />} />
                <Route path="post" element={<Post />} />
                <Route path="edit/alumni" element={<EditProfileAlumni />} />
              </>
            )}
            
            
            <Route path="*" element={<Error />} />
          </Route>
          
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/ask" element={<Ask />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;