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
        <div className="relative z-[0]">
            <button className={`px-2 py-1 w-[102px] flex items-center !bg-[${selectedValue.bgColor}] rounded-[5px] whitespace-nowrap`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className={`w-[6px] h-[6px] bg-[${selectedValue.color}] mr-1 rounded-full`}></div>
                <h3 className={`!text-[${selectedValue.color}]`}>{selectedValue.label}</h3>
                <Icon name="downLight"
                    className={`fill-${selectedValue.color} ml-2`}
                />
            </button>
            {
                isDropdownOpen ?
                    <div className="options bg-white h-auto w-[102px] absolute top-[0] !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm p-[16px] flex flex-col gap-2">
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