import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"


function Notifications() {



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
                    <div className="heading">
                        <p className="text-[18px]">Notification settings</p>
                        <p className="text-grayscale-60">We may still send you important notifications about your account outside of your notifications settings.</p>
                    </div>
                    <hr className="my-8 bg-grayscale-40" />

                    {["activity", "reminders", "tags"].map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="flex items-center justify-between my-8">
                                    <div className="w-1/2">
                                        <p className="text-grayscale-100 capitalize">{item}</p>
                                        <p className="text-[14px] text-grayscale-60">These are notifications for posts, tasks and other reactions to your activities, and more</p>
                                    </div>

                                    <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-4 text-grayscale-100">
                                        <div>
                                            <div className="checkbox relative top-[5px]">
                                                <input name={`push_${item}`} className="" id={`push_${item}`} type="checkbox" />
                                                <label htmlFor={`push_${item}`}></label>
                                            </div>
                                            <p>Push</p>
                                        </div>
                                        <div>
                                            <div className="checkbox relative top-[5px]">
                                                <input name={`email_${item}`} className="" id={`email_${item}`} type="checkbox" />
                                                <label htmlFor={`email_${item}`}></label>
                                            </div>
                                            <p>Email</p>
                                        </div>
                                        <div>
                                            <div className="checkbox relative top-[5px]">
                                                <input name={`sms_${item}`} className="" id={`sms_${item}`} type="checkbox" />
                                                <label htmlFor={`sms_${item}`}></label>
                                            </div>
                                            <p>SMS</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4 bg-grayscale-40" />
                            </div>
                        );
                    })}
                </section>
            </div>
        </>
    );
}

export default Notifications;
