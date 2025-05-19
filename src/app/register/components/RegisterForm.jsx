'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // <-- import useRouter
import { FaUser, FaEnvelope, FaLock, FaImage, FaSpinner } from 'react-icons/fa';
import { registerUser } from '@/app/action/auth/registerUser';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // <-- initialize router

  const imgbbApiKey = 'ec0fdcea3e71115db6d53c28044fd152';

  const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );

    return data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    if (!image) {
      toast.error('Please select an image');
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await imageUpload(image);
      const result = await registerUser({ name, email, password, imageUrl });

      if (result?.success) {
        toast.success('Registration Successful!');
        form.reset();
        router.push('/');  // <-- redirect after success
      } else {
        toast.error(result?.message || 'Registration failed.');
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-[#3972C1] mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <div className="flex items-center border rounded-md px-3">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              className="w-full py-2 focus:outline-none"
              placeholder="Enter your name"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="flex items-center border rounded-md px-3">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              className="w-full py-2 focus:outline-none"
              placeholder="example@mail.com"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Upload Image</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaImage className="text-gray-500 mr-2" />
            <input
              type="file"
              accept="image/*"
              name="image"
              className="w-full"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="flex items-center border rounded-md px-3">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              className="w-full py-2 focus:outline-none"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3972C1] text-white py-2 rounded-md hover:bg-[#2f5ea4] transition flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && (
            <FaSpinner className="animate-spin text-white text-lg" />
          )}
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-[#3972C1] hover:underline">
          Please login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
