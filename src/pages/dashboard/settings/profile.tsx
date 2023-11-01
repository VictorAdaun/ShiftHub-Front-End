import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"
import Avatar from "../../../assets/imgs/sample-avatar.png"


function Profile() {



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
                        <h2 className="text-[18px]">Profile settings</h2>
                        <p className="text-grayscale-60">Update your profile and how people can contact you generally</p>
                    </div>
                    <hr className="my-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Profile picture</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>
                    <div className="flex gap-2">
                        <img src={Avatar} alt="avatar" />
                        <div>
                            <p className="text-grayscale-100">Your avatar</p>
                            <em className="text-grayscale-60 not-italic text-[14px]">PNG or JPG no bigger than 580px wide and tall.</em>
                        </div>
                    </div>
                    <hr className="mt-8 mb-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Personal details</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>
                    <form className="[&>div]:text-[14px]">
                        <div className="flex gap-4 mb-4 [&>div]:w-full">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="first_name">First Name</label>
                                <input name="first_name" type="text" placeholder="Gabrielle" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="last_name">Last Name</label>
                                <input name="last_name" type="text" placeholder="Doe" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="email">Email Address</label>
                            <input name="email" type="email" placeholder="gabrielledoe@email.com" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="altEmail">Alt. Email Address</label>
                            <input name="altEmail" type="email" placeholder="gabrielledoe@email.com" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
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
                        <p>Employment details</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>

                    <form>
                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="text-[14px]">Department</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Front of house</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                        </div>

                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="text-[14px]">What would their role be</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Cook</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                            <em className="not-italic text-sm text-grayscale-60">This is based off the departments created</em>
                        </div>

                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="text-[14px]">Employee Type</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Manager</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                        </div>
                    </form>

                    <hr className="mt-8 mb-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Compliance</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>

                    <form>
                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="text-[14px]">Max. Hours/week</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>40</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                        </div>

                        <div className="field flex flex-col w-full text-left relative mb-4">
                            <label className="text-[14px]">Employee Form</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Full-time</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Profile;
