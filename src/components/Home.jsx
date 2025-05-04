

import React from 'react'

import Banner from './layout/Banner';
import HomeLayout from './HomeLayout';
import Filters from './layout/Filters';
import { useSearchParams } from 'react-router-dom';


const Home = () => {

    let [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || "";
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
  


  return (
    <div className="d-flex flex-column min-vh-100">
      
    
    <main className="flex-grow-1">
      {/* Banner Section */}
      {!keyword && !category && !ratings && !min && !max && 
        <div className="container mt-5">
          <Banner />
        </div>
      }
      {/* Two-Column Layout */}
      <div className="container my-5">
        <div className="row">
          {/* Sidebar - Category */}
          <div className="col-12 col-md-2 mb-4 mb-md-0">
            <h1>Our Menu</h1>
            <Filters />
          </div>

          {/* Main Content - Home */}
          <div className="col-12 col-md-10">
           <HomeLayout />
          </div>
        </div>
      </div>
    </main>

  </div>
  )
}

export default Home