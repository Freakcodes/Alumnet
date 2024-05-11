import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PrivateRoutes } from "./routes/ProtectedRoute";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import EditProfileAlumni from "./pages/EditProfileAlumni";
import Ask from "./pages/Ask";
function App() {
  const {user}=useAuth();
    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="" element={<Home/>} />
        <Route element={<PrivateRoutes/>} >
         <Route path='/feed' element={<Feed/>} />
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/ask' element={<Ask/>}/>
        <Route path='/profile/student' element={<EditProfile/>}/>
        <Route path='/profile/alumni' element={<EditProfileAlumni/>}/>
         
         
       
        
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
    
  
}

export default App;
