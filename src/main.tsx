import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Menu from './Menu.tsx'
import './index.css'
import Hero from './components/Hero.tsx';
import OnlineMultiplayerMenu from './pages/Multiplayer/OnlineMultiplayer/OnlineMultiplayer.tsx';
import LocalMultiplayer from './pages/Multiplayer/LocalMultiplayer/LocalMultiplayer.tsx';
import CreateRoomPage from './pages/Multiplayer/OnlineMultiplayer/createroom/createroom.tsx';
import MultiplayerMenu from './pages/Multiplayer/MultiplayerMenu.tsx';
import JoinRoomPage from './pages/Multiplayer/OnlineMultiplayer/joinroom/joinroom.tsx';
import SinglePlayer from './pages/Singleplayer/SinglePlayer.tsx';

const router=createBrowserRouter(
  [{
    path:"/",
    element:<Hero/>,
    errorElement:<Hero/>,
    children:[{
      path:"/",
      element:<Menu/>,
    },{
      path:"/multiplayer",
      element:<><MultiplayerMenu/></>,
      },
      {
        path:"/singleplayer",
        element:<><SinglePlayer/></>,
        },
    {
      path:"/onlinemultiplayer",
      element:<><OnlineMultiplayerMenu/></>,
      children:[{
        path:"/onlinemultiplayer/create",
        element:<><CreateRoomPage/></>,
      },
      {
        path:"/onlinemultiplayer/join",
        element:<><JoinRoomPage/></>,
      }]
    },
    {
      path:"/localmultiplayer",
      element:<><LocalMultiplayer/></>,
    }]
  }]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
