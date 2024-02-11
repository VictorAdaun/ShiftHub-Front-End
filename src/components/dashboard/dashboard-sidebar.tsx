import ShiftHubLogo from "../../assets/svgs/logo.svg";
import HomeIcon from "../../assets/svgs/dashboard/menu/home.svg";
import ReportIcon from "../../assets/svgs/dashboard/menu/report.svg";
import ScheduleIcon from "../../assets/svgs/dashboard/menu/schedule.svg";
import TaskIcon from "../../assets/svgs/dashboard/menu/task.svg";
import TeamIcon from "../../assets/svgs/dashboard/menu/team.svg";
import SettingIcon from "../../assets/svgs/dashboard/menu/setting.svg";
import LogoutIcon from "../../assets/svgs/dashboard/menu/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils/functions";
import { useAuthContext } from "../../context/auth";
import { useQueryClient } from "react-query";

interface SubmenuItem {
  title: string;
  path: string;
}

interface DashboardItemProps {
  title: string;
  Icon: string;
  path: string;
  submenu?: SubmenuItem[];
}

const menuGroup = [
  {
    title: "dashboard",
    Icon: HomeIcon,
    path: "/",
  },
  {
    title: "schedule",
    Icon: ScheduleIcon,
    path: "/schedule",
    submenu: [
      {
        title: "schedules",
        path: "/schedules",
      },
      // {
      //   title: "shift swaps",
      //   path: "/shift-swaps",
      // },
      {
        title: "time off",
        path: "/time-off",
      },
      // {
      //   title: "availability",
      //   path: "/availability",
      // },
    ],
  },
  {
    title: "team",
    Icon: TeamIcon,
    path: "/team",
    submenu: [
      {
        title: "employees",
        path: "/employees",
      },
      {
        title: "engagement",
        path: "/engagement",
      },
    ],
  },
  {
    title: "task",
    Icon: TaskIcon,
    path: "/task",
  },
  {
    title: "report",
    Icon: ReportIcon,
    path: "/report",
  },
];

function DashboardSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const DashboardItem = ({
    title,
    Icon,
    path,
    submenu,
  }: DashboardItemProps) => {

    const ctx = useAuthContext()

    const isActive =
      title !== "dashboard" ? pathname.includes(path) : pathname === path;

    const navigateAction = (path: string) => {
      if (isActive && submenu) {
        navigate(`${path}${submenu[0].path}`);
      }

      navigate(path);
    };

    return (
      <div className="w-full">
        <button
          onClick={() => {
            if (title === "log out") {
              localStorage.setItem("isSigned", "false")
              localStorage.removeItem("accessToken")
              localStorage.removeItem("user")

              ctx.setData({ ...ctx, isSigned: false, token: undefined })

            }

            if(title === "schedules"){
              queryClient.invalidateQueries("schedule")
            }

            navigateAction(path)
          }}
          className={classNames(
            "flex gap-2 px-4 py-2 items-center rounded-md w-full",
            isActive ? "text-lydia bg-grayscale-10" : ""
          )}
        >
          <div className="max-w-5 !fill-lydia">
            <img src={Icon} alt={title} />
          </div>
          <h3 className="text-body-large capitalize font-normal">{title}</h3>
        </button>

        <div className={classNames("ml-[26px]", isActive ? "block" : "hidden")}>
          {submenu ? submenu.map((submenuItem, idx) => {
            const isSubmenuActive = pathname === (path + submenuItem.path)

            return (
              <Link key={idx} to={`${path}${submenuItem.path}`}>
                <h6 className={classNames("text-body-sm capitalize py-2 px-7 border-l-2 border-l-grayscale-40", isSubmenuActive ? "text-lydia border-l-lydia" : "")}>
                  {submenuItem.title}
                </h6>
              </Link>
            );
          })
            : null}
        </div>
      </div>
    );
  };

  return (
    <aside className="px-4 w-[272px] h-full fixed border border-solid border-r-grayscale-30">
      <div className="py-6">
        <img src={ShiftHubLogo} alt="Shifthub logo" />
      </div>
      <div className="mt-4">
        <h5 className="text-body-sm uppercase text-grayscale-50 font-normal mb-2">
          main menu
        </h5>
        <div>
          {menuGroup.map((menuItem, idx) => {
            return (
              <DashboardItem
                key={idx}
                title={menuItem.title}
                Icon={menuItem.Icon}
                path={menuItem.path}
                submenu={menuItem.submenu}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-[20px]">
        <h5 className="text-body-sm uppercase text-grayscale-50 font-normal mb-2">
          account
        </h5>
        <div>
          <DashboardItem title="settings" Icon={SettingIcon} path="/settings" />
          <DashboardItem title="log out" Icon={LogoutIcon} path="/login" />
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
