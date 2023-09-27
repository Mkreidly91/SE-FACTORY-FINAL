import { useEffect, useState } from 'react';
import EditProfileForm from '../../../components/Forms/EditProfileForm';
import { getUserInfo } from '../../../api/user.api';

const EditProfile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo();
      console.log(res);
      if (res) {
        setUser(res);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="mt-20 w-full p-5">
      {user && <EditProfileForm initialValues={user} />}
    </div>
  );
};

export default EditProfile;
