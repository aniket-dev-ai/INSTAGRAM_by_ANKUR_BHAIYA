import Feed from "./Post Pages/Feed";
import CreatePost from "./Post Pages/PostCreate";
import SinglePost from "./Post Pages/SinglePost";
import Login from "./User Pages/Login";
import Profile from "./User Pages/Profile";
import Register from "./User Pages/Register";

function App() {
  return (
    <div>
      <Register></Register>
      <Login/>
      <Profile/>
      <CreatePost/>
      <Feed/>
      <SinglePost/>
    </div>
  );
}

export default App;
