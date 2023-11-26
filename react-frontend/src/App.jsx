import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CompleteStatCategories from "./components/CompleteStatCategories"
import Navbar from "./components/Navbar"
import { StatsLeadingCards } from "./components/StatsLeadingCards"
import CompletePlayerStatsTable from "./components/CompletePlayerStatsTable"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {

  return (
    <Provider store={store}>
      <div className='bg-zinc-800 h-full w-screen'>
        <Navbar />
          <Routes>
            <Route exact path="/nba/stats/players/:stat" element={<CompletePlayerStatsTable />} />
            <Route path="/" element={
              <>
                <CompleteStatCategories />
                <StatsLeadingCards />
              </>
            }>
            </Route>
          </Routes>
      </div>
    </Provider>
  )
}

export default App
