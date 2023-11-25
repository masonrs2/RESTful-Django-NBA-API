import React from 'react'
import { useParams } from 'react-router-dom';

const PlayerStatsTable = () => {
    const { stat } = useParams();
  return (
    <div>PlayerStatsTable</div>
  )
}

export default PlayerStatsTable