import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SubNavStatCategories from "./components/SubNavStatCategories"
import Navbar from "./components/Navbar"
import { StatsLeadingCards } from "./components/StatsLeadingCards"
import CompletePlayerOrTeamStatsTable from "./components/CompletePlayerOrTeamStatsTable"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import persistStore from "redux-persist/es/persistStore"
import { PersistGate } from 'redux-persist/integration/react'
import TeamLeadersTableCards from "./components/TeamLeadersTableCards"
import NbaNews from "./components/NbaNews"

function App() {
  let Persistor = persistStore(store, {timeout: 10000});

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={Persistor}> */}
        <div className='bg-zinc-800 h-full w-screen'>
          <Navbar />
          <SubNavStatCategories />
            <Routes>
            <Route exact path="/nba/stats/:tableType/:stat" element={<CompletePlayerOrTeamStatsTable />} />
            <Route exact path="/nba/leaders/team" element={<TeamLeadersTableCards />} />
            <Route exact path="/nba/news" element={<NbaNews />} />
              <Route path="/" element={
                <>
                  
                  <StatsLeadingCards />
                </>
              }>
              </Route>
            </Routes>
        </div>
      {/* </PersistGate> */}
    </Provider>
  )
}

export default App
