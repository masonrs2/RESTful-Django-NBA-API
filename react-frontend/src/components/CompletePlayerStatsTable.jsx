// PlayerStatsTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CompleteStatTypes, GetStatName } from '../assets/constants/StatTypes';

const CompletePlayerStatsTable = ({ stat, completePlayerData }) => {
    console.log("stat11: ", stat)
    console.log("completePlayerData11: ", completePlayerData)
  return (
    <div className="flex flex-col  w-full h-full text-black pt-8">
      <div className=" flex w-screen flex-col px-16 ">
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
                  {completePlayerData.map((player, index) => (
                    <TableRow key={index} className="flex outline outline-gray-500 outline-[.5px] hover:bg-zinc-800/60">
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
      );
    };
    
export default CompletePlayerStatsTable;