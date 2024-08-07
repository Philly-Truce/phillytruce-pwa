import RightArrow from "@/assets/icons/right-arrow";
import Divider from "@/assets/icons/divider";

interface Options {
    icon?: React.ReactNode;
    option: string;
  }
  
  export const MenuOption = ({ icon, option }: Options) => {
    return (
      <>
        <div className="flex p-5">
          <div className="w-3/4 flex justify-start items-center">
            <div className="mr-3">{icon}</div>{option}</div>
          <div className="w-1/4  flex justify-end items-center">
            <RightArrow /></div>
        </div>
        <Divider />
      </>
    )
  }