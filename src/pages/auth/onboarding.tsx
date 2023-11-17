import React, { useState, useEffect, useRef } from "react";
import AuthLayout from "../../layouts/auth";
import Trash from "../../assets/trash.svg";
import Plus from "../../assets/Plus.svg";
import Modal from "../../components/modal";
import PrimaryButton from "../../components/button/primary-button";
import Close from "../../assets/svgs/close-circle.svg";
import Avatar from "../../assets/imgs/sample-avatar.png";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import constants from "../../utils/constants";
import FormError from "../../components/form/form-error";
import CreatableSelect from "react-select/creatable";
import Icon from "../../components/icon";
import axiosInstance from "../../utils/axios";
import Loader from "../../assets/whiteLoader.gif"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import { useQuery, useMutation } from "react-query";
import { AxiosError } from "axios";


interface ISignupParams {
  company_name: string;
  company_address: string;
  week: string;
  departments: Array<{ roles }>;
  roles: Array<{ value; label }>;
}

const schema = yup
  .object({
    companyName: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    companyAddress: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    scheduleStartDay: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    departments: yup.array().of(
      yup.object().shape({
        departmentName: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        roles: yup
          .array()
          .of(
            yup.object().shape({
              value: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
              label: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
            })
          )
          .required(constants.FIELD_REQUIRED_MESSAGE),
      })
    ),
  })
  .required();

const schema2 = yup
  .object({
    fullName: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    email: yup
      .string()
      .required(constants.FIELD_REQUIRED_MESSAGE)
      .email("This field should contain a valid email"),
    role: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    employeeType: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
  })
  .required();

type optionType = {
  value: string;
  label: string;
};

function Onboarding() {

  const navigate = useNavigate()
  const otpRef = useRef(null)
  const ctx = useAuthContext()

  // const options: optionType[] = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  // Form for step 1 and 2
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      departments: [{ departmentName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "departments",
  });

  const appendDept = () => {
    append({ departmentName: "" });
  };

  // Form for step 3
  const {
    register: registerInvite,
    handleSubmit: handleSubmitInvite,
    formState: { errors: errorsInvite },
    reset: resetInvite,
    control: controlInvite,
    setValue: setValueInvite
  } = useForm({
    resolver: yupResolver(schema2),
  });

  const [onboardStep, setOnboardStep] = useState(1);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false)


  const arrangeRoles = (data) => {
    const updatedDept = data.departments.map((dept) => {
      const updatedRoles = dept.roles.map((role) => role.value)

      return { ...dept, roles: updatedRoles }
    })

    return { ...data, departments: updatedDept }
  }

  // Onboard section

  const onboardRequest = (data: ISignupParams) => {
    return axiosInstance.post("/api/auth/signup", data)
  }

  const onboardMutation = useMutation({
    mutationFn: onboardRequest,
    onSuccess: (data) => {
      console.log(data)

      setOnboardStep(4)
    },
    onError: (err) => {
      console.log(err)

      if (err instanceof AxiosError) {
        toast.error(err.response.data?.message || "An error occured")
      }
    }
  })

  const handleSignup = (data: ISignupParams) => {

    const userData = JSON.parse(localStorage.getItem("signup"))

    const newData = arrangeRoles(data)

    onboardMutation.mutate({ ...userData, ...newData })

  };


  // Invite section
  const companyId = JSON.parse(localStorage.getItem("user"))?.companyId

  const inviteRequest = (data) => {
    return axiosInstance.post(`/api/auth/invite/${companyId}`, data)
  }

  const inviteMutation = useMutation({
    mutationFn: inviteRequest,
    onSuccess: (data) => {
      console.log(data.data.result.message)

      toast.success(data.data.result.message)

      resetInvite()
      setValueInvite("role", "")
      setValueInvite("employeeType", "")
    },
    onError: (err) => {
      console.log(err)

      if (err instanceof AxiosError) {
        toast.error(err.response.data?.message || "An error occured")
      }
    }
  })

  const handleInvite = (data) => {
    inviteMutation.mutate(data)
  }

  // Fetch departments
  const fetchDepts = async () => {
    const { data } = await axiosInstance.get("/api/team/department")
    return data
  }
  const departmentsQuery = useQuery("departments",
    fetchDepts, {
    enabled: false
  })

  // OTP section
  const otpRequest = (data) => {
    return axiosInstance.post("/api/auth/email/verify", data)
  }


  const otpMutation = useMutation({
    mutationFn: otpRequest,
    onSuccess: (data) => {
      console.log(data)

      // set access token and signup status
      localStorage.setItem("isSigned", "true")
      localStorage.setItem("accessToken", data.data.result.token)
      localStorage.setItem("user", JSON.stringify(data.data.result))

      ctx.setData({ ...ctx, isSigned: true, token: data.data.result.token })

      toast.success("Success!")

      departmentsQuery.refetch()

      setTimeout(() => {
        setOnboardStep(3)
      }, 3000);
    },
    onError: (err) => {
      console.log(err)

      if (err instanceof AxiosError) {
        toast.error(err.response.data?.message || "An error occured")
      }
    }
  })

  const handleOTP = () => {

    const userMail = JSON.parse(localStorage.getItem("signup")).email

    const data = {
      email: userMail,
      code: otpRef.current.value
    }

    otpMutation.mutate(data)
  }


  return (
    <AuthLayout>
      <Modal
        handleClose={() => setInviteModalOpen(false)}
        isOpen={isInviteModalOpen}
      >
        <div className="invite-modal text-center w-3/4">
          <img src={Close} alt="close" className="ml-auto" />
          <div className="mx-auto mb-2 flex items-center justify-center">
            <img src={Avatar} alt="avatar" />
          </div>
          <h3>Your employee has been added</h3>
          <p className="text-sm text-[#667085] mt-2 mb-8">
            Keep building your team
          </p>
          <PrimaryButton onClick={() => console.log("holdd")}>
            Add another employee
          </PrimaryButton>
          <PrimaryButton inverted onClick={() => setOnboardStep(1)}>
            Skip for now
          </PrimaryButton>
        </div>
      </Modal>

      <Modal
        handleClose={() => setWelcomeModalOpen(false)}
        isOpen={isWelcomeModalOpen}
      >
        <div className="welcome-modal flex text-left w-[700px] h-[400px] bg-white rounded-md">
          <div className="w-1/2 bg-welcome-image bg-no-repeat bg-cover bg-center rounded-l-md"></div>
          <div className="w-1/2 flex flex-col justify-center items-start m-auto h-[90%] px-4">
            <div className="ml-auto mb-4 cursor-pointer" onClick={() => setWelcomeModalOpen(false)}>
              <img src={Close} alt="close" />
            </div>
            <h3 className="mb-2 text-[18px]">Welcome to EZ Scheduler, John Doe</h3>
            <p className="text-[16px] text-[#667085] mb-4">
              Lörem ipsum faliga makroter att märell, nysonat, i mikronomi. Bett
              vinstvarning hexadossade käpåktigt. Sona metagraf emedan pidys.
              Talpenna curlingförälder gåsam, i tenyns trefasamma.{" "}
            </p>
            <PrimaryButton
              className="mt-auto ml-auto"
              sm
              onClick={() => navigate("/")}
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      </Modal>

      <ToastContainer />

      <div className="onboarding w-[80%] md:w-full max-w-[425px] h-auto mx-auto my-12 text-center">
        <div className="timeline flex justify-between items-center mx-auto mb-4 w-3/4 mt-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep > 1 ? "bg-lydia" : null
              }`}
          >
            {onboardStep > 1 ? (
              <Icon name="check" />
            ) : (
              <span className="text-sm font-normal text-lydia">1</span>
            )}
          </div>
          <hr className="w-1/3 border-lydia border-t-2 border-dotted"></hr>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep === 3 ? "bg-lydia" : null
              }`}
          >
            {onboardStep === 3 ? (
              <Icon name="check" />
            ) : (
              <span className="text-sm font-normal text-lydia">2</span>
            )}
          </div>
          <hr
            className={`w-1/3 border-[#D0D5DD] border-t-2 border-dotted ${onboardStep === 3 ? "border-lydia" : null
              }`}
          ></hr>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep >= 5 ? "bg-lydia" : null
              }`}
          >
            {onboardStep >= 5 ? (
              <Icon name="check" />
            ) : (
              <span className="text-sm font-normal text-lydia">3</span>
            )}
          </div>
        </div>

        {onboardStep === 1 ? (
          <>
            <h1 className="my-2 text-2xl">Let's get to know you</h1>
            <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">
              Don't worry this only takes 2 minutes
            </p>
          </>
        ) : onboardStep === 2 ? (
          <>
            <h1 className="my-2 text-2xl">Let's organize your schedules!</h1>
            <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">
              We’ll create separate schedules based on the departments you add.
              You can always add more later.
            </p>
          </>
        ) : onboardStep === 3 ? (
          <>
            <h1 className="my-2 text-2xl">Collaborate with your teammates</h1>
            <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">
              Add managers and employees and see how your entire team’s workflow
              improves with EZ Scheduler.
            </p>
          </>
        ) : null}

        <form className="w-full" onSubmit={handleSubmit(handleSignup)}>
          {onboardStep === 1 ? (
            <div className="first-step">
              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="companyName" className="text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="e.g John Doe's Restaurant"
                  {...register("companyName")}
                  className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                />
                {errors.companyName && (
                  <FormError error={errors.companyName.message} />
                )}
              </div>

              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="companyAddress" className="text-sm">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  id="companyAddress"
                  placeholder="Enter an address or city"
                  {...register("companyAddress")}
                  className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                />
                <em className="not-italic text-sm font-light tracking-wide text-[#667085]">
                  This helps us give you accurate, location-based compliance
                  info
                </em>
                {errors.companyAddress && (
                  <FormError error={errors.companyAddress.message} />
                )}
              </div>

              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="week" className="text-sm">
                  What day of the week do your schedules start?
                </label>
                <select
                  name="scheduleStartDay"
                  id="scheduleStartDay"
                  {...register("scheduleStartDay")}
                  defaultValue=""
                  className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                >
                  <option value="" disabled>Select day</option>
                  {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day, id) => (
                    <option key={id} value={day}>{day}</option>
                  ))}
                </select>
                {errors.scheduleStartDay && <FormError error={errors.scheduleStartDay.message} />}
              </div>

              <PrimaryButton
                type="button"
                onClick={async () => {
                  const isValid = await trigger([
                    "companyName",
                    "companyAddress",
                    "scheduleStartDay",
                  ]);
                  if (!isValid) return;

                  setOnboardStep(2);
                }}
              >
                Continue
              </PrimaryButton>
            </div>
          ) : onboardStep === 2 ? (
            <div className="second-step">
              {fields.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="department flex flex-row gap-4 border border-solid border-[#D0D5DD] p-4 items-start mb-8">
                      <div className="field flex flex-col items-start gap-2 mb-4 w-full">
                        <label htmlFor="department" className="text-sm">
                          Department
                        </label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          placeholder="e.g Kitchen"
                          {...register(`departments.${index}.departmentName`)}
                          className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                        />
                        {errors.departments?.[index]?.departmentName && (
                          <FormError
                            error={
                              errors.departments?.[index]?.departmentName
                                .message
                            }
                          />
                        )}
                      </div>

                      <div className="field flex flex-col items-start gap-2 mb-4 w-full">
                        <label htmlFor="roles" className="text-sm">
                          Roles?
                        </label>
                        <Controller
                          name={`departments.${index}.roles`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <CreatableSelect
                              classNames={{
                                control: () => "",
                                container: () => "w-full",
                              }}
                              {...field}
                              isMulti
                            // options={options}
                            />
                          )}
                        />
                        <em className="not-italic text-sm font-light tracking-wide text-[#667085]">
                          Choose from popular roles or type to create new roles.
                        </em>
                        {errors.departments?.[index]?.roles && (
                          <FormError
                            error={errors.departments?.[index]?.roles.message}
                          />
                        )}
                      </div>
                      <img
                        onClick={() => remove(index)}
                        src={Trash}
                        alt="trash"
                        className="cursor-pointer mt-8"
                      />
                    </div>
                  </div>
                );
              })}
              <p
                className="flex gap-2 text-left text-sm font-light tracking-wide text-lydia my-4 cursor-pointer"
                onClick={() => appendDept()}
              >
                <img src={Plus} alt="plus" />
                Add department
              </p>
              <PrimaryButton
                type="submit"
              >
                {onboardMutation.isLoading ? <img className="h-[30px] w-[30px] mx-auto" src={Loader} alt="loader" /> : "Continue"}
              </PrimaryButton>
            </div>
          ) : onboardStep === 4 ? (
            <div className="">
              <h1 className="text-2xl text-lydia mt-8 mb-2">ACCOUNT VERIFICATION</h1>
              <p className="mb-8">An OTP has been sent to your mail</p>
              <div className="flex flex-col text-left">
                <label>Enter OTP</label>
                <input placeholder="Enter OTP" type="number" className="appearance-none border border-solid border-grayscale-40 rounded-md p-4 mt-2 mb-4" ref={otpRef} />
              </div>
              <PrimaryButton type="button" onClick={() => {
                console.log(otpRef.current.value)

                handleOTP()
              }}>{otpMutation.isLoading ? <img className="h-[30px] w-[30px] mx-auto" src={Loader} alt="loader" /> : "Proceed"}</PrimaryButton>
            </div>
          ) : null}
        </form>

        {onboardStep === 3 ?
          <form className="w-full" onSubmit={handleSubmitInvite(handleInvite)}>
            <div className="third-step">
              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="fullName" className="text-sm">
                  Employee Name
                </label>
                <input
                  {...registerInvite("fullName")}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="e.g John Doe"
                  className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                />
                {errorsInvite.fullName && (
                  <FormError error={errorsInvite.fullName.message} />
                )}
              </div>

              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="email" className="text-sm">
                  Employee’s Email Address
                </label>
                <input
                  {...registerInvite("email")}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. johndoe@email.com"
                  className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                />
                {errorsInvite.email && (
                  <FormError error={errorsInvite.email.message} />
                )}
              </div>

              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="role" className="text-sm">
                  What would their role be?
                </label>
                <Controller
                  name="role"
                  control={controlInvite}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      {...field}
                      defaultValue={""}
                      className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                    >
                      <option value="" disabled>Select...</option>
                      {departmentsQuery.data?.result.data.map((dept, id) => {
                        return (
                          <optgroup key={id} label={dept.title} className="font-light">
                            {dept.roles.map((role, id) => {
                              return (
                                <option key={id} value={role.id}>{role.title}</option>
                              );
                            })}
                          </optgroup>
                        )
                      }
                      )}
                    </select>
                  )}
                />

                <em className="not-italic text-sm font-light tracking-wide text-[#667085]">
                  This is based off the departments created
                </em>
                {errorsInvite.role && <FormError error={errorsInvite.role.message} />}
              </div>

              <div className="field flex flex-col items-start gap-2 mb-6">
                <label htmlFor="employeeType" className="text-sm">
                  Employee Type
                </label>
                <Controller
                  name="employeeType"
                  control={controlInvite}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      {...field}
                      defaultValue={""}
                      className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="EMPLOYEE">EMPLOYEE</option>
                    </select>
                  )}
                />
                <em className="not-italic text-sm font-light tracking-wide text-[#667085]">
                  This can be updated in-app
                </em>
                {errorsInvite.employeeType && (
                  <FormError error={errorsInvite.employeeType.message} />
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm"
              >
                {inviteMutation.isLoading ? <img className="h-[30px] w-[30px] mx-auto" src={Loader} alt="loader" /> : "Send Invite"}
              </button>
              <button
                type="button"
                className="w-full py-2 border-none bg-white text-lydia rounded-md text-sm mt-4"
                onClick={() => setWelcomeModalOpen(true)}
              >
                Skip for now
              </button>
            </div>
          </form> : null}

      </div>
    </AuthLayout>
  );
}

export default Onboarding;
