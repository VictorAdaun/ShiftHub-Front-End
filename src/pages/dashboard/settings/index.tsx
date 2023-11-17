import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"
import SampleCountry from "../../../assets/sample-country.svg"


function Settings() {



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
                        <h2 className="text-[18px]">General settings</h2>
                        <p className="text-grayscale-60">Update your profile and how people can contact you generally</p>
                    </div>
                    <hr className="my-4 bg-grayscale-40" />
                    <div className="section-heading flex justify-between mb-[16px]">
                        <p>Company details</p>
                        <p className="text-lydia cursor-pointer">edit</p>
                    </div>
                    <form className="[&>div]:text-[14px]">
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="company_name">Company Name</label>
                            <input name="company_name" type="text" placeholder="Dulce Cafe" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="company_address">Company Address</label>
                            <input name="company_address" type="text" placeholder="15, Glover Rd, Ikoyi" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
                            <em className="not-italic text-grayscale-60 text-sm">This helps us give you accurate, location-based compliance info</em>
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="day">What day of the week do your schedules start?</label>
                            <input name="day" type="text" placeholder="e.g. monday" className="w-full p-2 border border-solid border-grayscale-40 rounded-md placeholder:text-grayscale-60 text-grayscale-60" />
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
                    <hr className="my-8 bg-grayscale-40" />
                    <h2 className="mb-8">Language</h2>
                    <div className="country-select flex justify-between">
                        <div className="flex items-center gap-4">
                            <img src={SampleCountry} alt="country" />
                            <select name="country" className="font-light appearance-none">
                                <option value="Eng">
                                    English
                                </option>
                            </select>
                        </div>

                        <PrimaryButton className="!px-4 !py-2 !bg-white !text-lydia !w-auto border !border-solid border-grayscale-40">Change</PrimaryButton>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Settings;
