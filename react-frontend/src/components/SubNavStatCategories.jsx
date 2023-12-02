import React from 'react'
import { StatsNavList } from '../assets/constants/StatsNavList'
import { Link } from 'react-router-dom'

  const SubNavStatCategories = () => {
  return (
    <div className="flex flex-col w-screen pt-28 text-gray-300 bg-zinc-900 pb-4 border-b-[.1px] border-b-gray-500/40 px-16 md:px-20 lg:px-24 xl:px-32 2xl:px-48">
        <h1 className="font-bold text-4xl">NBA Leaders</h1>
        <ul className="flex mt-6 gap-6 text-gray-400 font-light tracking-wide">
          {
            StatsNavList.map((stat, index) => (
              
              <Link key={index} to={{
                pathname: `${stat.path}`,
              
              }}>
                <li key={index} 
                    className="cursor-pointer hover:text-blue-600 active:text-blue-500">
                      {stat.name}
                </li>
              </Link>
            
            ))
          }
        </ul>
    </div>
  )
}

export default SubNavStatCategories