import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { SidebarData } from './SidebarData'

const Sidebar = () => {
   return (
      <div className='sidebar'>
         <ul className='sidebar-list'>
            {SidebarData.map((val, key) => {
               return (
                  <LinkContainer key={key} to={val.link}>
                     <li className='row'>
                        <div id='icon'> {val.icon}</div>
                        <div id='title'>{val.title}</div>
                     </li>
                  </LinkContainer>
               )
            })}
         </ul>
      </div>
   )
}

export default Sidebar
