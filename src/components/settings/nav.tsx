import React from 'react'
import { useLocation, Link } from 'react-router-dom';

export default function SettingsNav() {

    const { pathname } = useLocation();

    const path = pathname.split("/")[pathname.split("/").length - 1]

    const links = ["general", "profile", "security", "plans", "privacy", "notifications", "compliance"]

  return (
    <nav className='mt-4 w-full border-b border-solid border-grayscale-30'>
        <ul className='flex [&>a]:py-2 first:[&>a]:ml-0 [&>a]:mx-4 text-grayscale-60'>
            {links.map((link, id)=> (
                <Link to={`/settings/${link}`} key={id} className={`capitalize ${path === link ? "!border-b-2 border-solid border-lydia" : null}`}>
                    <li>{link}</li>
                </Link>
            ))}
        </ul>
    </nav>
  )
}
