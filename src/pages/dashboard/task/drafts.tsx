import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"



function Drafts() {

    const [emptyState, setEmptyState] = useState(false);

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
                        <h2 className="text-[25px]">Drafts</h2>
                    </div>
                    <div className={`btn-group flex gap-2 ml-auto ${!emptyState ? "w-1/4" : ""}`}>
                        {!emptyState ?
                            <>
                                <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                                    Duplicate task
                                </PrimaryButton>
                                <PrimaryButton className="!px-2 !py-4">
                                    Publish
                                </PrimaryButton>
                            </>
                            : <PrimaryButton className="!px-4 !py-4">
                                Create new task
                            </PrimaryButton>}
                    </div>
                </div>

                <div className="btn-bar flex justify-between mt-8">
                    <div className="flex gap-4 items-center">
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                            Overdue
                        </PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                            Completed
                        </PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                            In-progress
                        </PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                            All
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <Icon name="search" />
                            <input type="text" placeholder="Search" className="w-24 outline-none h-full text-grayscale-60 placeholder:text-grayscale-60 text-sm" />
                        </div>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit flex gap-2 items-center">
                            <Icon name="sort" />
                            Sort
                        </PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit flex gap-2 items-center">
                            <Icon name="filter" />
                            Filter
                        </PrimaryButton>
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
                    <section className="swaps-container my-4">
                        <div className="swaps">

                            {[1, 2, 3].map((swap, id) => {
                                return (
                                    <div className="swap w-full p-4 border border-solid border-grayscale-30 last:border-b-[1px] border-b-0 first:rounded-t-md last:rounded-b-md flex justify-between">
                                        <div className="flex items-start gap-4">
                                            <input type="checkbox" onChange={(e) => selectedHandler(e, id)} className="cursor-pointer h-[12px] w-[12px] accent-lydia relative top-1" />
                                            <div>
                                                <p className="text-grayscale-100 text-sm">Guest Seating and Reservations</p>
                                                <em className="text-sm text-grayscale-60 not-italic">2 hours ago</em>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm gap-4">
                                            <em className="not-italic text-grayscale-100">12/12</em>
                                            <p className="text-[#E62E2E] bg-[#FFE6E6] p-2 rounded-full">Urgent</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="btn-group flex gap-2 w-1/4 mr-auto my-4">
                            <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40 flex items-center gap-2">
                                <Icon name="brushBlack" />
                                Edit tasks
                            </PrimaryButton>
                            <PrimaryButton className="!px-2 !py-4">
                                Publish
                            </PrimaryButton>
                        </div>

                        {selected.length > 0 ?
                            <div className="selected-notification w-[74%] fixed bottom-[10px] bg-grayscale-100 px-4 py-2 rounded-md flex justify-between items-center text-sm">
                                <p className="text-white">{selected.length} {selected.length > 1 ? "tasks" : "task"} selected</p>
                                <div className="flex gap-2">
                                    <button className="flex gap-2 p-2 bg-grayscale-100 rounded-md text-white items-center"><Icon name="refreshGrey" />Reassign</button>
                                    <button className="flex gap-2 p-2 bg-white rounded-md text-grayscale-100 items-center"><Icon name="sort" />Mark Complete</button>
                                    <button className="flex gap-2 p-2 bg-grayscale-100 rounded-md text-white items-center"><Icon name="trashRed" />Delete</button>
                                </div>
                            </div> : null}
                    </section>}
            </div>
        </>
    );
}

export default Drafts;
