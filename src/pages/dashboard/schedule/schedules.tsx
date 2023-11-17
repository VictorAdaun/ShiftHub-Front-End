import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import ScrollableModal from "../../../components/scrollable-modal"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormError from "../../../components/form/form-error"
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/axios";
import Loader from "../../../assets/whiteLoader.gif"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"
import { useNavigate } from "react-router-dom"

const schema = yup
    .object({
        scheduleTitle: yup.string().required('Schedule title is required'),
        repeat: yup.string().required('Please select a repeat option'),
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

function Schedules() {
    const navigate = useNavigate()

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

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

    const [openScheduleMenu, setOpenScheduleMenu] = useState(null)

    const [checkedDays, setCheckedDays] = useState([])

    const [openSlots, setOpenSlots] = useState([]);

    const [formError, setFormError] = useState(null)

    const toggleScheduleMenu = (index) => {
        setOpenScheduleMenu((prev) => {
            if (prev === index) {
                return null
            } else {
                return index
            }
        })
    }


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

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const queryClient = useQueryClient()

    const scheduleRequest = (data) => {
        return axiosInstance.post(`/api/schedule/create`, data)
    }

    const scheduleMutation = useMutation({
        mutationFn: scheduleRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            reset()

            setIsScheduleModalOpen(false)

            queryClient.invalidateQueries('schedules')
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })


    const handleScheduleCreate = (data) => {
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

        scheduleMutation.mutate(transformData(data))
    }

    const fetchSchedules = async () => {
        const { data } = await axiosInstance.get("/api/schedule")
        return data.result.data
    }
    const schedulesQuery = useQuery("schedules",
        fetchSchedules, {
        onSuccess: (data) => {
            console.log(data)
        },
    })

    const deleteScheduleRequest = (data) => {
        return axiosInstance.delete(`/api/schedule/${data.id}`)
    }

    const deleteScheduleMutation = useMutation({
        mutationFn: deleteScheduleRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            queryClient.invalidateQueries("schedules")

            setOpenScheduleMenu(null)
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })

    const publishScheduleRequest = (data) => {
        return axiosInstance.put(`/api/schedule/publish/${data.id}?status=${data.status}`)
    }

    const publishScheduleMutation = useMutation({
        mutationFn: publishScheduleRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            queryClient.invalidateQueries("schedules")
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })


    return (
        <>
            <ToastContainer />
            <ScrollableModal
                handleClose={() => setIsScheduleModalOpen(false)}
                isOpen={isScheduleModalOpen}
            >
                <div className="schedule-modal w-[90%]  h-[80%]">
                    <form className="text-center w-full flex flex-col gap-4" onSubmit={handleSubmit(handleScheduleCreate)}>
                        <div className="flex justify-between">
                            <h2>Schedule Title </h2>
                            <Icon name="close" />
                        </div>
                        <div className="field w-full">
                            <input
                                {...register("scheduleTitle")}
                                type="text"
                                placeholder="Add title"
                                className="w-[inherit] border border-solid border-grayscale-40 rounded-md p-[10px] outline-none" />
                            {errors.scheduleTitle && <FormError
                                error={errors.scheduleTitle.message}
                            />}
                        </div>
                        <div className="field flex items-center justify-between gap-2">
                            <div className="text-left">
                                <p>Availability</p>
                                <em className="text-sm text-grayscale-60 font-normal">Lorem ipsum is the printing something</em>
                            </div>
                            <div className="flex flex-col text-left">
                                <Controller
                                    name={"repeat"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            defaultValue={""}
                                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                                        >
                                            <option value={""}>Select frequency</option>
                                            <option value={"repeat"}>Repeat weekly</option>
                                            <option value={"no-repeat"}>Does not repeat</option>
                                        </select>
                                    )}
                                />
                                {errors.repeat && <FormError
                                    error={errors.repeat.message}
                                />}
                            </div>
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
                            {formError && (
                                <FormError
                                    error={formError}
                                />)}
                        </div>

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
                        <div className="booking">
                            <div className="container">
                                <div className="heading text-left">
                                    <h2 className="text-lg">Booking window</h2>
                                    <p className="text-grayscale-60">Limit the time range that employees can book a shift</p>
                                </div>
                                <div className="booking-window flex justify-between items-center my-4 gap-4">
                                    <div className="field flex flex-col w-full text-left relative">
                                        <label>Max time after</label>
                                        <div className="flex w-full flex-col">
                                            <input
                                                {...register("maxTimeAfter")}
                                                type="number"
                                                placeholder="hours after"
                                                className="w-[inherit] border border-solid border-grayscale-40 rounded-md p-[10px] outline-none" />
                                            {errors.maxTimeAfter && <FormError
                                                error={errors.maxTimeAfter.message}
                                            />}
                                        </div>
                                    </div>
                                    <div className="field flex flex-col w-full text-left relative">
                                        <label>Min time before</label>
                                        <div className="flex w-full flex-col">
                                            <input
                                                {...register("minTimeBefore")}
                                                type="number"
                                                placeholder="hours before"
                                                className="w-[inherit] border border-solid border-grayscale-40 rounded-md p-[10px] outline-none" />
                                            {errors.minTimeBefore && <FormError
                                                error={errors.minTimeBefore.message}
                                            />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns flex justify-end">
                            <PrimaryButton inverted className="!w-1/4">
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton type="submit" className="!w-1/4">
                                {scheduleMutation.isLoading ? <img src={Loader} className="h-[30px] w-[30px] mx-auto" alt="Loading" /> : "Continue"}
                            </PrimaryButton>
                        </div>
                        <div className="force-margin h-[50px] w-full text-white"><p>Margin</p></div>
                    </form>
                </div>
            </ScrollableModal >
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <div className="flex gap-2" key={id}>
                                <p className="capitalize last:text-lydia">{path}</p>
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </div>
                        );
                    })}
                </div>
                <div className="heading flex mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Schedule</h2>
                        <p className="text-sm text-grayscale-60">Understand where the problem lies and act efficiently before it is too late</p>
                    </div>
                    <div className="btn-group w-1/3 flex gap-8 items-center">
                        <PrimaryButton className="w-fit" onClick={()=> {
                            setIsScheduleModalOpen(true)
                        }}>New Schedule</PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit"><Icon name="ellipsis" /></PrimaryButton>
                    </div>
                </div>
                {schedulesQuery.isLoading ?
                    <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                        <img src={MainLoader} alt="main loader" />
                    </section>
                    : schedulesQuery.data?.data?.length < 1 ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                        <img src={Empty} alt="no schedule" />
                        <h2>No shifts are scheduled</h2>
                        <p className="text-grayscale-60 text-sm">Create and publish your schedule</p>
                        <PrimaryButton
                            className="!w-fit !px-4 mt-2"
                            onClick={() => setIsScheduleModalOpen(true)}
                        >Get Started</PrimaryButton>
                    </section> :
                        <section className="schedules">
                            {schedulesQuery.data.data.map((schedule, id) => {
                                return (
                                    <div key={id} className="schedule w-full my-8 border border-solid border-grayscale-30 rounded-md flex p-4 justify-between relative">
                                        <div>
                                            <p>{schedule.title}</p>
                                            <em className="not-italic text-grayscale-60 text-sm">{schedule.repeat ? "Repeat weekly" : "Do no repeat"}</em>
                                        </div>
                                        <div className="flex gap-8 items-center">
                                            <div className="checkbox relative top-[5px]">
                                                <input 
                                                name={schedule} 
                                                value={schedule} 
                                                className="" 
                                                id={`active-${id}`} 
                                                type="checkbox" 
                                                checked={schedule.isPublished} 
                                                onChange={() => publishScheduleMutation.mutate({id: schedule.id, status: !schedule.isPublished})} />
                                                <label htmlFor={`active-${id}`}></label>
                                            </div>
                                            <div className="mr-4 cursor-pointer flex items-center justify-center" onClick={() => toggleScheduleMenu(id)}>
                                                {openScheduleMenu === id ? <Icon name="ellipsisLydia" /> : <Icon name="ellipsis" />}
                                            </div>
                                        </div>
                                        <div className={`options absolute right-[10px] top-[70px] rounded-md flex flex-col shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08),0_8px_8px_-4px_rgba(16,24,40,0.03)] transition-opacity opacity-[0] z-[-1] ${openScheduleMenu === id ? "opacity-[1] !z-[2]" : null}`}>
                                            <button 
                                            onClick={()=> navigate(`/schedule/schedules/${schedule.id}`)}
                                            className="w-full bg-white h-auto p-[8px] flex gap-2 items-center text-grayscale-60 text-sm hover:bg-grayscale-40 hover:text-grayscale-100"
                                            ><Icon name="eye" />View Schedule</button>
                                            <button
                                            onClick={()=> deleteScheduleMutation.mutate({id: schedule.id})} 
                                            className="w-full bg-white h-auto p-[8px] flex gap-2 items-center text-grayscale-60 text-sm hover:bg-grayscale-40 hover:text-grayscale-100 rounded-b-md"
                                            ><Icon name="trash" />Delete Schedule</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>}
            </div>
        </>
    );
}

export default Schedules;
