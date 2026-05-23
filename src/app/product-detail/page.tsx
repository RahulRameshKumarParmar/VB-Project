'use client'

import { useProductStore } from "@/store/useProductStore";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaStar, FaTruck } from "react-icons/fa";
import { MdVerified, MdAssignmentReturn } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuDot } from "react-icons/lu";

export default function ProductDetailPage() {

  const router = useRouter();
  const getSingleProduct = useProductStore((state) => state.getSingleProduct);//Function
  const singleProductDetail = useProductStore((state) => state.singleProductDetail);
  console.log(singleProductDetail);

  useEffect(() => {
    const clickedID = JSON.parse(localStorage.getItem("clickedID") || "null");
    getSingleProduct(clickedID);
  }, [])

  // Calculate Discounted Price
  let discountedPrice = 0;
  let fixedDiscountPrice = 0;
  if (singleProductDetail !== null) {
    discountedPrice = (singleProductDetail?.price) * singleProductDetail?.discountPercentage / 100;
    fixedDiscountPrice = parseInt(discountedPrice.toFixed(2));
  }

  return (
    singleProductDetail !== null ?
      (
        <div className="p-5">

          {/* Back to Products Button */}
          <div>
            <Button
              sx={{ border: '2px solid gray', display: 'flex', alignItems: 'center', gap: 1, borderRadius: '20px', }}
              onClick={() => router.push('/products')}>
              <IoIosArrowRoundBack color='black' size={20} />
              Back to Products
            </Button>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-[35%_65%] mt-5 border border-gray-400 p-5 rounded-2xl">

            {/* Product Image */}
            <div className='border border-gray-400 p-5 rounded-lg w-fit h-fit m-auto md:m-0'>
              <img src={singleProductDetail?.thumbnail} alt={singleProductDetail?.title} className=" md:w-full object-cover" />
            </div>

            {/* Product Information */}
            <div className='p-5 text-center md:text-left'>
              <h1 className="text-4xl font-500">{singleProductDetail?.title}</h1>
              <p className='mt-2'>Brand: <strong>{singleProductDetail?.brand}</strong></p>

              {/* Rating and Stock */}
              <div className='mt-3 flex items-center justify-center md:justify-start gap-2'>
                <FaStar className='text-yellow-500' />
                <span>{singleProductDetail?.rating}</span>
                <LuDot />
                <span>{singleProductDetail?.stock} in stock</span>
              </div>

              {/* Price Information */}
              <div className='mt-5 flex items-center justify-center md:justify-start gap-3 sm:gap-5 w-full'>
                <span className="text-3xl sm:text-4xl font-600">${(singleProductDetail.price - fixedDiscountPrice).toFixed(2)}</span>
                <span className="text-xl sm:text-2xl font-bold line-through">${singleProductDetail?.price}</span>
                <div className="bg-green-800 px-2 py-1 rounded-3xl text-white text-xs sm:text-[1rem] font-bold">- {singleProductDetail?.discountPercentage} %</div>
              </div>

              {/* line design */}
              <div className='w-full border border-gray-200 mt-5 mb-5'></div>

              <div>
                {singleProductDetail?.description}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-5">
                {/* Shipping Information */}
                <div className='border border-gray-400 p-5 rounded-lg flex justify-start gap-3 w-[74vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw]'>
                  <div>
                    <FaTruck size={20} color='blue' />
                  </div>
                  <div className='flex flex-col items-start gap-1'>
                    <span>Shipping</span>
                    <span>{singleProductDetail?.shippingInformation}</span>
                  </div>
                </div>

                {/* Warranty Information */}
                <div className='border border-gray-400 p-5 rounded-lg flex gap-3 w-[74vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw]'>
                  <div>
                    <MdVerified size={20} color='blue' />
                  </div>
                  <div className='flex flex-col items-start gap-1'>
                    <span>Warranty</span>
                    <span>{singleProductDetail?.warrantyInformation}</span>
                  </div>
                </div>

                {/* Return Policy */}
                <div className='border border-gray-400 p-5 rounded-lg flex gap-3 w-[74vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw]'>
                  <div>
                    <MdAssignmentReturn size={20} color='blue' />
                  </div>
                  <div className='flex flex-col items-start gap-1'>
                    <span>Returns</span>
                    <span>{singleProductDetail?.returnPolicy}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className='border border-gray-400 p-5 rounded-lg flex gap-3 w-[74vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw]'>
                  <div>
                    <SiHomeassistantcommunitystore size={20} color='blue' />
                  </div>
                  <div className='flex flex-col items-start gap-1'>
                    <span>Availability</span>
                    <span>{singleProductDetail?.availabilityStatus}</span>
                  </div>
                </div>
              </div>

              {/* Size Details */}
              <div className="border border-gray-400 p-5 rounded-lg w-[74vw] md:w-[53vw] lg:w-[51vw] flex items-center flex-col ">
                <div>Dimensions (W x H x D)</div>
                <div className='flex items-center gap-2 mt-2'>{singleProductDetail?.dimensions.width} x {singleProductDetail?.dimensions.height} x {singleProductDetail?.dimensions.depth}
                  <LuDot />
                  Weight: {singleProductDetail?.weight} kg
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      :
      (
        <div>
          No product details available.
        </div>
      )
  )
}