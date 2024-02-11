import React, { useMemo, useState, useEffect } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import { useSearchParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"
import { useAuthContext } from "../../../context/auth"
import "../../../styles/progressBar.scss"
import "../../../styles/global.scss"


function Engagement() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const ctx = useAuthContext();


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
                        <h2 className="text-[24px] font-bold">Engage</h2>
                        <p className="text-grayscale-60">Understand where the problem lies and act efficiently before it is too late</p>
                    </div>
                </div>

                <div className="btn-bar my-4 flex justify-between">
                    <div className="flex items-center gap-4">
                        <PrimaryButton className="px-[5px] !py-[10px] !bg-white !text-grayscale-60 !w-fit flex gap-2 !p-2  items-center !border !border-solid !border-grayscale-30 !rounded-md">
                            Filter
                            <Icon name="filter" />
                        </PrimaryButton>

                        <select className="customSelect w-[60px] text-grayscale-60 text-sm outline-none appearance-none border border-solid border-grayscale-30 rounded-md p-[10px]">
                            <option>All</option>
                        </select>

                        <select className="customSelect w-[90px] bg-[65px] text-grayscale-60 text-sm outline-none appearance-none border border-solid border-grayscale-30 rounded-md p-[10px]">
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>

                        <div className="flex text-grayscale-60 text-sm items-center border border-solid border-grayscale-30 rounded-md">
                            <PrimaryButton className="px-[5px] !py-[12.5px] !bg-white !text-grayscale-60 !w-fit">
                                <Icon name="leftLight" />
                            </PrimaryButton>
                            <span><p>September</p></span>
                            <PrimaryButton className="px-[5px] !py-[12.5px] !bg-white !text-grayscale-60 !w-fit">
                                <Icon name="rightLight" />
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="px-[5px] py-[10px] bg-white text-grayscale-60 w-fit flex gap-2 p-2  items-center border border-solid border-grayscale-30 rounded-md [&>img]:h-4">
                        <Icon name="search" />
                        <input className="outline-none text-sm text-grayscale-60 placeholder:text-grayscale-60" placeholder="Search"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] gap-[16px]">
                    {Array(6).fill(0).map((_, id) => {
                        return (
                            <div className="border border-solid border-grayscale-30 rounded-md p-4 h-[228px] flex flex-col justify-between">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-sm font-bold">Shift Swap Success Rate</h2>
                                    <div data-text="The employee with the best weekly shift coverage. This employee has the least “no shows” and is the most punctual for the given time period."
                                        className="tooltip text-sm">
                                        <Icon name="infoCircle" />
                                        <div className="tooltip-gap"></div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="h-[48px] w-[48px] bg-[#E5E1FC66] rounded-full flex items-center justify-center">
                                        <Icon name="avatarLydia" />
                                    </div>
                                    <p> - - </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-[16px] my-4">
                    <div className="w-full border border-solid border-grayscale-30 rounded-md h-[228px] flex flex-col justify-between">
                        <div className="flex justify-between items-center border-b border-solid border-grayscale-30 p-4">
                            <h2 className="text-sm font-bold">Most Engaged</h2>
                            <div data-text="Most Engaged: The employee with the best weekly shift coverage. This employee has the least “no shows” and is the most punctual for the given time period."
                                className="tooltip text-sm">
                                <Icon name="infoCircle" />
                                <div className="tooltip-gap"></div>
                            </div>
                        </div>

                        <div className="w-[90%] mx-auto overflow-y-scroll my-2">
                            {Array(6).fill(0).map((_, id) => {
                                return (
                                    <div className="flex justify-between my-2 pr-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="avatar h-[30px] w-[30px] rounded-full bg-lydia flex items-center justify-center text-sm text-white p-4">
                                                <p>CW</p>
                                            </div>
                                            <div>
                                                <p>Candice Wu</p>
                                                <p className="text-grayscale-60">0001</p>
                                            </div>
                                        </div>

                                        <p className="px-[4px] py-[8px] h-fit bg-[#E5E1FC66] text-sm text-lydia rounded-md">View Profile</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="w-full border border-solid border-grayscale-30 rounded-md h-[228px] flex flex-col justify-between">
                        <div className="flex justify-between items-center border-b border-solid border-grayscale-30 p-4">
                            <h2 className="text-sm font-bold">Least Engaged</h2>
                            <div data-text="Least Engaged: The employee with the best weekly shift coverage. This employee has the least “no shows” and is the most punctual for the given time period."
                                className="tooltip text-sm">
                                <Icon name="infoCircle" />
                                <div className="tooltip-gap"></div>
                            </div>
                        </div>

                        <div className="w-[90%] mx-auto overflow-y-scroll my-2">
                            {Array(6).fill(0).map((_, id) => {
                                return (
                                    <div className="flex justify-between my-2 pr-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="avatar h-[30px] w-[30px] rounded-full bg-lydia flex items-center justify-center text-sm text-white p-4">
                                                <p>CW</p>
                                            </div>
                                            <div>
                                                <p>Candice Wu</p>
                                                <p className="text-grayscale-60">0001</p>
                                            </div>
                                        </div>

                                        <p className="px-[4px] py-[8px] h-fit bg-[#E5E1FC66] text-sm text-lydia rounded-md">View Profile</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Engagement;
