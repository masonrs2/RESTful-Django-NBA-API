import React from 'react'
import { CompleteLeadingTeamStats, LeadingTeamStats } from '../assets/constants/StatTypes'
import LeadingTeamStatsCard from './LeadingTeamStatsCard'

const TeamLeadersTableCards = () => {
  return (
    <div className="w-screen h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-8 px-12">
      {
        LeadingTeamStats.map((stat, index) => (
          <LeadingTeamStatsCard stat={stat} />
        ))
      }
    </div>
  )
}

export default TeamLeadersTableCards