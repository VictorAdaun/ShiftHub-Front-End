import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import TaskSidebar from "../../../components/task/task-sidebar"
import { useNavigate } from "react-router-dom"


function TaskList() {


    const paths = useMemo(() => (location.pathname.split("/")), [])

    const navigate = useNavigate()

    const taskInputRef = useRef(null)

    const [tasks, setTasks] = useState([])

    const addTask = () => {
        if (taskInputRef.current.value !== "") {
            setTasks([...tasks, taskInputRef.current.value])
            taskInputRef.current.value = ""
        }
    }

    const keyDownHandle = (e) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((item, index) => index !== id))
    }

    const handleTaskList = () => {
        console.log(tasks)

        localStorage.setItem("taskList", JSON.stringify(tasks));

        navigate("/task/create-task/assign-task")

    }

    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <div className="flex gap-2" key={id}>
                                {path !== "" ? <p className="capitalize last:text-lydia">{path}</p> : null}
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </div>
                        );
                    })}
                </div>

                <div className="heading flex items-center mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Task</h2>
                        <p className="text-sm text-grayscale-60">Tres vubösm trens. Pode kanade för plaskap. </p>
                    </div>
                </div>

                <section className="my-8 flex gap-16">
                    <div className="task-left w-1/4">
                        <TaskSidebar />
                    </div>
                    <div className="task-right w-1/2">
                        {tasks.map((task, id) => {
                            return (
                                <div key={id} className="flex items-center justify-between p-4 border-b border-grayscale-40 border-solid mb-4">
                                    <p className="text-grayscale-100">{task}</p>
                                    <div className="cursor-pointer h-[16px] w-[16px]" onClick={() => deleteTask(id)}>
                                        <Icon name="trash" />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="relative">
                            <input name="addTask" ref={taskInputRef} placeholder="Add a task..." className="border-b border-grayscale-40 border-solid my-4 w-full p-4 outline-none"
                                onKeyDown={(e) => keyDownHandle(e)}
                            />
                            <div className="absolute right-5 top-[30px] h-[16px] w-[16px] cursor-pointer" onClick={() => addTask()}>
                                <Icon name="add" />
                            </div>
                        </div>

                        <PrimaryButton onClick={() => handleTaskList()} className="!px-4 !py-4 disabled:bg-[#F9FAFB] disabled:text-grayscale-40" disabled={tasks.length < 1}>Continue</PrimaryButton>
                    </div>
                </section>
            </div>
        </>
    );
}

export default TaskList;
