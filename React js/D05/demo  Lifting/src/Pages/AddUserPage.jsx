
import AddUser from '../Components/AddUser';

const AddUserPage = ({addNewUser, disabled}) => {
  return (
    <div>
      <AddUser addNewUser={addNewUser} disabled={disabled}></AddUser>
    </div>
  );
}

export default AddUserPage;
