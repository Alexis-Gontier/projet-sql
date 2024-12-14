import { Outlet } from 'react-router-dom';
import flowersImage from '../assets/images/flowers.webp';

export default function AuthLayout() {
  return (
    <main className="min-h-screen grid grid-cols-2 ">
      <div className="w-full h-screen flex justify-center items-center">
        <Outlet />
      </div>

      <div className="w-full h-screen p-5">
        <img
          src={flowersImage}
          alt="bouquet of flowers"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </main>
  );
}
