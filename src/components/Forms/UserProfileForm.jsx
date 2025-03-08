import React, { useState } from 'react';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import camera from '../../assets/camera.svg'
import { updateProfile } from '../../api/auth';
import { useAuth, useChat } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import LoadingPattren from '../Loader/LoadingPattren';


const UserProfileForm = () => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [loadingPatt, setLoadingPatt] = useState(false)
  const { fetchChatList } = useChat()
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const SetImageShow = () => {
    return (
      <>
        {
          previewUrl ?
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div> :
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src={camera}
                alt="Profile Preview"
                className="mt-2 w-12 pb-3 object-cover rounded-full"
              />
            </div>
        }

      </>
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', user.uid);
    formData.append('name', name);
    formData.append('profile_picture', profilePicture);

    console.log('Form Data is ', name, profilePicture);
    console.log('form data is given by ', FormData);

    try {
      setLoadingPatt(true);


      const response = await updateProfile(formData)
      const Profile = response?.profile
      login({ ...user, ...Profile, login: true })

      await fetchChatList()
      navigate('/chat/messages')
    } catch (error) {
      setLoadingPatt(false)
    } finally {
      setLoadingPatt(false)
    }



  };

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-5">
      {
        loadingPatt &&
        <LoadingPattren />
      }
      <p className="text-center text-md text-gray-700 mt-6">
        Please provide your name and optional profile photo.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full gap-3 flex-col items-center max-w-80">
        <Input
          type="file"
          id="profilePicture"
          accept="image/*"
          name="profilePicture"
          label={<SetImageShow />}
          onChange={handleProfilePictureChange}
          className="w-full hidden border-b-[1.5px] text-gray-600 border-[#017d66] pb-1 focus:outline-none"
        />
        <Input
          type="text"
          name="value"
          value={name}
          onChange={handleNameChange}
          placeholder='Enter your name here'
          className="block w-full border-b-[1.5px] text-gray-600 border-[#017d66] pb-1 focus:outline-none"
        />

        <Button
          type='Submit'
          className='rounded-full text-sm bg-[#005d4c] font-normal text-white w-28 mt-auto py-2 absolute bottom-4 left-[50%] -translate-x-1/2'
          text="Next" />
      </form>
    </div>
  );
};

export default UserProfileForm;
