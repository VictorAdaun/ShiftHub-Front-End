import React, { useState } from 'react'
import PrimaryButton from '../../button/primary-button';
import Icon from '../../icon';
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormError from "../../../components/form/form-error"

const schema = yup
    .object({
        shifts: yup.array().of(
            yup.object().shape({
                shift: yup.array().of(
                    yup.object().shape({
                        start_time: yup.string().when('isOpen', {
                            is: (true),
                            then: () => yup.string().required("Start time is required"),
                            otherwise: () => yup.string(),
                        }),
                        end_time: yup.string().when('isOpen', {
                            is: true,
                            then: () => yup.string().required("End time is required"),
                            otherwise: () => yup.string(),
                        }),
                        slot: yup.string().when('isOpen', {
                            is: true,
                            then: () => yup.number().typeError('Please select number'),
                            otherwise: () => yup.string(),
                        }),
                        isOpen: yup.boolean(),
                    })
                ),
            })
        ),

        maxTimeAfter: yup.number().typeError('Please select a maximum time after value'),
        minTimeBefore: yup.number().typeError('Please select a minimum time before value')
    })
    .required();


function ShiftBooking() {

    // Form elements
    const {
        register,
        handleSubmit,
        control,
        reset,
        setError,
        clearErrors,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "shifts",
    });

    const appendShift = () => {
        append({ shift: [{ start_time: "", end_time: "", slot: "" }] });
    };

    const removeShift = (day) => {
        const dayIndex = checkedDays.findIndex(d => d === day);
        if (dayIndex !== -1) {
            setCheckedDays(checkedDays.filter(d => d !== day));
            remove(dayIndex);
        }
    };

    // State
    const [checkedDays, setCheckedDays] = useState([])

    const [openSlots, setOpenSlots] = useState([]);

    const [formError, setFormError] = useState(null)

    // component handlers/methods
    const handleCheckboxChange = (e, day) => {
        if (checkedDays.includes(day)) {
            setCheckedDays(checkedDays.filter(d => d !== day));

            removeShift(day) // Remove the shift associated with the unchecked day

        } else {
            setCheckedDays([...checkedDays, day]);
            appendShift() // Append a new shift for the checked day
        }
    };

    const toggleSlot = (dayIndex, slotIndex) => {
        const newOpenSlots = [...openSlots];
        const existingSlotIndex = newOpenSlots.findIndex(slot => slot.day === dayIndex && slot.slot === slotIndex);

        if (existingSlotIndex > -1) {
            newOpenSlots.splice(existingSlotIndex, 1);
        } else {
            newOpenSlots.push({ day: dayIndex, slot: slotIndex });
        }

        setOpenSlots(newOpenSlots);
    };

    const validateOpenSlots = (data) => {
        const isOpenExists = data.every(day => day.shift.some(slot => slot.isOpen));
        if (!isOpenExists) {
            setError('shifts', {
                type: 'manual',
                message: 'At least one slot must be open in any day.',
            });
        } else {
            clearErrors('shifts');
        }
    };

    // Time array for drop down
    function generateTimeArray() {
        const startHour = 8;
        const endHour = 20;
        const timeArray = [];

        for (let hour = startHour; hour < endHour; hour++) {
            if (hour < 12) {
                timeArray.push({
                    value: `${hour.toString().padStart(2, '0')}:00:00 AM`,
                    label: `${hour.toString().padStart(2, '0')}:00 AM`
                });
                timeArray.push({
                    value: `${hour.toString().padStart(2, '0')}:30:00 AM`,
                    label: `${hour.toString().padStart(2, '0')}:30 AM`
                });
            } else {
                timeArray.push({
                    value: `${hour.toString().padStart(2, '0')}:00:00 PM`,
                    label: `${hour.toString().padStart(2, '0')}:00  PM`
                });
                timeArray.push({
                    value: `${hour.toString().padStart(2, '0')}:30:00 PM`,
                    label: `${hour.toString().padStart(2, '0')}:30 PM`
                });
            }

        }

        timeArray.push({
            value: `${endHour.toString().padStart(2, '0')}:00:00 PM`,
            label: `${endHour.toString().padStart(2, '0')}:00 PM`
        });
        return timeArray;
    }

    const timeSlots = generateTimeArray();

    const handleScheduleCreate = (data) => {

        console.log(data)

        const transformData = (data) => {
            const { shifts } = data;

            const availability = shifts.map(({ shift }, id) => {

                const day = checkedDays[id]

                const data = shift.map((s, index) => {
                    const timeOfDay = index === 0 ? 'MORNING' : index === 1 ? 'AFTERNOON' : 'EVENING';
                    const startTime = s.isOpen ? s.start_time : '';
                    const endTime = s.isOpen ? s.end_time : '';
                    const userCount = s.isOpen ? s.slot : '';

                    if (s.isOpen) {
                        return { time: timeOfDay, startTime, endTime, userCount };
                    }

                }).filter(shift => shift !== undefined);

                return { day, data };
                //   filter out undefined shifts
            }).filter(entry => entry.data !== undefined);

            return {
                title: data.scheduleTitle,
                repeat: data.repeat === 'repeat',
                maxHoursBefore: data.minTimeBefore,
                maxHoursAfter: data.maxTimeAfter,
                availability,
            };
        };

        // Validating shifts and select day checkbox
        validateOpenSlots(watch('shifts'))
        checkedDays.length < 1 ? setFormError('Select a day') : setFormError(null)

        // scheduleMutation.mutate(transformData(data))
    }

    return (
        <div className="schedule-modal w-[90%] h-[80%] ">
            <form className="text-center w-full flex flex-col gap-4" onSubmit={handleSubmit(handleScheduleCreate)}>
                <div className="flex justify-between">
                    <h2 className='font-bold'>Shift Booking </h2>
                    <Icon name="close" />
                </div>

                <div className='flex items-center gap-2'>
                    <p className='text-grayscale-60'>Book your availability for this week:</p>
                    <p>Sept 04 - 09</p>
                </div>
               
                <div className="button-wrap">
                    {["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].map((checkbox, index) => {
                        return (
                            <div key={index}>
                                <input
                                    className="hidden radio-label"
                                    id={`days-${index}`}
                                    type="checkbox"
                                    name={`days-${index}`}
                                    checked={checkedDays.includes(checkbox)} onChange={(e) => handleCheckboxChange(e, checkbox)} />
                                <label className="button-label" htmlFor={`days-${index}`}>
                                    <h1 className="capitalize">{checkbox.substring(0, 3)}</h1>
                                </label>
                            </div>
                        );
                    })}
                </div>

                {formError && (
                    <FormError
                        error={formError}
                    />)}

                <div className={"relative"}>
                    {fields.map((day, dayIndex) => {
                        return (
                            <div key={dayIndex} className={`slots-container relative w-full`}>
                                <p className="text-left text-grayscale-60 my-4">{checkedDays[dayIndex]}</p>
                                {["morning", "noon", "evening"].map((shift, slotIndex) => {

                                    const isOpen = openSlots.some(slot => slot.day === dayIndex && slot.slot === slotIndex);

                                    return (
                                        <div key={slotIndex}>
                                            <div className={`slots flex items-center gap-4 mb-4`}>
                                                <div className={`container border border-solid border-grayscale-40 rounded-md p-[10px] ${isOpen ? "activeSlot" : null}`}>
                                                    <div className="unavailable flex justify-between items-center my-4">
                                                        <div className="flex gap-2 items-center justify-center">
                                                            <Icon name={shift} />
                                                            <p>{shift}</p>
                                                        </div>

                                                        {/* Input to track isOpen state and persist to hook form for conditional validation */}
                                                        <input
                                                            type="checkbox"
                                                            {...register(`shifts.${dayIndex}.shift.${slotIndex}.isOpen`)}
                                                            checked={isOpen}
                                                            style={{ display: 'none' }} // Hide the checkbox
                                                        />

                                                        <div className="text-grayscale-60">
                                                            {!isOpen ?
                                                                <p>Unavailable</p> :
                                                                <div className="field-time flex items-center gap-4">
                                                                    <div>
                                                                        <Controller
                                                                            name={`shifts.${dayIndex}.shift.${slotIndex}.start_time`}
                                                                            control={control}
                                                                            rules={{ required: true }}
                                                                            render={({ field }) => (
                                                                                <select
                                                                                    {...field}
                                                                                    defaultValue={""}
                                                                                    className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"

                                                                                >
                                                                                    <option value="" disabled>Select...</option>
                                                                                    {timeSlots.map((time, id) => {
                                                                                        // console.log(time)
                                                                                        return (
                                                                                            <option key={id} value={time.value}>{time.label}</option>
                                                                                        );
                                                                                    })}
                                                                                </select>
                                                                            )}
                                                                        />

                                                                        {isOpen && !watch(`shifts.${dayIndex}.shift.${slotIndex}.start_time`) && (
                                                                            <FormError
                                                                                error={errors.shifts?.[dayIndex]?.shift?.[slotIndex]?.start_time.message}
                                                                            />)}
                                                                    </div>
                                                                    <em>-</em>
                                                                    <div>
                                                                        <Controller
                                                                            name={`shifts.${dayIndex}.shift.${slotIndex}.end_time`}
                                                                            control={control}
                                                                            rules={{ required: true }}
                                                                            render={({ field }) => (
                                                                                <select
                                                                                    {...field}
                                                                                    defaultValue={""}
                                                                                    className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"

                                                                                >
                                                                                    <option value="" disabled>Select...</option>
                                                                                    {timeSlots.map((time, id) => {
                                                                                        return (
                                                                                            <option key={id} value={time.value}>{time.label}</option>
                                                                                        );
                                                                                    })}
                                                                                </select>
                                                                            )}
                                                                        />
                                                                        {isOpen && !watch(`shifts.${dayIndex}.shift.${slotIndex}.end_time`) && (
                                                                            <FormError
                                                                                error={errors.shifts?.[dayIndex]?.shift?.[slotIndex]?.end_time.message}
                                                                            />)}
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                    {isOpen ?
                                                        <div className="open-slots flex justify-between items-center mb-4">
                                                            <div className="flex gap-2 items-center justify-center">
                                                                <Icon name="profile" />
                                                                <p>Open slots</p>
                                                            </div>
                                                            <input type="number" name="slot" placeholder="e.g 8" className="w-16 border border-solid border-grayscale-40 rounded-md p-2 text-center outline-none text-grayscale-60"
                                                                {...register(`shifts.${dayIndex}.shift.${slotIndex}.slot`)}

                                                            />
                                                            {isOpen && !watch(`shifts.${dayIndex}.shift.${slotIndex}.slot`) && (
                                                                <FormError
                                                                    error={errors.shifts?.[dayIndex]?.shift?.[slotIndex]?.slot.message}
                                                                />)}
                                                        </div>
                                                        : null}
                                                </div>
                                                <div className="h-fit cursor-pointer" onClick={() => {
                                                    toggleSlot(dayIndex, slotIndex)
                                                    setValue(`shifts.${dayIndex}.shift.${slotIndex}.isOpen`, !isOpen);
                                                }}>
                                                    {!isOpen ? <Icon name="add" /> : <Icon name="forbidden" />}
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>

                        );
                    })}
                    {/* Error for selecting at least one slot in a day */}
                    {errors.shifts && (
                        <FormError
                            error={errors.shifts.message}
                        />)}
                </div>

                <PrimaryButton type="submit" className="!w-1/4">
                    Continue
                </PrimaryButton>
            </form>

            <div className="force-margin h-[50px] w-full text-white"><p>Margin</p></div>
        </div>
    )
}

export default ShiftBooking