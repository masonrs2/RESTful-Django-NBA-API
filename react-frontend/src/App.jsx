import CompleteStatCategories from "./components/CompleteStatCategories"
import Navbar from "./components/Navbar"
import { StatsLeadingCards } from "./components/StatsLeadingCards"

function App() {

  return (
    <div className='bg-zinc-800 h-full w-screen'>
      <Navbar />
      <CompleteStatCategories />
      <StatsLeadingCards />
    </div>
  )
}

export default App
