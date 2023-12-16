import "./Hero.css"
import {Outlet} from "react-router-dom"
export default function Hero() {
  return (
    <>
        <div className="apptitle wavyanimation">Tic-Tac-Toe</div>
        <div className="appbody">
            <Outlet/>
        </div>
    </>
  )
}
