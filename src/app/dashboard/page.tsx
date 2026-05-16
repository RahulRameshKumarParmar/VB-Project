"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { useUserStore } from "@/store/useUserStore";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import { HiHandRaised } from "react-icons/hi2";
import { MdGroup } from "react-icons/md";

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const getAuthUser = useAuthStore((state) => state.getAuthUser);
  const updateIsAuthenticated = useAuthStore(
    (state) => state.updateIsAuthenticate,
  );
  const currentUser = useAuthStore((state) => state.currentUser);
  const getUsers = useUserStore((state) => state.getUsers);
  const allUsers = useUserStore((state) => state.allUser);
  const limitedUsers = allUsers.slice(0, 5);
  const getProducts = useProductStore((state) => state.getProducts);
  const allProducts = useProductStore((state) => state.allProducts);
  const limitedProducts = allProducts?.slice(0, 5);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    getAuthUser();
    updateIsAuthenticated();
    getUsers();
    getProducts();
  }, []);

  return (
    <div className="bg-gray-100 p-5">
      <Typography sx={{ fontSize: 32, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }} variant="h1">
        Welcome back, {currentUser?.firstName} <HiHandRaised />
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Here's what's happening with your account today.
      </Typography>

      {/* Total Counts of Users and Products */}
      <div className="flex items-center justify-around mt-5 pt-5 mb-5">
        <div className="flex items-center justify-center gap-4 border border-gray-400 rounded-xl p-2.5 bg-white">
          <div>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">208</Typography>
          </div>
          <div>
            <MdGroup className="bg-blue-600 text-white p-2 rounded-full" size={45} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 border border-gray-400 rounded-xl p-2.5 bg-white">
          <div>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">194</Typography></div>
          <div>
            <FaShoppingBag className="bg-green-800 text-white p-2 rounded-full" size={45} />
          </div>
        </div>
      </div>

      {/* Recent Products & Users */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full ">

        {/* Recent Users */}
        <div className="w-[85vw] lg:w-[47vw] h-[85vh] bg-white p-5 rounded-2xl mb-5 lg:mb-auto">
          <div className="flex items-center justify-between px-5 mb-5 pb-5">
            <h3 className="font-bold">Recent Users</h3>
            <button
              onClick={() => router.push('/users')}
              className="text-blue-600 font-bold cursor-pointer">
              View all
            </button>
          </div>

          {/* List of 5 Users */}
          {limitedUsers.map((user) => (
            <div className="flex items-center justify-between mt-4" key={user.id}>
              <div className="flex items-center ">
                {/* Image */}
                <div className="flex items-end justify-center">
                  <img className="w-1/2" src={user?.image} alt={`${user?.firstName} image`} />
                </div>
                {/* User Details */}
                <div className="flex flex-col gap-1">
                  <span>{user?.firstName + " " + user?.lastName}</span>
                  <span>{user?.email}</span>
                </div>
              </div>
              {/* User Company */}
              <div className="w-[14vw] md:w-[16vw] lg:w-[9vw] h-[5vh] truncate border border-gray-400 rounded-xl px-2">
                {user?.company.name}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="w-[85vw] lg:w-[47vw] h-[85vh] bg-white p-5 rounded-2xl">
          <div className="flex items-center justify-between px-5 mb-5 pb-5">
            <h3 className="font-bold">Recent Products</h3>
            <button
            onClick={() => router.push('/products')}
              className="text-blue-600 font-bold cursor-pointer">
              View all
            </button>
          </div>

          {/* List of 5 Products */}
          {limitedProducts.map((product) => (
            <div className="flex items-center justify-between mt-4" key={product.id}>
              <div className="flex items-center gap-5">
                {/* Image */}
                <div className="flex items-center justify-center">
                  <img className="w-[11vw] md:w-[8vw] lg:w-[5vw]" src={product?.thumbnail} alt={`${product?.title} image`} />
                </div>
                {/* Product Details */}
                <div className="flex flex-col gap-1">
                  <span>{product?.title}</span>
                  <div className="flex items-center gap-2">
                    <span>${product?.price.toFixed(2)}</span>
                    <span className="flex items-center gap-1"> <FaStar className="text-yellow-400"/> {product?.rating}</span>
                  </div>
                </div>
              </div>
              {/* Product Company */}
              <div className="w-[12vw] lg:w-[7vw] h-[6vh] border border-gray-400 rounded-2xl text-center pt-1">
                {product?.tags[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
