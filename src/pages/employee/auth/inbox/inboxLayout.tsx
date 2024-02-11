import React from 'react'
import EmployeeLayout from '../../../../layouts/employee'
import Icon from '../../../../components/icon';
import PrimaryButton from '../../../../components/button/primary-button';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function InboxLayout() {


    const navigate = useNavigate()

    const location = useLocation()

    return (
        <EmployeeLayout>
            <section className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center'>
                    <h2>Inbox</h2>
                    <div className='flex items-center gap-4'>
                        <div className={location.pathname ===  "/employee/timeoff/inbox" ? 'flex items-center gap-2 cursor-pointer bg-grayscale-20 text-grayscale-100 py-2 px-4 rounded-sm transition ease-in-out duration-300' : 'flex items-center gap-2 cursor-pointer'}
                        onClick={()=> navigate("/employee/timeoff/inbox")}>
                            <Icon name='atSymbol'/>
                            <p>Notification</p>
                        </div>

                        <div className={location.pathname === "/employee/timeoff/inbox/requests" ? 'flex items-center gap-2 cursor-pointer bg-grayscale-20 text-grayscale-100 py-2 px-4 rounded-sm transition ease-in-out duration-300' : 'flex items-center gap-2 cursor-pointer'}
                        onClick={()=> navigate("/employee/timeoff/inbox/requests")}>
                            <Icon name='tickCircleBlack'/>
                            <p>Requests</p>
                        </div>
                    </div>
                </div>

                <Outlet/>
            </section>
        </EmployeeLayout>
    )
}

export default InboxLayout;