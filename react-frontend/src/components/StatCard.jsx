import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamLogos, getTeamLogo } from "../assets/constants/TeamLogos";

const StatCard = ({ key, stat }) => {
    const [playerData, setPlayerData] = useState([]);

    const fetchData = (stat) => {
      fetch(`http://127.0.0.1:8000/api/leading${stat}?season=2012-13`)
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
    }
  
    useEffect(() => {
        fetchData(stat.Stat);  
    }, []);
  
    useEffect(() => {
      if (playerData.length > 0) {
        console.log("Player 0", playerData[0].PLAYER_NAME);
        console.log("Player 1", playerData[1]);
      }
    }, [playerData])

  return (
    <div className="flex flex-col text-zinc-400 font-medium bg-zinc-900 outline outline-[.5px] outline-gray-500 m-4">
      <h1 className="p-3 px-4 flex outline outline-[.5px] outline-gray-500">{stat?.Stat} Per Game</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>{stat.Abbreviation}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Array.isArray(playerData) &&  playerData.slice(1,6).map((player, index) => (
                <TableRow key={index+1}>
                  <TableCell>{index+2}</TableCell>
                  <TableCell className="flex gap-4 items-center ">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center">
                        <img className="object-cover" src={getTeamLogo(player?.TEAM_ABBREVIATION)} alt={player?.TEAM_ABBREVIATION} />
                    </div>{player?.TEAM_ABBREVIATION}
                </TableCell>
                  <TableCell>{player?.PLAYER_NAME}</TableCell>
                  <TableCell>{player[stat.Abbreviation]}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StatCard;