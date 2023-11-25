import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CompleteStatCategories from "./components/CompleteStatCategories"
import Navbar from "./components/Navbar"
import { StatsLeadingCards } from "./components/StatsLeadingCards"
import PlayerStatsTable from "./components/PlayerStatsTable"

function App() {

  return (
    <div className='bg-zinc-800 h-full w-screen'>
      <Navbar />
        <Routes>
          <Route exact path="/nba/stats/players/:stat" component={PlayerStatsTable} />
          <Route path="/" element={
            <>
              <CompleteStatCategories />
              <StatsLeadingCards />
            </>
          }>
          </Route>
        </Routes>
    </div>
  )
}

export default App
