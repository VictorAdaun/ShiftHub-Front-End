import DashboardSidebar from '../components/dashboard/dashboard-sidebar'
import BellIcon from '../assets/svgs/dashboard/bell.svg'
import SearchIcon from '../assets/svgs/dashboard/search-icon.svg'
import MarkIcon from '../assets/svgs/dashboard/mark.svg'
import AvatarImg from '../assets/imgs/sample-dashboard-avatar.png'
import { Outlet } from 'react-router-dom'


function DashboardLayout() {
    return (
        <main className='flex'>
            <DashboardSidebar/>
            <section className='w-full'>
                <div className='flex justify-between border-b-2 border-b-grayscale-30 px-8 py-[19.5px]'>
                    <div className='flex gap-4 items-center'>
                        <img src={SearchIcon} alt='Search icon'/>
                        <button className='text-grayscale-60 text-body-large'>
                            Type to search by name, task...
                        </button>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button>
                            <img src={BellIcon} alt='Notifications'/>
                        </button>
                        <div className='w-[2px] h-5 rounded-[29px] bg-grayscale-20'></div>
                        <div className='flex'>
                            <div className='relative mr-3'>
                                <div className='max-w-[40px]'>
                                    <img src={AvatarImg} alt='avatar' />
                                </div>
                                <img className='absolute bottom-[2px] right-[-2px]' src={MarkIcon} alt='mark'/>
                            </div>
                            <div>
                                <h1 className='text-body-large'>Gabrielle Doe</h1>
                                <h4 className='text-grayscale-60 text-body-mm'>gabrielledoe@icloud.com</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </section>
        </main>
    )
}

export default DashboardLayout