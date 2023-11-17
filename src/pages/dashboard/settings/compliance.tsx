import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"


function Compliance() {



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

                <SettingsNav/>

                <section className="my-8 w-[80%]">

                </section>
            </div>
        </>
    );
}

export default Compliance;
