import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import Loader from '../../components/Loader';
import { ArrowRightAltOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { companyLogin } from '@/api';
import { usePageBuilder } from '@/contexts/PageBuilderContext';

const LoginPage = () => {
  const { getAndSetJobsFilters } = usePageBuilder();
  const [loading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate=useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await companyLogin(companyName);
      if(res.success){
        navigate(`/app/${res.data.slug}/edit`);
        getAndSetJobsFilters();
      }else{
        setError(res.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    } catch (err: unknown) {
      setError('Login failed. Please try again.');
      console.error(err);
      setLoading(false);
    }
  }


  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="bg-gray-100 w-100 h-75 border border-gray-300 rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Login</h1>
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-80">
          <div className="w-full">
            <TextField
              id="company-name"
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            {/* For showing error messages */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className='p-3! relative'
          >
            continue
            <span className='absolute right-4'>
              {loading ?<Loader size={20} />: <ArrowRightAltOutlined />}
            </span>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage