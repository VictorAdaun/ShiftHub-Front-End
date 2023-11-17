import React, { useEffect, useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import { SchedulesTable } from "../../../components/tables/schedules"
import Icon from "../../../components/icon"
import Avatar_1 from "../../../assets/imgs/test_avatar.png"
import Avatar_2 from "../../../assets/imgs/test_avatar_2.png"
import PrimaryButton from "../../../components/button/primary-button"
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"
import { useLocation } from "react-router-dom"
import EmptySlot from "../../../assets/user.svg"
import { useAuthContext } from "../../../context/auth"



function SingleSchedule() {


    const ctx = useAuthContext()

    const location = useLocation()

    const queryClient = useQueryClient()

    const paths = useMemo(() => (location.pathname.split("/")), [location.pathname]);

    const locationArray = location.pathname.split("/")


    function calculateDuration(start, end) {
        const startTime = new Date(`01/01/2023 ${start}`).valueOf();
        const endTime = new Date(`01/01/2023 ${end}`).valueOf();
        const durationInMs = endTime - startTime;
        const durationInHours = durationInMs / (1000 * 60 * 60);
        return durationInHours;
    }

    // fetch schedule request

    const currentWeek = ctx.currentWeek;
    const currentYear = ctx.currentYear;
    const [currentDate, setCurrentDate] = useState(new Date())


    const fetchSchedule = async () => {
        const { data } = await axiosInstance.get(`/api/schedule/${locationArray[locationArray.length - 1]}?week=${currentWeek}&year=${currentYear}`)
        return data.result
    }

    const scheduleQuery = useQuery(["schedule", currentWeek, currentYear],
        fetchSchedule, {
        onSuccess: (data) => {
            console.log(data.data, "hey")
            ctx.setData({ ...ctx, scheduleData: transformData(data.data.data) })

            setColumnDate(getDaysInWeek())
        }, enabled: !!currentWeek && !!currentYear
    })

    // Transforming data being used before sent to table
    function transformData(inputData) {
        const shifts = inputData?.reduce((acc, current) => {
            const { day, timeFrame } = current;
            const dayName = day.toLowerCase();
            const formattedShift = {
                shift: timeFrame.toUpperCase(),
                availability: {
                    [dayName]: {
                        id: current.id,
                        neededWorkers: current.neededWorkers,
                        availableWorkers: current.availableWorkers,
                        availability: current.status === "Available",
                        individuals: current.workers.map((worker) => ({
                            name: `${worker.first_name} ${worker.last_name}`,
                            email: worker.email,
                        })),
                        start_time: current.startTime.substr(0, 5),
                        end_time: current.endTime.substr(0, 5),
                        duration: calculateDuration(current.startTime.substr(0, 5), current.endTime.substr(0, 5)),
                    },
                },
            };

            const existingShift = acc.find(item => item.shift === formattedShift.shift);
            if (existingShift) {
                if (!existingShift.availability[dayName]) {
                    existingShift.availability[dayName] = {
                        availability: formattedShift.availability[dayName].availability,
                        individuals: [],
                        start_time: formattedShift.availability[dayName].start_time,
                        duration: formattedShift.availability[dayName].duration,
                    };
                }
            } else {
                acc.push(formattedShift);
            }

            return acc;
        }, []);


        // Add missing days and shifts
        const allDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const allShifts = ["MORNING", "AFTERNOON", "EVENING"];

        allShifts.forEach((shift) => {
            const shiftExists = shifts?.some((item) => item.shift === shift);
            if (!shiftExists) {
                const emptyShift = {
                    shift: shift,
                    availability: {},
                };
                allDays.forEach((day) => {
                    emptyShift.availability[day] = {};
                });
                shifts?.push(emptyShift);
            } else {
                allDays.forEach((day) => {
                    const shiftIndex = shifts.findIndex((item) => item.shift === shift);
                    const dayExists = day in shifts[shiftIndex].availability;
                    if (!dayExists) {
                        shifts[shiftIndex].availability[day] = {};
                    }
                });
            }
        });

        const shiftOrder = {
            MORNING: 1,
            AFTERNOON: 2,
            EVENING: 3,
        };

        // Sort the shifts array based on the shiftOrder
        const sortedShifts = shifts.sort((a, b) => shiftOrder[a.shift] - shiftOrder[b.shift]);

        return sortedShifts;
    }

    // Column formatting and data

    const getStartAndEndDateOfWeek = (weekNumber: number, year: number): [Date, Date] => {
        const januaryFirst = new Date(year, 0, 1);
        const dayOfFirst = januaryFirst.getDay();
        const daysToAdd = 1 - dayOfFirst + (weekNumber - 1) * 7;

        const startDate = new Date(year, 0, daysToAdd);
        const endDate = new Date(year, 0, daysToAdd + 6);

        return [startDate, endDate];
    };

    const getDaysInWeek = (): string[] => {

        const year = currentDate.getFullYear();

        const [startOfWeek] = getStartAndEndDateOfWeek(Number(currentWeek), year);
        const daysInWeek: string[] = [];

        for (let i = 1; i <= 7; i++) {
            const currentDateWithinWeek = new Date(startOfWeek.getTime() + i * (1000 * 60 * 60 * 24));
            const yyyy = String(currentDateWithinWeek.getFullYear()).substring(2, 4);
            let dd: number | string = currentDateWithinWeek.getDate();

            if (Number(dd) < 10) {
                dd = "0" + String(dd);
            }

            daysInWeek.push(`${dd}/${yyyy}`);
        }

        return daysInWeek;
    };
    

    const [columnDate, setColumnDate] = useState(getDaysInWeek())

    const columns = useMemo(
        () => [
            {
                header: 'Shifts',
                cell: (row) => row.renderValue(),
                accessorKey: 'shift',
                accessorFn: (row) => {
                    return (
                        <div>
                            <p>{row.shift}</p>
                            <em>{row.shift === "MORNING" ? "08:00 - 12am" : row.shift === "AFTERNOON" ? "12:00 - 04pm" : "04:00 - 08pm"}</em>
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Monday</p>
                        <em>{columnDate[0]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Monday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.monday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.monday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.monday.availability !== undefined ? <em>{`${row.availability.monday.availableWorkers}/${row.availability.monday.neededWorkers + row.availability.monday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.monday.availability !== undefined && row.availability.monday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.monday.availability !== undefined && row.availability.monday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Tuesday</p>
                        <em>{columnDate[1]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Tuesday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.tuesday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.tuesday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.tuesday.availability !== undefined ? <em>{`${row.availability.tuesday.availableWorkers}/${row.availability.tuesday.neededWorkers + row.availability.tuesday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.tuesday.availability !== undefined && row.availability.tuesday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.tuesday.availability !== undefined && row.availability.tuesday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            }, {
                header: () => (
                    <div>
                        <p>Wednesday</p>
                        <em>{columnDate[2]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Wednesday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.wednesday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.wednesday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.wednesday.availability !== undefined ? <em>{`${row.availability.wednesday.availableWorkers}/${row.availability.wednesday.neededWorkers + row.availability.wednesday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.wednesday.availability !== undefined && row.availability.wednesday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.wednesday.availability !== undefined && row.availability.wednesday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Thursday</p>
                        <em>{columnDate[3]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Thursday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.thursday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.thursday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.thursday.availability !== undefined ? <em>{`${row.availability.thursday.availableWorkers}/${row.availability.thursday.neededWorkers + row.availability.thursday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.thursday.availability !== undefined && row.availability.thursday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.thursday.availability !== undefined && row.availability.thursday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            }, {
                header: () => (
                    <div>
                        <p>Friday</p>
                        <em>{columnDate[4]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Friday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.friday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.friday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.friday.availability !== undefined ? <em>{`${row.availability.friday.availableWorkers}/${row.availability.friday.neededWorkers + row.availability.friday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.friday.availability !== undefined && row.availability.friday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.friday.availability !== undefined && row.availability.friday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Saturday</p>
                        <em>{columnDate[5]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Saturday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.saturday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.saturday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.saturday.availability !== undefined ? <em>{`${row.availability.saturday.availableWorkers}/${row.availability.saturday.neededWorkers + row.availability.saturday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.saturday.availability !== undefined && row.availability.saturday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.saturday.availability !== undefined && row.availability.saturday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Sunday</p>
                        <em>{columnDate[6]}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Sunday",
                accessorFn: (row) => {
                    return (
                        <div className="cell">
                            <div className="container">
                                {row.availability.sunday.availability === false ?
                                    <div className="status booked">
                                        <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                        <p>Booked</p>
                                    </div> : row.availability.sunday.availability === true ?
                                        <div className="status available">
                                            <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                            <p>Available</p>
                                        </div> : <div className="status empty bg-grayscale-40 text-grayscale-0">
                                            <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                            <p>Empty</p>
                                        </div>}
                                {row.availability.sunday.availability !== undefined ? <em>{`${row.availability.sunday.availableWorkers}/${row.availability.sunday.neededWorkers + row.availability.sunday.availableWorkers}`}</em> : null}
                            </div>
                            {row.availability.sunday.availability !== undefined && row.availability.sunday.individuals.length === 0 ?
                                <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                    <img src={EmptySlot} alt="empty slot" />
                                </div> : row.availability.sunday.availability !== undefined && row.availability.sunday.individuals.length > 0 ?
                                    <div className="avatars">
                                        <img src={Avatar_1} alt="test avatar" />
                                        <img src={Avatar_2} alt="test avatar 2" />
                                    </div> :
                                    <div className="h-[30px] w-[30px] rounded-full bg-grayscale-20">
                                        <img src={EmptySlot} alt="empty slot" />
                                    </div>}
                        </div>
                    )
                },
            },
        ], [columnDate]
    )

    const publishScheduleRequest = (data) => {
        return axiosInstance.put(`/api/schedule/publish/${data.id}?status=${data.status}`)
    }

    const publishScheduleMutation = useMutation({
        mutationFn: publishScheduleRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            queryClient.invalidateQueries("schedule")
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })


    // Button bar functions
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];


    const [currentNumber, setCurrentNumber] = useState(0)

    const [dropDown, setDropdown] = useState("Weekly")

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)


    const formattedDateRange = (currentDate) => {
        const currentDay = currentDate.getDay();
        const daysToAdd = currentDay === 0 ? 6 : currentDay - 1; // Days from current day to previous Monday

        const previousMonday = new Date(currentDate);
        previousMonday.setDate(currentDate.getDate() - daysToAdd);

        const endDate = new Date(previousMonday);
        endDate.setDate(previousMonday.getDate() + 6);

        const startMonth = months[previousMonday.getMonth()];
        const startDay = previousMonday.getDate();
        const endDay = endDate.getDate();
        const endMonth = months[endDate.getMonth()];

        return startMonth === endMonth ? `${startMonth} ${startDay} - ${endDay}` : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    };



    const formattedDayRange = (date, day) => {
        const formattedDate = new Date(date);
        const dayOfWeek = formattedDate.getDay();
        const daysToAdd = dayOfWeek === 0 ? -6 + day : 1 - dayOfWeek + day;

        formattedDate.setDate(formattedDate.getDate() + daysToAdd);

        const month = months[formattedDate.getMonth()];
        const dayOfMonth = formattedDate.getDate();

        return `${month} ${dayOfMonth}`;
    }



    const formatDateHeader = (inputDate) => {

        const dateParts = inputDate.split(' ');
        const monthIndex = months.findIndex(month => month === dateParts[0]);

        const formattedDate = new Date(2024, monthIndex, parseInt(dateParts[1], 10));

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[formattedDate.getDay()];

        const dayOfMonth = formattedDate.getDate().toString().padStart(2, '0');
        const dayOfYear = formattedDate.getFullYear().toString().substring(2);

        return `${dayName}, ${dayOfMonth}/${dayOfYear}`;
    }

    const dayHeaderId = formatDateHeader(formattedDayRange(currentDate, currentNumber)).split(",")[0]

    const dayHeader = formatDateHeader(formattedDayRange(currentDate, currentNumber))

    // Getting week number from day range (e.g. "Jan 1 - Jan 7") to send to backend
    function getWeekNumber(date) {
        const weekStart = new Date(date.getFullYear(), 0, 1);
        const diff = date - weekStart.getTime();
        const oneWeek = 604800000; // milliseconds in a week
        const weekNumber = Math.ceil((diff + 1) / oneWeek);
        return weekNumber;
    }

    function getWeekNumberFromDateRange(dateRange) {
        const [startStr, endStr] = dateRange.split('-').map((date) => date.trim());
        const [startMonth, startDay] = startStr.split(' ');
        const [endMonth, endDay] = endStr.split(' ');

        const startDate = new Date(`${startMonth} ${startDay}, ${new Date().getFullYear()}`);
        const endDate = new Date(`${endMonth} ${endDay}, ${new Date().getFullYear()}`);

        const startWeek = getWeekNumber(startDate);
        const endWeek = getWeekNumber(endDate);

        if (startWeek === endWeek) {
            return startWeek; // revisit this
        } else {
            return startWeek;
        }
    }

    useEffect(() => {
        console.log(getDaysInWeek(), dayHeader, dayHeaderId)
      }, [currentDate])

    return (
        <>
            <ToastContainer />
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <>
                                <p className="capitalize last:text-lydia">{path}</p>
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </>
                        );
                    })}
                </div>
                <div className="heading flex mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Schedule</h2>
                        <p className="text-sm text-grayscale-60">Understand where the problem lies and act efficiently before it is too late</p>
                    </div>
                    <div className="btn-group w-1/3 flex gap-8 items-center">
                        <PrimaryButton
                            onClick={() => publishScheduleMutation.mutate({ id: scheduleQuery.data?.data.id, status: true })}
                            className="w-fit disabled:bg-grayscale-40 disabled:cursor-not-allowed"
                            disabled={scheduleQuery.data?.data.isPublished}>Publish Schedule</PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit"><Icon name="ellipsis" /></PrimaryButton>
                    </div>
                </div>

                <div className="btn-bar flex justify-between mt-8">
                    <div className="flex gap-4">
                        <div className="relative z-[0]">
                            <PrimaryButton className="px-[16px]  !w-[105px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 flex gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {dropDown}
                                <Icon name="downLight" />
                            </PrimaryButton>
                            {isDropdownOpen ?
                                <div className="options bg-white h-auto w-[105px] absolute top-[55px] !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm p-[16px] flex flex-col gap-2">
                                    <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                        setDropdown("Weekly")
                                        setIsDropdownOpen(false)
                                    }}>Weekly</p>
                                    <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                        setDropdown("Daily")
                                        setIsDropdownOpen(false)
                                    }}>Daily</p>
                                </div> : null}
                        </div>
                        <div className="flex !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm items-center">
                            <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                                onClick={() => {
                                    if (dropDown === "Daily") {
                                        if (currentNumber > 0) {
                                            setCurrentNumber(currentNumber - 1)
                                        }
                                    } else {
                                        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))

                                        // setting date range in context
                                        ctx.setData(prevState => ({ ...prevState, dateRange: formattedDateRange(currentDate) }));

                                        // Setting current week and year in context

                                        ctx.setData(prevState => ({
                                            ...prevState,
                                            currentWeek: getWeekNumberFromDateRange(formattedDateRange(currentDate)).toString(),
                                            currentYear: new Date().getFullYear().toString()
                                        }));
                                    }
                                }}>
                                <Icon name="leftLight" />
                            </PrimaryButton>
                            <span>{dropDown === "Weekly" ? formattedDateRange(currentDate) :
                                <p>{formattedDayRange(currentDate, currentNumber)}</p>}</span>
                            <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                                onClick={() => {
                                    if (dropDown === "Daily") {
                                        if (currentNumber < 6) {
                                            setCurrentNumber(currentNumber + 1)
                                        }
                                    } else {
                                        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))

                                        // setting date range in context
                                        ctx.setData(prevState => ({ ...prevState, dateRange: formattedDateRange(currentDate) }));

                                        // Setting current week and year in context
                                        ctx.setData(prevState => ({
                                            ...prevState,
                                            currentWeek: getWeekNumberFromDateRange(formattedDateRange(currentDate)).toString(),
                                            currentYear: new Date().getFullYear().toString()
                                        }));
                                    }
                                }}
                            >
                                <Icon name="rightLight" />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                {scheduleQuery.isLoading ?
                    <section className="w-full h-[500px] my-8 flex flex-col items-center justify-center gap-2">
                        <img src={MainLoader} alt="Loading" />
                    </section> :
                    <>
                        <SchedulesTable data={transformData(scheduleQuery.data.data.data)} columns={columns} extraData={{ dropDown, dayHeader, dayHeaderId }} />
                    </>}
            </div>
        </>
    );
}

export default SingleSchedule;
