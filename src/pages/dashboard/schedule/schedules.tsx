import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import ScrollableModal from "../../../components/scrollable-modal"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import Input from "postcss/lib/input"



function Schedules() {

    const [emptyState, setEmptyState] = useState(false);

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

    const [openScheduleMenu, setOpenScheduleMenu] = useState(null)

    const toggleScheduleMenu = (index) => {
        setOpenScheduleMenu((prev)=> {
            if(prev === index){
                return null
            }else{
                return index
            }
        })
    }

    const [isChecked, setIsChecked] = useState(null)

    const [openSlots, setOpenSlots] = useState([]);

    const toggleSlot = (index) => {
        setOpenSlots(prevOpenSlots => {
            if (prevOpenSlots.includes(index)) {
                return prevOpenSlots.filter(slot => slot !== index);
            } else {
                return [...prevOpenSlots, index];
            }
        });
    };

    function generateTimeArray() {
        const startHour = 8;
        const endHour = 20;
        const timeArray = [];

        for (let hour = startHour; hour < endHour; hour++) {
            timeArray.push(`${hour.toString().padStart(2, '0')}:00am`);
            timeArray.push(`${hour.toString().padStart(2, '0')}:30am`);
        }

        timeArray.push(`${endHour.toString().padStart(2, '0')}:00pm`);

        return timeArray;
    }

    const timeSlots = generateTimeArray();

    const paths = useMemo(() => (location.pathname.split("/")), [])

    return (
        <>
            <ScrollableModal
                handleClose={() => setIsScheduleModalOpen(false)}
                isOpen={isScheduleModalOpen}
            >
                <div className="schedule-modal text-center w-[90%] flex flex-col gap-4 h-[80%]">
                    <div className="flex justify-between">
                        <h2>Schedule Title </h2>
                        <Icon name="close" />
                    </div>
                    <div className="field w-full">
                        <input type="text" placeholder="Add title" className="w-[inherit] border border-solid border-grayscale-40 rounded-md p-[10px] outline-none" />
                    </div>
                    <div className="field flex items-center justify-between gap-2">
                        <div className="text-left">
                            <p>Availability</p>
                            <em className="text-sm text-grayscale-60 font-normal">Lorem ipsum is the printing something</em>
                        </div>
                        <div className="flex ">
                            <select name="repeat" className="repeat-select outline-none text-sm appearance-none">
                                <option className="">Repeat weekly</option>
                                <option>Does not repeat</option>
                            </select>
                            <Icon name="down" />
                        </div>
                    </div>
                    <div className="button-wrap">
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((checkbox, index) => {
                            return (
                                <div key={index}>
                                    <input className="hidden radio-label" id={`new-checkbox-${index}`} type="radio" name="days" />
                                    <label className="button-label" htmlFor={`new-checkbox-${index}`}>
                                        <h1>{checkbox.substring(0, 3)}</h1>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <div className="slots-container">
                        {["morning", "noon", "evening"].map((shift, index) => {

                            const isOpen = openSlots.includes(index)
                            return (
                                <div key={index} className={`slots flex items-center gap-4 mb-4`}>
                                    <div className={`container border border-solid border-grayscale-40 rounded-md p-[10px] ${isOpen ? "activeSlot" : null}`}>
                                        <div className="unavailable flex justify-between items-center my-4">
                                            <div className="flex gap-2 items-center justify-center">
                                                <Icon name={shift} />
                                                <p>{shift}</p>
                                            </div>
                                            <div className="text-grayscale-60">
                                                {!isOpen ?
                                                    <p>Unavailable</p> :
                                                    <div className="field-time flex  gap-4">
                                                        <select name="start_time" className="outline-none text-sm appearance-none">
                                                            {timeSlots.map((time) => {
                                                                return (
                                                                    <option value={time}>{time}</option>
                                                                );
                                                            })}
                                                        </select>
                                                        <em>-</em>
                                                        <select name="end_time" className="outline-none text-sm appearance-none">
                                                            {timeSlots.map((time) => {
                                                                return (
                                                                    <option value={time}>{time}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>}
                                            </div>
                                        </div>
                                        {isOpen ?
                                            <div className="open-slots flex justify-between items-center mb-4">
                                                <div className="flex gap-2 items-center justify-center">
                                                    <Icon name="profile" />
                                                    <p>Open slots</p>
                                                </div>
                                                <input type="text" name="slot" placeholder="e.g 8" className="w-16 border border-solid border-grayscale-40 rounded-md p-2 text-center outline-none text-grayscale-60" />
                                            </div>
                                            : null}
                                    </div>
                                    <div className="h-fit cursor-pointer" onClick={() => {
                                        toggleSlot(index)
                                    }}>
                                        {!isOpen ? <Icon name="add" /> : <Icon name="forbidden" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="booking">
                        <div className="container">
                            <div className="heading text-left">
                                <h2 className="text-lg">Booking window</h2>
                                <p className="text-grayscale-60">Limit the time range that employees can book a shift</p>
                            </div>
                            <div className="booking-window flex justify-between items-center my-4 gap-4">
                                <div className="field flex flex-col w-full text-left relative">
                                    <label>Max time after</label>
                                    <div className="flex w-full">
                                        <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                            <option>no. of days</option>
                                        </select>
                                        <Icon name="down" className="absolute right-[5px] top-[40px]" />
                                    </div>
                                </div>
                                <div className="field flex flex-col w-full text-left relative">
                                    <label>Min time before</label>
                                    <div className="flex w-full">
                                        <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                            <option>no. of days</option>
                                        </select>
                                        <Icon name="down" className="absolute right-[5px] top-[40px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btns flex justify-end">
                        <PrimaryButton inverted className="!w-1/4">
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton className="!w-1/4">
                            Continue
                        </PrimaryButton>
                    </div>
                    <div className="force-margin h-[50px] w-full text-white"><p>Margin</p></div>
                </div>
            </ScrollableModal>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <div className="flex gap-2" key={id}>
                                <p className="capitalize last:text-lydia">{path}</p>
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </div>
                        );
                    })}
                </div>
                <div className="heading flex mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Schedule</h2>
                        <p className="text-sm text-grayscale-60">Understand where the problem lies and act efficiently before it is too late</p>
                    </div>
                    <div className="btn-group w-1/3 flex gap-8 items-center">
                        <PrimaryButton className="w-fit">Publish Schedule</PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit"><Icon name="ellipsis" /></PrimaryButton>
                    </div>
                </div>
                {emptyState ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                    <img src={Empty} alt="no schedule" />
                    <h2>No shifts are scheduled</h2>
                    <p className="text-grayscale-60 text-sm">Create and publish your schedule</p>
                    <PrimaryButton className="!w-fit !px-4 mt-2">Get Started</PrimaryButton>
                </section> :
                    <section className="schedules">
                        {["hi", "yeah", "test"].map((schedule, id) => {
                            return (
                                <div key={id} className="schedule w-full my-8 border border-solid border-grayscale-30 rounded-md flex p-4 justify-between relative">
                                    <div>
                                        <p>Summer</p>
                                        <em className="not-italic text-grayscale-60 text-sm">Repeat weekly</em>
                                    </div>
                                    <div className="flex gap-8 items-center">
                                        <div className="checkbox relative top-[5px]">
                                            <input name={schedule} value={schedule} className="" id={`active-${schedule}`} type="checkbox" checked={isChecked === id} onChange={()=> setIsChecked(id)}/>
                                            <label htmlFor={`active-${schedule}`}></label>
                                        </div>
                                        <div className="mr-4 cursor-pointer flex items-center justify-center" onClick={() => toggleScheduleMenu(id)}>
                                            {openScheduleMenu === id ? <Icon name="ellipsisLydia" /> : <Icon name="ellipsis" />}
                                        </div>
                                    </div>
                                    <div className={`options absolute right-[10px] top-[70px] rounded-md flex flex-col shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08),0_8px_8px_-4px_rgba(16,24,40,0.03)] transition-opacity opacity-[0] z-[-1] ${openScheduleMenu === id ? "opacity-[1] !z-[2]" : null}`}>
                                        <button className="w-full bg-white h-auto p-[8px] flex gap-2 items-center text-grayscale-60 text-sm hover:bg-grayscale-40 hover:text-grayscale-100 rounded-t-md"><Icon name="brush" />Edit Schedule</button>
                                        <button className="w-full bg-white h-auto p-[8px] flex gap-2 items-center text-grayscale-60 text-sm hover:bg-grayscale-40 hover:text-grayscale-100"><Icon name="eye" />View Schedule</button>
                                        <button className="w-full bg-white h-auto p-[8px] flex gap-2 items-center text-grayscale-60 text-sm hover:bg-grayscale-40 hover:text-grayscale-100 rounded-b-md"><Icon name="trash" />Delete Schedule</button>
                                    </div>
                                </div>
                            );
                        })}
                    </section>}
            </div>
        </>
    );
}

export default Schedules;
