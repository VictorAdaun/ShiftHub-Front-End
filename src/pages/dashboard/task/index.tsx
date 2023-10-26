import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import Modal from "../../../components/modal"
import Avatar from "../../../assets/imgs/sample-avatar.png"



function Task() {

    // date format logic
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDateRange = (currentDate) => {
        const formattedDate = new Date(currentDate);
        const endDate = new Date(formattedDate);
        endDate.setDate(endDate.getDate() + 6);


        const startMonth = months[formattedDate.getMonth()];
        const startDay = formattedDate.getDate();
        const endDay = endDate.getDate();
        const endMonth = months[endDate.getMonth()]

        return startMonth === endMonth ? `${startMonth} ${startDay} - ${endDay}` : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }


    const formattedDayRange = (date, day) => {
        const formattedDate = new Date(date);
        formattedDate.setDate(formattedDate.getDate() + day)

        const startMonth = months[formattedDate.getMonth()];
        const startDay = formattedDate.getDate();


        return `${startMonth} ${startDay}`;
    }

    const [currentNumber, setCurrentNumber] = useState(0)

    const [currentDate, setCurrentDate] = useState(new Date())

    // end

    const [emptyState, setEmptyState] = useState(true);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [dropDown, setDropdown] = useState("Weekly")

    const [selected, setSelected] = useState([])

    const selectedHandler = (e, data) => {
        if (!selected.includes(data) && e.target.checked) {
            setSelected([...selected, data])
        } else if (!e.target.checked) {
            setSelected(selected.filter((item) => item !== data))
        }
    }


    const paths = useMemo(() => (location.pathname.split("/")), [])

    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <div className="flex gap-2" key={id}>
                                {path !== "" ? <p className="capitalize last:text-lydia">{path}</p> : null}
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </div>
                        );
                    })}
                </div>
                <div className="heading flex items-center mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Task</h2>
                        <p className="text-sm text-grayscale-60">Tres vubösm trens. Pode kanade för plaskap. </p>
                    </div>
                    <div className="btn-group flex gap-2 w-1/4 ml-auto">
                        <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                            View drafts
                        </PrimaryButton>
                        <PrimaryButton className="!px-2 !py-4">
                            Create new task
                        </PrimaryButton>
                    </div>
                </div>

                <div className="btn-bar flex justify-between mt-8">
                <div className="flex gap-4">
                    <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                        Filter
                        <Icon name="filter" />
                    </PrimaryButton>
                    <div className="relative z-[0]">
                        <PrimaryButton className="px-[16px]  !w-[105px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 flex gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            {dropDown}
                            <Icon name="downLight" />
                        </PrimaryButton>
                        {isDropdownOpen ?
                            <div className="options bg-white h-auto w-[105px] absolute top-[55px] !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm p-[16px] flex flex-col gap-2">
                                <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                    setDropdown("Weekly")
                                    setIsDropdownOpen(false)
                                }}>Weekly</p>
                                <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                    setDropdown("Daily")
                                    setIsDropdownOpen(false)
                                }}>Daily</p>
                            </div> : null}
                    </div>
                    <div className="flex !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm items-center">
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                            onClick={() => {
                                if (dropDown === "Daily") {
                                    if (currentNumber > 0) {
                                        setCurrentNumber(currentNumber - 1)
                                    }
                                }
                            }}>
                            <Icon name="leftLight" />
                        </PrimaryButton>
                        <span>{dropDown === "Weekly" ? formattedDateRange(currentDate) :
                            <p>{formattedDayRange(currentDate, currentNumber)}</p>}</span>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                            onClick={() => {
                                if (dropDown === "Daily") {
                                    if (currentNumber < 6) {
                                        setCurrentNumber(currentNumber + 1)
                                    }
                                }
                            }}
                        >
                            <Icon name="rightLight" />
                        </PrimaryButton>
                    </div>
                </div>
                <div className="flex !border !border-solid !border-grayscale-30 rounded-md items-center gap-2 pl-4 w-1/3">
                    <Icon name="search" />
                    <input type="text" placeholder="Search" className="outline-none h-full text-grayscale-60" />
                </div>
            </div>

                {emptyState ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                    <img src={Empty} alt="no schedule" />
                    <h2>No tasks have been created</h2>
                    <p className="text-grayscale-60 text-sm">Create and publish your tasks</p>
                    <PrimaryButton className="!px-4 !py-4 !w-fit mt-2">
                        Get Started
                    </PrimaryButton>
                </section> :
                    <section className="swaps">
                        {[1, 2, 3].map((swap, id) => {
                            return (
                                <div className="swap w-full my-4 p-4 border border-solid border-grayscale-30 rounded-md flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <input type="checkbox" onChange={(e) => selectedHandler(e, id)} className="cursor-pointer h-[24px] w-[24px] accent-lydia" />
                                        <div className="bg-[#E5E1FC66] h-[48px] w-[48px] rounded-full flex items-center justify-center">
                                            <p className="text-lydia">T</p>
                                        </div>
                                        <div>
                                            <p className="text-grayscale-60 text-sm"><span className="text-grayscale-100">Theresa A.</span> is requesting a <span className="text-grayscale-100">Time Off</span></p>
                                            <em className="text-sm text-grayscale-60 not-italic">2 hours ago</em>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Icon name="closeGrey" />
                                        <Icon name="tick" />
                                        <p className="text-lydia">View</p>
                                    </div>
                                </div>
                            );
                        })}
                        {selected.length > 0 ?
                            <div className="selected-notification w-[74%] fixed bottom-[10px] bg-grayscale-100 px-4 py-2 rounded-md flex justify-between items-center">
                                <p className="text-sm text-white">{selected.length} {selected.length > 1 ? "tasks" : "task"} selected</p>
                                <div className="flex gap-2">
                                    <button className="flex gap-2 p-2 bg-grayscale-100 rounded-md text-white items-center"><Icon name="closeWhiteSm" /> Decline Time Off</button>
                                    <button className="flex gap-2 p-2 bg-white rounded-md text-grayscale-100 items-center"><Icon name="tickSm" />Approve Time Off</button>
                                </div>
                            </div> : null}
                    </section>}
            </div>
        </>
    );
}

export default Task;
