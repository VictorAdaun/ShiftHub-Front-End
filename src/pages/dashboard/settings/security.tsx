import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"


function Security() {



    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="heading flex items-center mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Settings</h2>
                    </div>
                    <div className="btn-group flex gap-2 w-1/4 ml-auto">
                        <div className="flex items-center gap-2 border border-solid border-grayscale-30 p-4 w-full rounded-md">
                            <Icon name="search" />
                            <input type="text" placeholder="Search Settings" className="w-full outline-none h-full text-grayscale-60 placeholder:text-grayscale-60 text-sm" />
                        </div>
                    </div>
                </div>

                <SettingsNav />

                <section className="my-8 w-[80%]">
                    <div className="field">
                        <h2 className="text-[18px]">Security settings</h2>
                        <p className="text-grayscale-60">Update your profile and how people can contact you generally</p>
                    </div>
                    <hr className="my-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Security details</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>
                    <form className="[&>div]:text-[14px]">
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" placeholder="Password" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input name="confirm_password" type="password" placeholder="Confirm Password" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                        </div>

                        <div className="btns flex justify-end">
                            <PrimaryButton inverted className="!w-32">
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="!w-32">
                                Save
                            </PrimaryButton>
                        </div>
                    </form>

                    <hr className="mt-8 mb-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Security questions</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>

                    <form className="[&>div>label]:text-[14px]">
                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="">Question 1</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Select one...</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>

                            <label className="mt-4 mb-2" htmlFor="answer1">Answer</label>
                            <div className="flex flex-col gap-2">
                                <input name="answer1" type="text" placeholder="..." className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                            </div>
                        </div>

                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label>Question 2</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Select one...</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>

                            <label className="mt-4 mb-2" htmlFor="answer2">Answer</label>
                            <div className="flex flex-col gap-2">
                                <input name="answer2" type="text" placeholder="..." className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="current_password">To save these settings, please enter your current password</label>
                            <input name="current_password" type="text" placeholder="..." className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Security;
