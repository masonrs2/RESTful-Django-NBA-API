import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react" 
import { LeadingStats } from "../assets/constants/StatTypes";


export const StatsLeadingCards = () => {
  const [playerData, setPlayerData] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/leadingScorers?season=2012-13')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(fetchedData => {
      setPlayerData(JSON.parse(fetchedData))
    })
    .catch(error => {
      console.log('Fetch error:', error);
    });

  }, []);

  useEffect(() => {
    if (playerData.length > 0) {
      console.log("Player 0", playerData[0].PLAYER_NAME);
      console.log("Player 1", playerData[1]);
    }
  }, [playerData])

  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-20 px-2">
        {
          LeadingStats.map((stat, index) => (
            <div key={index} className="flex flex-col text-zinc-400 font-medium bg-zinc-900">
              <h1 className="p-3 px-4 flex outline outline-[.5px] outline-gray-500">{stat?.Stat}</h1>

              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead>PPG</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                       {
                          Array.isArray(playerData) &&  playerData.map((player, index) => (
                            <TableRow key={index}>
                              <TableCell>{index+1}</TableCell>
                              <TableCell>{player?.TEAM_ABBREVIATION}</TableCell>
                              <TableCell>{player?.PLAYER_NAME}</TableCell>
                              <TableCell>{player?.PTS}</TableCell>
                            </TableRow>
                          ))
                        }
                    
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))
        }
    </div>
  )
}
