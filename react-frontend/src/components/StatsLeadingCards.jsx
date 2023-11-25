import { LeadingStats } from "../assets/constants/StatTypes";
import StatCard from "./StatCard";


export const StatsLeadingCards = () => {

  return (
    <div className="w-screen h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-20 px-12">
        {
          LeadingStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))
        }
    </div>
  )
}
