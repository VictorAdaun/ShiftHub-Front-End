import React, { useMemo, useState, useEffect, useCallback } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import { useSearchParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"
import { useAuthContext } from "../../../context/auth"
import { useDropzone } from 'react-dropzone';
import "../../../styles/progressBar.scss"


function ImportCsv() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const ctx = useAuthContext();

    const [progress, setProgress] = useState(0);

    const [dropPreview, setDropPreview] = useState({ title: "", size: null })

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader();

            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    setProgress((event.loaded / event.total) * 100);

                    console.log((event.loaded / event.total) * 100)
                }
            };

            reader.onload = () => {
                // Do something with the file content here
                const binaryStr = reader.result
                console.log(binaryStr)

                const formData = new FormData();
                formData.append('file', file);

                // Log the file in FormData
                console.log([...formData])

                console.log((file.size / (1024)).toFixed(2))

                setDropPreview({ title: file.name, size: (file.size / (1024)).toFixed(2) })
            };

            reader.readAsArrayBuffer(file)
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: { "text/csv": [".csv"] }, multiple: false
    });


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
                        <h2 className="text-[24px] font-bold">Import employees with CSV</h2>
                        <p className="text-grayscale-60">You can import employees to shifthub with just one go</p>
                    </div>
                </div>

                <div className="my-8">
                    <h3 className="text-[24px] mb-4">How does it work?</h3>
                    <ol type="1" className="list-decimal list-inside text-grayscale-60">
                        <li>Download our <span className="text-grayscale-100 font-bold underline">template</span> and add your employees information to the file. Please keep in mind that the more information you add now, the better the overall experience will be for you and your team.</li>
                        <li>Double check that all mandatory fields have been filled in, then save and upload the file below.</li>
                    </ol>
                </div>

                <div className="h-[500px] w-full border-2 border-dashed border-grayscale-60 rounded-md my-4 flex items-center justify-center cursor-pointer" {...getRootProps()}>
                    <div className="flex gap-2 items-center">
                        <Icon name="document" />
                        <input {...getInputProps()} />

                        <div className="relative w-[200px] flex items-center">
                            <p className={`text-grayscale-60 absolute invisible ${progress === 0 ? "!visible" : null}`}>Select CSv file to upload <br /> or drag one here</p>

                            <div className={`w-full absolute invisible ${progress > 0 && progress < 100 ? "!visible" : null}`}>
                                <div className="progress-bar mb-2">
                                    <span className="progress-bar-fill" style={{ width: `${progress}%` }}></span>
                                </div>
                                <p className="text-grayscale-60">Uploading...</p>
                            </div>
                            <div className={`invisible absolute text-grayscale-60 ${progress === 100 ? "!visible" : null}`}>
                                <h2>{dropPreview.title.split(".")[0]}</h2>
                                <p>{dropPreview.size}kb</p>
                            </div>
                        </div>
                    </div>
                </div>

                <PrimaryButton className="!w-fit !px-8 !py-[10px] mb-4 disabled:cursor-not-allowed disabled:bg-grayscale-40" disabled={progress < 100}>Save</PrimaryButton>
            </div>
        </>
    );
}

export default ImportCsv;
