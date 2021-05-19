import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as SiIcons from 'react-icons/si'

export const SidebarData = [
   {
      title: 'Dashboard',
      icon: <AiIcons.AiFillHome />,
      link: '/admin',
   },
   {
      title: 'Reservation',
      icon: <SiIcons.SiGooglecalendar />,
      link: '/admin/reservations',
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
         {
            title: 'Reservation List',
            path: '/admin/reservations',
            icon: <IoIcons.IoIosPaper />,
         },
         {
            title: 'For Pick-up',
            path: '/admin/reservations',
            icon: <IoIcons.IoIosPaper />,
         },
         {
            title: 'Available',
            path: '/admin/reservations',
            icon: <IoIcons.IoIosPaper />,
         },
      ],
   },
   {
      title: 'Accounts',
      icon: <FaIcons.FaUserCircle />,
      link: '/admin/accounts',
   },
   {
      title: 'Animals',
      icon: <FaIcons.FaDog />,
      link: '/admin/animals',
   },
   {
      title: 'Messages',
      icon: <FaIcons.FaEnvelope />,
      link: '/admin/messages',
   },
]
