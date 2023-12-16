import { Link } from "react-router-dom"
import "./MultiplayerMenu.css"
import { AnimatePresence } from "framer-motion"
export default function MultiplayerMenu() {
  return (
    <AnimatePresence mode="wait">
    <div className="multiplayermenu div">
        <Link to="/onlinemultiplayer" className="multiplayermenu text-green"> Online Multiplayer</Link>
        <br/>
        <Link to="/localmultiplayer" className="multiplayermenu text-yellow"> Local Multiplayer</Link>
    </div>
    </AnimatePresence>
  )
}
