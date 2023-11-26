import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CompletePlayerStatsTable = () => {
    const { stat } = useParams();
    const location = useLocation();
    const playerData = useSelector((state) => state.playerData);
    

    console.log("playerData: ", playerData);
    if(playerData) {
        console.log("playerData!: ", playerData);
    }

  return (
    <div className="flex pt-20 w-screen h-screen bg-red-200 text-black">PlayerStatsTable</div>
  )
}

export default CompletePlayerStatsTable