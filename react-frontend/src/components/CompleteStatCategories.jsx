import React from 'react'

const CompleteStatCategories = () => {
  return (
    <div className="flex flex-col w-screen pt-28 px-16 text-gray-300 bg-zinc-900 pb-4">
        <h1 className="font-bold text-4xl">NBA Leaders</h1>
        <ul className="flex mt-6 gap-6 text-gray-400 font-light tracking-wide">
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Player Leaders</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Team Leaders</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Player Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Team Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Fantasy Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Live Leaders</li>
        </ul>
    </div>
  )
}

export default CompleteStatCategories