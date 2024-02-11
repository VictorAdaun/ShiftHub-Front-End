import React from "react";
import Close from "../assets/svgs/close-circle.svg";
import Check from "../assets/svgs/check.svg";
import CheckGrey from "../assets/svgs/check-grey.svg"
import Booked from "../assets/svgs/booked_status.svg";
import Available from "../assets/svgs/available_status.svg";
import Right from "../assets/svgs/arrow-right.svg";
import Calendar from "../assets/svgs/calendar.svg";
import Ellipsis from "../assets/svgs/ellipsis.svg";
import Morning from "../assets/svgs/sun-fog.svg";
import Sun from "../assets/svgs/sun.svg";
import Moon from "../assets/svgs/moon.svg";
import Forbidden from "../assets/svgs/forbidden.svg";
import Plus from "../assets/svgs/add-square.svg";
import Profile from "../assets/svgs/frame.svg"
import Arrowdown from "../assets/svgs/arrow-down.svg"
import RightLight from "../assets/svgs/arrow-right-light.svg"
import Filter from "../assets/svgs/filter.svg"
import LeftLight from "../assets/svgs/arrow-left.svg"
import Search from '../assets/svgs/search-normal.svg'
import DownLight from "../assets/svgs/arrow-down-light.svg"
import CloseLight from "../assets/svgs/x-mark.svg"
import Brush from "../assets/svgs/brush.svg"
import BrushBlack from "../assets/svgs/brush-black.svg"
import Eye from "../assets/svgs/eye.svg"
import Trash from "../assets/svgs/trash.svg"
import Tick from "../assets/svgs/tick-circle.svg"
import TickSmall from "../assets/svgs/tick-circle-small.svg"
import CloseGrey from "../assets/svgs/close-grey.svg"
import CloseWhiteSm from "../assets/svgs/close-circle-small-white.svg"
import NakedClose from "../assets/svgs/x-close.svg"
import TickLydia from "../assets/svgs/tick-circle-lydia.svg"
import Refresh from "../assets/svgs/refresh.svg"
import EllipsisLydia from "../assets/svgs/dot_menu_lydia.svg"
import Sort from "../assets/svgs/bars-arrow-down.svg"
import TrashRed from "../assets/svgs/trash-red.svg"
import RefreshGrey from  "../assets/svgs/refresh-grey.svg"
import RedTimer from "../assets/svgs/timer.svg"
import PlusNaked from "../assets/svgs/plus-naked.svg"
import Streamline from "../assets/svgs/streamline.svg"
import Morale from "../assets/svgs/morale.svg"
import ErrorReduction from "../assets/svgs/error_reduction.svg"
import Compliance from  "../assets/svgs/compliance.svg"
import DataDriven from "../assets/svgs/dataDriven.svg"
import TimeSaving from "../assets/svgs/timeSavings.svg"
import Star from "../assets/svgs/star.svg"
import ArrowLeftWhite from "../assets/svgs/left.svg"
import ArrowRightWhite from "../assets/svgs/right.svg"
import ArrowTrending from "../assets/svgs/arrow-trending-up.svg"
import ProfileAdd from "../assets/svgs/profile-add.svg"
import Profile2users from "../assets/svgs/profile-2user.svg"
import ScheduledShift from "../assets/svgs/scheduled_shift.svg"
import ActiveEmployees from "../assets/svgs/active_employees.svg"
import ShiftCoverage from "../assets/svgs/shift_coverage.svg"
import GreyArrowDown from "../assets/svgs/greyArrowDown.svg"
import Visible from "../assets/svgs/visible.svg"
import NotVisible from "../assets/svgs/notVisible.svg"
import Dot from "../assets/svgs/dot.svg"
import ArrowLeftLong from "../assets/svgs/arrow-left-long.svg"
import ArrowRightLong from "../assets/svgs/arrow-right-long.svg"
import DarkDot from "../assets/svgs/darkDotMenu.svg"
import Blacklist from "../assets/svgs/blacklist.svg"
import CloseGreyNaked from "../assets/svgs/closeGreyNaked.svg"
import Face from "../assets/svgs/face.svg"
import Document from "../assets/svgs/document-text.svg"
import InfoCircle from "../assets/svgs/info-circle.svg"
import AvatarLydia from "../assets/svgs/avatar-lydia.svg"
import TickCircle from "../assets/tick-circle.svg"
import ProfileAddDark from "../assets/svgs/profile-add-dark.svg"


// employee
import Home from "../assets/employee/home.svg"
import Timeoff from "../assets/employee/timeoff.svg"
import Booking from "../assets/employee/booking.svg"
import ProfileEmployee from "../assets/employee/profile.svg"
import Inbox from "../assets/employee/message-notif.svg"
import Notif from "../assets/employee/notification-bing.svg"
import Timer from "../assets/employee/timer.svg"
import MessageBox from "../assets/employee/message-text.svg"
import Send from "../assets/employee/send-2.svg"
import HomeIndicator from "../assets/employee/home-indicator.svg"
import TickWhite from "../assets/employee/tick-white.svg"
import Sparkle from "../assets/employee/sparkle.svg"
import Add from "../assets/employee/add.svg"
import ClockLydia from "../assets/employee/clock-lydia.svg"
import TickCircleBlack from "../assets/employee/tick-circle-black.svg"
import AtSymbol from "../assets/employee/at-symbol.svg"



type iProps = {
  name: string,
  className?: string,
}

const Icon = (props: iProps) => {
  const allIcons = {
    blacklist: Blacklist,
    greyDown: GreyArrowDown,
    arrowLeftLong: ArrowLeftLong,
    arrowRightLong: ArrowRightLong,
    avatarLydia: AvatarLydia,
    infoCircle: InfoCircle,
    dot: Dot,
    darkDot: DarkDot,
    document: Document,
    visible: Visible,
    notVisible: NotVisible,
    close: Close,
    closeGreyNaked: CloseGreyNaked,
    check: Check,
    face: Face,
    available: Available,
    booked: Booked,
    right: Right,
    calendar: Calendar,
    ellipsis: Ellipsis,
    morning: Morning,
    noon: Sun,
    evening: Moon,
    forbidden: Forbidden,
    add: Plus,
    addNaked: PlusNaked,
    profile: Profile,
    down: Arrowdown,
    rightLight: RightLight,
    leftLight: LeftLight,
    downLight: DownLight,
    filter: Filter,
    search: Search,
    closeLight: CloseLight,
    brush: Brush,
    brushBlack: BrushBlack,
    eye: Eye,
    trash: Trash,
    tick: Tick,
    tickWhite: TickWhite,
    closeGrey: CloseGrey,
    tickSm: TickSmall,
    closeWhiteSm: CloseWhiteSm,
    tickLydia: TickLydia,
    refresh: Refresh,
    nakedClose: NakedClose,
    ellipsisLydia: EllipsisLydia,
    sort: Sort,
    refreshGrey: RefreshGrey,
    trashRed: TrashRed,
    redTimer: RedTimer,
    checkGrey: CheckGrey,
    streamline: Streamline,
    morale: Morale,
    errorReduction: ErrorReduction,
    compliance: Compliance,
    dataDriven: DataDriven,
    timeSaving: TimeSaving,
    star: Star,
    arrowLeftWhite: ArrowLeftWhite,
    arrowRightWhite: ArrowRightWhite,
    arrowTrending: ArrowTrending,
    profileAdd: ProfileAdd,
    profileAddDark: ProfileAddDark,
    totalEmployees: Profile2users,
    scheduledShift: ScheduledShift,
    activeEmployees: ActiveEmployees,
    shiftCoverage: ShiftCoverage,
    tickCircle: TickCircle,
    home: Home,
    booking: Booking,
    profileEmployee: ProfileEmployee,
    inbox: Inbox,
    timeoff: Timeoff,
    notif: Notif,
    timer: Timer,
    messageBox: MessageBox,
    send: Send,
    homeIndicator: HomeIndicator,
    sparkle: Sparkle,
    addBlack: Add,
    clockLydia: ClockLydia,
    tickCircleBlack: TickCircleBlack,
    atSymbol: AtSymbol,
  };

  const DynamicIcon = allIcons[props.name];

  if (DynamicIcon) {
    return <img src={DynamicIcon} alt={props.name} className={props.className}/>;
  }

  throw new Error(`Icon '${props.name}' does not exist`);
};

export default Icon;
