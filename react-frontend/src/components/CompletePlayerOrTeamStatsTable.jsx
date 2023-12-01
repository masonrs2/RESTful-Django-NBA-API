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
import CompleteTeamStatsTable from './CompleteTeamStatsTable';

const CompletePlayerOrTeamStatsTable = () => {
    const { stat, tableType } = useParams();
    const [completePlayerOrTeamData, setCompletePlayerOrTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  //   const playerData = useSelector((state) => state.playerData);
  //   if(playerData && playerData.data) {
  //     console.log("playerData!: ", playerData.data);
  // }
  const fetchData = (statType) => {
    setIsLoading(true);
  
    let endpoint = tableType.slice(0, -1);

    console.log("endpoint: ", endpoint)
    
    if (endpoint === "team" && statType === "PPG") {
      statType = 'PTS'
    }
    console.log("statType**: ", statType)
    const url = `http://127.0.0.1:8000/api/${endpoint}LeadingStats?stat=${statType}`
    
    if (url) {
      console.log("url: ", url)

      fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(fetchedData => {
        if(endpoint === "team") {
          setCompletePlayerOrTeamData(fetchedData)
        } else  {
          const parsedData = JSON.parse(fetchedData);
          setCompletePlayerOrTeamData(parsedData);  
        }
        
      })
      .catch(error => {
        console.log('Fetch error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
      }
    
  }

  useEffect(() => {
    fetchData(stat);
    console.log("completePlayerDataaaa: ", completePlayerOrTeamData)
  },[tableType])

  return (
    isLoading ? (<div>Loading...</div>) :
    tableType === "players" ? (<CompletePlayerStatsTable stat={stat} completePlayerData={completePlayerOrTeamData} />) : (<CompleteTeamStatsTable stat={stat} completeTeamData={completePlayerOrTeamData} />)
    )
  }

  export default CompletePlayerOrTeamStatsTable;