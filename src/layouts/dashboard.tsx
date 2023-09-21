import DashboardSidebar from '../components/dashboard/dashboard-sidebar'
import { Outlet } from 'react-router-dom'


function DashboardLayout() {
    return (
        <main className='flex'>
            <DashboardSidebar/>
            <section>
                <div>

                </div>
                <Outlet/>
            </section>
        </main>
    )
}

export default DashboardLayout