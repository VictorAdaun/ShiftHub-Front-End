import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"


function Privacy() {



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
                        <p className="text-[18px]">Privacy settings</p>
                        <p className="text-grayscale-60">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <hr className="my-4 bg-grayscale-40" />
                    <div>
                        <p className="mb-8">Blacklisted Users</p>
                        {[1,2,3].map((users, id) => {
                            return (
                                <div key={id} className="flex justify-between items-center my-4">
                                    <div className="flex gap-4 items-center">
                                        <p className="text-grayscale-60">{id + 1}</p>
                                        <div className="h-[50px] w-[50px] rounded-full bg-grayscale-20 text-grayscale-60 flex items-center justify-center"><p>AS</p></div>
                                        <div>
                                            <p>Adaun Shedrack</p>
                                            <p className="text-grayscale-60">adaunshedrack@email.com</p>
                                        </div>
                                    </div>
                                    <p className="text-lydia">Restore</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Privacy;
