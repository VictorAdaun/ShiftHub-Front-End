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


type iProps = {
  name: string,
  className?: string,
}

const Icon = (props: iProps) => {
  const allIcons = {
    close: Close,
    check: Check,
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
    arrowRightWhite: ArrowRightWhite
  };

  const DynamicIcon = allIcons[props.name];

  if (DynamicIcon) {
    return <img src={DynamicIcon} alt={props.name} className={props.className}/>;
  }

  throw new Error(`Icon '${props.name}' does not exist`);
};

export default Icon;
