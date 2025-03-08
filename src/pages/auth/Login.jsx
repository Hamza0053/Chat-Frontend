import { useEffect, useState } from 'react';
import { loginUser } from '../../api/auth';
import { useAuth, useLoading } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button'
 



const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  // const [loading, setLoading] = useState(false)
  const { setLoading } = useLoading()
  
  // useEffect(() => {
  //   if (user) {
  //     navigate('/chat');
  //   }
  // }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError('Password must have 6 characters.');
    }

    if (email && password) {
      setLoading(true)
      try {
        const userData = await loginUser(email, password);

        if (userData?.success) {
          
          login(userData);
          navigate('/profile');
        }
      } catch (err) {
        setEmailError(err.message || 'Login failed');
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-white w-screen p-4">

      <div className="bg-white w-full text-center flex flex-col  items-center gap-8">
        <div className="mt-2">
          <h2 className="text-[#017d66] text-xl font-semibold">
            Enter your Email & Password.
          </h2>
          <p className="text-center text-sm text-gray-700 mt-6">
            WhatsApp will need to verify your phone <br />number. Carrier charges may apply. <span className="text-[#00876e] font-semibold">What's my <br />number?</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className='w-full max-w-80 flex flex-col items-center justify-start gap-5'>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full border-b-[1.5px] text-gray-600 border-[#017d66] pb-1 focus:outline-none"
            error={emailError}
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="block w-full border-b-[1.5px] text-gray-600 border-[#017d66] pb-1 focus:outline-none"
            error={passwordError}
          />
          <Button
            type='submit'
            className='rounded-full text-sm bg-[#005d4c] font-normal text-white mt-auto py-2 absolute bottom-4 left-4 right-4'
            text="Next" />
        </form>
      </div>
    </div>
  );
};

export default Login;
