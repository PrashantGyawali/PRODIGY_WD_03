import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence,motion } from "framer-motion";
import "./OnlineMultiplayerMenu.css"

export default function OnlineMultiplayerMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const closingfuntion = () => {
    if (multiplayerOptionCheck() != "") {
      navigate("/onlinemultiplayer");
    }
  }
  const multiplayerOptionCheck = () => {
    switch (location.pathname) {
      case "/onlinemultiplayer/create":
        return "create";
      case "/onlinemultiplayer/join":
        return "join";
      case "/onlinemultiplayer":
        return "";
    }

  }

  return (
    <AnimatePresence>
    <motion.div
    key="hi"
    initial={{opacity:0,transform:"translateX(-300%)"}}
    animate={{opacity:1,transform:"translateX(0%)"}}
    transition={{ duration: 1}}>
    <div className="online-multiplayer-menu-wrapper" onClick={closingfuntion}>
      <div className="multiplayerTitle">
        Online Multiplayer
      </div>

      {multiplayerOptionCheck() != "join" && <Link to="/onlinemultiplayer/create" className="text-decor-none room-button create-room-button borderanimation" onClick={(e) => { e.stopPropagation(); }}>
        <span>Create Room</span>
      </Link>}

      {multiplayerOptionCheck() != "create" && 
      <Link to="/onlinemultiplayer/join" className="borderanimation2 text-decor-none room-button join-room-button borderanimation2" onClick={(e) => { e.stopPropagation(); }}>
        <span>Join Room</span>
      </Link>
            }



      <div onClick={(e) => { e.stopPropagation(); }} className="roomCodeDiv">
          <Outlet />
        </div>
    </div>
    </motion.div>
      </AnimatePresence>

  )
}
