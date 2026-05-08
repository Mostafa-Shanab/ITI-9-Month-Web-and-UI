import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import "./App.css";
import { lazy, Suspense, useState } from "react";
import HomePage from "../Pages/HomePage";
// import AboutPage from "../Pages/AboutPage";
const AboutPage = lazy(() => import("../Pages/AboutPage"));
const ProfilePage = lazy(() => import("../Pages/ProfilePage"));
// import ProfilePage from "../Pages/ProfilePage";
import UsersPage from "../Pages/UsersPage";
// const UsersPage = lazy(()=> import("../Pages/UsersPage"))
import AddUserPage from "../Pages/AddUserPage";
import TaskPage from "../Pages/TaskPage";
import NotFound from "../Pages/NotFound";
import Layout from "../Pages/Layout";
import UserDetails from "../Pages/UserDetails";
import Tech from "../Pages/Tech";
import Web from "../Pages/Web";
import Mobile from "../Pages/Mobile";
import UsersContext from "../Context/Users-Context";
import {v4 as uuid} from 'uuid'
import { UsersContext2 } from "../Context/Users2-Context";

function App() {

  // const fetchUsersData = async ()=>{
  //   let res = await fetch('https://jsonplaceholder.typicode.com/users');
  //   let data = await res.json();

  //   console.log(data);

  //   return data
  // }

  const [userData, setUserData] = useState([
    {id:uuid(), name:"Ahmed", age:25},
    {id:uuid(), name:"Omar", age:28},
    {id:uuid(), name:"Aya", age:20},
    {id:uuid(), name:"Nader", age:15},
    {id:uuid(), name:"Fatma", age:10},
    {id:uuid(), name:"Ali", age:27},
  ])

  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);

    const addNewUser = (newUser)=>{
    if(counter === 2){
      setDisabled(true)
    }
    setUserData([...userData, {...newUser, id:uuid(), age: +newUser.age}])

    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
  }

  const routerCofig = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="home" replace /> },
        { path: "home", element: <HomePage /> },
        {
          path: "about",
          element: (
            <Suspense fallback={<h1>----------loooooooooooding!!</h1>}>
              <AboutPage />
            </Suspense>
          ),
        },
        { path: "profile", element: <ProfilePage /> },
        { path: "task", element: <TaskPage /> }, 
        { path: "tech", element: <Tech />, children:[
          { index:true, element: <Navigate to="mobile" replace /> }, 
          { path: "web", element: <Web /> }, 
          { path: "mobile", element: <Mobile /> }, 
        ] }, 
        { path: "users", element: <UsersPage />},
        // { path: "users", element: <UsersPage />, loader:fetchUsersData, hydrateFallbackElement:<h1>############ looooooding </h1> },
        { path: "users/add", element: <AddUserPage /> },
        { path: "users/:id", element: <UserDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
    
      {/* <UsersContext>
        <RouterProvider router={routerCofig}></RouterProvider>
      </UsersContext> */}

        <UsersContext2.Provider value={{userData, setUserData, disabled, addNewUser}}>
          <RouterProvider router={routerCofig}></RouterProvider>
        </UsersContext2.Provider>


      {/* Declarative Mode */}
      {/* <BrowserRouter>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route index element={<Navigate to="home" replace />}></Route>
            <Route path="home" element={<HomePage />}></Route>
            <Route
              path="about"
              element={
                <Suspense fallback={<h1>----------loooooooooooding!!</h1>}>
                  <AboutPage />
                </Suspense>
              }
            ></Route>
            <Route path="profile" element={<ProfilePage />}></Route>
            <Route path="task" element={<TaskPage />}></Route>
            <Route path="tech" element={<Tech />}>
              <Route index element={<Navigate to="web" replace />}></Route>
              <Route path="web" element={<Web />}></Route>
              <Route path="mobile" element={<Mobile />}></Route>
            </Route>
            <Route path="users" element={<UsersPage />}></Route>
            <Route path="users/add" element={<AddUserPage />}></Route>
            <Route path="users/:id" element={<UserDetails />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;

{
  /* <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route index element={<Navigate to='home' replace/>}></Route>
          <Route path="home" element={<HomePage/>}></Route>
          <Route path="about" element={<AboutPage/>}></Route>
          <Route path="profile" element={<ProfilePage/>}></Route>
          <Route path="task" element={<TaskPage/>}></Route>
          <Route path="users">
            <Route index element={<UsersPage/>}></Route>
            <Route path="add" element={<AddUserPage/>}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter> */
}
