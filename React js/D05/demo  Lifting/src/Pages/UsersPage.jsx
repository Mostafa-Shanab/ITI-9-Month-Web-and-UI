

import Users from '../Components/Users'

const UsersPage = ({userData, setUserData}) => {

  // let userData =  useLoaderData();
  // // console.log(x);
  return (
    <>
      {/* <Users userData={userData}></Users> */}
      <Users userData={userData} setUserData={setUserData}></Users>
    </>
  );
}

export default UsersPage;
