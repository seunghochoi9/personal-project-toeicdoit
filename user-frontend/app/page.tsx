'use client';

import Banner from "./component/common/module/banner";
import RecommendedCourses from "./component/common/module/recommendedCourses";
import Footer from "./component/common/module/footer";
import Reviews from "./component/common/module/review";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function Home() {
  
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(login())
// }, [])


  return  (
    
    <>
      <Banner />
      <RecommendedCourses />
      <Reviews />
      <Footer />
    </>
  );
}
