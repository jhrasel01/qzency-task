import { FaRegQuestionCircle, FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CustomContainer } from "./ui";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white shadow-custom-shadow py-5">
        <CustomContainer>
          <div className="flex items-center justify-end gap-5 text-custom-text-2">
            {/* qzcy */}
            <div className="text-sm  flex items-center gap-1">
              <FaRegQuestionCircle className="text-lg" />
              <span>Qzcy Help</span>
              <MdOutlineKeyboardArrowDown />
            </div>

            {/* notification */}
            <div className="text-3xl border-x border-custom-border px-3 relative">
              <span className="absolute -top-1 right-2 bg-custom-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                21
              </span>
              <IoIosNotificationsOutline />
            </div>

            {/* user */}
            <div className="text-2xl">
              <FaUserCircle />
            </div>
          </div>
        </CustomContainer>
      </nav>
    </>
  );
}
