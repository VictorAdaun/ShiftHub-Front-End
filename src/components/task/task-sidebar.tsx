import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function TaskSidebar() {

    const { pathname } = useLocation();

    const path = pathname.split("/")[pathname.split("/").length - 1]

    return (
        <div>
            <Link to="/task/create-task/task-details"><p className={`p-2 ${path === "task-details" ? "rounded-sm text-lydia bg-[#F9FAFB]" : null}`}>Task Details</p></Link>
            <Link to="/task/create-task/task-list"><p className={`p-2 ${path === "task-list" ? "rounded-sm text-lydia bg-[#F9FAFB]" : null}`}>Task List</p></Link>
            <Link to="/task/create-task/assign-task"><p className={`p-2 ${path === "assign-task" ? "rounded-sm text-lydia bg-[#F9FAFB]" : null}`}>Assign Tasks</p></Link>
        </div>
    )
}
