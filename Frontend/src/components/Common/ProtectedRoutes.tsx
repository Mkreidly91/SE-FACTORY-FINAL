import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/api.helpers';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const info = getUser();
    if (!info.token) {
      navigate('/');
    } else {
      setRender(true);
    }
  }, []);
  return render && children;
};

export default ProtectedRoute;
