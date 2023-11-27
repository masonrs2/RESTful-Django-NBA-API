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
    const { stat, tableType } = useParams();
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
    <div className="flex flex-col  w-full h-full text-black">
      <div className=" flex w-screen flex-col px-16 ">
        <div className="flex mb-8 flex-col mt-28  bg-zinc-900 w-screen ">
          <h1 className=" flex text-4xl font-semibold tracking-wide " >{stat}</h1>
          <ul className="flex mt-6 gap-6 text-gray-400 font-light tracking-wide">
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Player Leaders</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Team Leaders</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Player Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Team Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Fantasy Stats</li>
            <li className="cursor-pointer hover:text-blue-600 active:text-blue-500">Live Leaders</li>
        </ul>
        </div>
        <div className="bg-zinc-900 outline outline-gray-500 outline-[.5px]">
          <h1 className="p-3 px-5 flex outline outline-[.5px] outline-gray-500">{stat} Per Game</h1>
          <Table className="table-auto bg-zinc-90 outline outline-[.5px] outline-gray-500">
            <TableBody className="">
              <TableRow className="flex outline outline-gray-500 outline-[.5px] hover:bg-zinc-800/60">
                {
                  CompleteStatTypes.map((tableColumnStat, index) => (
                    index === 0 
                    ? (
                      <TableCell key={index} className="flex-1 w-[260px]"><p className="w-[260px]">{tableColumnStat.Stat}</p></TableCell>
                    )
                    : (
                      <TableCell key={index} className="flex-1">{tableColumnStat.Stat}</TableCell>
                    )

                    
                  ))
                }
              </TableRow>
            </TableBody>
          </Table>
        </div>

<div className="outline outline-gray-500 outline-[.5px]">
  <Table className="table-auto bg-zinc-900 outline outline-gray-500 outline-[.5px]">
    <TableBody className="">
    {
      completePlayerData && completePlayerData.length > 0 && completePlayerData.slice(0,50).map((player, index) => (
        <TableRow key={index} className="flex hover:bg-zinc-800/60">
          {
            CompleteStatTypes.map((statType, idx) => (
              idx === 0 
              ? (<TableCell className="flex-1">
                    <p className="flex gap-4 items-center font-light w-[230px]">
                      {player?.PLAYER_NAME} 
                      <div className="flex flex-row gap-1">
                        ({player?.AGE}) 
                        <p>•</p> {player?.TEAM_ABBREVIATION}
                      </div>
                    </p>
                  </TableCell>
                )
              : (<TableCell key={idx} className="flex-1">{statType.IsDecimal ? (player[statType.Stat] ? player[statType.Stat].toFixed(1) : '') : player[statType.Stat] || 'n/a'}</TableCell>)
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