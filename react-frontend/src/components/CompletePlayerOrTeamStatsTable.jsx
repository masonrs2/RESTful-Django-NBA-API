import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompleteStatTypes, GetStatName } from '../assets/constants/StatTypes';
import CompletePlayerStatsTable from './CompletePlayerStatsTable';

const CompletePlayerOrTeamStatsTable = () => {
    const { stat, tableType } = useParams();
    const [completePlayerData, setCompletePlayerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  //   const playerData = useSelector((state) => state.playerData);
    
  //   if(playerData && playerData.data) {
  //     console.log("playerData!: ", playerData.data);
  // }
  const fetchData = () => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:8000/api/playerLeadingStats?stat=${stat}`)
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(fetchedData => {
      const parsedData = JSON.parse(fetchedData);
      setCompletePlayerData(parsedData);
    })
    .catch(error => {
      console.log('Fetch error:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
    console.log("completePlayerData", stat)
    console.log("type: ", tableType)
  },[])

  return (
    isLoading ? (<div>Loading...</div>) :
    tableType === "players" ? (<CompletePlayerStatsTable stat={stat} completePlayerData={completePlayerData} />) : (<div>Team Stats</div>)
    )
  }

  export default CompletePlayerOrTeamStatsTable;