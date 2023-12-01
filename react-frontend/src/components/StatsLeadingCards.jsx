import { LeadingStats } from "../assets/constants/StatTypes";
import StatCard from "./StatCard";


export const StatsLeadingCards = () => {

  return (
    <div className="w-screen h-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 pt-8 px-16 md:px-20 lg:px-24 xl:px-32 2xl:px-48">
        {
          LeadingStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))
        }
    </div>
  )
}
