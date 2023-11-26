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
import { CompleteStatTypes } from '../assets/constants/StatTypes';

const CompletePlayerStatsTable = () => {
    const { stat } = useParams();
    const [completePlayerData, setCompletePlayerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  //   const playerData = useSelector((state) => state.playerData);
    
  //   if(playerData && playerData.data) {
  //     console.log("playerData!: ", playerData.data);
  // }

  const fetchData = () => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:8000/api/leading${stat}?season=2023-24`)
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
    console.log("completePlayerData", completePlayerData)
  },[])

  return (
    <div className="flex flex-col p-20 w-full h-full text-black">
      <div className="w-full flex flex-col ">
        <h1 className="w-full" >Scoring</h1>
        <Table className="table-auto">
          <TableBody>
            <TableRow className="">
              {
                CompleteStatTypes.map((tableColumnStat, index) => (
                  <TableCell key={index}>{tableColumnStat.Stat}</TableCell>
                ))
              }
            </TableRow>
          </TableBody>
        </Table>

        <div className="">
          <Table className="table-auto">
            <TableBody>
            {
              completePlayerData && completePlayerData.length > 0 && completePlayerData.slice(0,50).map((player, index) => (
                <TableRow key={index}>
                  {
                    CompleteStatTypes.map((statType, idx) => (
                      idx === 0 
                      ? (<TableCell className="w-10 flex pr-[104px] bg-red-400">{player.PLAYER_NAME}</TableCell>)
                      : (<TableCell key={idx}>{statType.IsDecimal ? (player[statType.Stat] ? player[statType.Stat].toFixed(1) : '') : player[statType.Stat] || ''}</TableCell>)
                    ))
                  }
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default CompletePlayerStatsTable