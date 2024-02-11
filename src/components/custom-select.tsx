import { useState } from "react"
import Icon from "./icon"

interface CustomOption {
    value: string;
    label: string;
    color?: string;
    bgColor?: string;
}

interface CustomSelectProps {
    value: string;
    setValue: (arg0: string)=>void;
    values: CustomOption[]
}

const CustomSelect = ({value, setValue, values}:CustomSelectProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const selectedValue = values.find(item => item.value === value)

    return (
        <div className="relative">
            <button className={`z-[1] px-2 py-1 w-fit flex items-center rounded-[5px] whitespace-nowrap flex gap-2 items-center`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{backgroundColor: selectedValue.bgColor}}>
                <div className={`w-[6px] h-[6px] rounded-full`} style={{backgroundColor: selectedValue.color}}></div>
                <h3 className={`text-sm`} style={{color: selectedValue.color}}>{selectedValue.label}</h3>
                <Icon name="downLight"
                    className={`fill-${selectedValue.color}`}
                />
            </button>
            {
                isDropdownOpen ?
                    <div className=" z-[2] options bg-white h-auto w-[102px] absolute top-[0] !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm p-[16px] flex flex-col gap-2">
                        {
                            values.map((value, idx) => {
                                return (
                                    <option
                                        key={idx}
                                        className="cursor-pointer hover:text-grayscale-40"
                                        value={value.value}
                                        onClick={() => {
                                            setValue(value.value)
                                            setIsDropdownOpen(false)
                                        }}
                                    >
                                        {value.label}
                                    </option>
                                )
                            })
                        }
                    </div>
                : null
            }
        </div>
    )
}

export default CustomSelect