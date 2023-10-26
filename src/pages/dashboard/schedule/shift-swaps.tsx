import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import Modal from "../../../components/modal"
import Avatar from "../../../assets/imgs/sample-avatar.png"



function ShiftSwap() {

    const [emptyState, setEmptyState] = useState(false);

    const [isShiftSwapModalOpen, setIsShiftSwapModalOpen] = useState(false)

    const [isApproveSwapModalOpen, setIsApproveSwapModalOpen] = useState(true)

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
            <Modal
                handleClose={() => setIsShiftSwapModalOpen(false)}
                isOpen={isShiftSwapModalOpen}
            >
                <div className="swap-modal bg-white w-[35rem] flex justify-around gap-4 h-[250px] rounded-md p-6">
                    <div className="flex flex-col justify-around">
                        <div className="flex gap-2">
                            <img src={Avatar} alt="avatar" />
                            <div>
                                <p className="text-grayscale-100">Theresa A</p>
                                <em className="text-grayscale-60 not-italic">theresa@email.com</em>
                            </div>
                        </div>

                        <div className="border border-solid border-grayscale-40 rounded-md p-4">
                            <p>Thu 12th Spet</p>
                            <p>08:00am - 09:00am </p>
                            <em className="text-grayscale-60 not-italic">lorem ipsum</em>
                        </div>
                    </div>

                    <div className="flex flex-col justify-around items-center">
                        <div className="w-[2px] bg-grayscale-30 rounded-sm h-[50px]"></div>
                        <Icon name="refresh" />
                        <div className="w-[2px] bg-grayscale-30 rounded-sm h-[50px]"></div>
                    </div>

                    <div className="flex flex-col justify-around">
                        <div className="flex gap-2">
                            <img src={Avatar} alt="avatar" />
                            <div>
                                <p className="text-grayscale-100">Theresa A</p>
                                <em className="text-grayscale-60 not-italic">theresa@email.com</em>
                            </div>
                        </div>

                        <div className="border border-solid border-grayscale-40 rounded-md p-4">
                            <p>Thu 12th Spet</p>
                            <p>08:00am - 09:00am </p>
                            <em className="text-grayscale-60 not-italic">lorem ipsum</em>
                        </div>
                    </div>
                </div>
            </Modal>


            <Modal
                handleClose={() => setIsApproveSwapModalOpen(false)}
                isOpen={isApproveSwapModalOpen}
            >
                <div className="approve-swap-modal bg-white w-[35rem] flex flex-col justify-around gap-4 h-[200px] rounded-lg p-6">
                    <div className="flex gap-4 items-start">
                        <Icon name="tickLydia" />
                        <div>
                            <p>Approve Swap</p>
                            <em className="not-italic text-grayscale-60">Are you sure you want to approve this swap? This action cannot be undone.</em>
                        </div>
                        <div>
                            <Icon name="nakedClose" />
                        </div>
                    </div>
                    <div className="flex justify-between w-[92.5%] ml-auto">
                        <div className="flex gap-2 items-center text-grayscale-100 text-sm">
                            <input type="checkbox" />
                            <p>Don’t show again</p>
                        </div>
                        <div className="btn-group flex gap-2">
                            <PrimaryButton className="px-4 !py-2 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="px-4 !py-2">
                                Approve
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

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
                        <h2 className="text-[25px]">Shift Swaps</h2>
                        <p className="text-sm text-grayscale-60">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                </div>
                {emptyState ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                    <img src={Empty} alt="no schedule" />
                    <h2>No requests found</h2>
                    <p className="text-grayscale-60 text-sm">There are no shift changes that require your action</p>
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
                                            <p className="text-grayscale-60 text-sm"><span className="text-grayscale-100">Theresa A.</span> is requesting a <span className="text-grayscale-100">Shift swap</span></p>
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
                                    <button className="flex gap-2 p-2 bg-grayscale-100 rounded-md text-white items-center"><Icon name="closeWhiteSm" /> Decline swap</button>
                                    <button className="flex gap-2 p-2 bg-white rounded-md text-grayscale-100 items-center"><Icon name="tickSm" />Approve swap</button>
                                </div>
                            </div> : null}
                    </section>}
            </div>
        </>
    );
}

export default ShiftSwap;
