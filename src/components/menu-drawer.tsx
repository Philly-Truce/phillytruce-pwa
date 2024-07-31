import React from 'react'

export default function MenuDrawer() {
// import icons
//menu style positioning
    const menuOptions = [
        { icon: '@', option: 'Profile'},
        { icon: '@', option: 'Contacts'},
        { icon: '@', option: 'Resources'},
        { icon: '@', option: 'Analytics'},
        { icon: '@', option: 'Settings'},
        { icon: '@', option: 'Help Center'}
    ]

    

  return (
    <div className='bg-white text-black h-[70vh] min-w-[384px] absolute pt-[16px] px-[16px] justify-between items-center'>
       <div className='flex flex-col gap-[12px]'>
            <ul>
                {menuOptions.map((item) => {
                    return (
                        <li className=" h-[50px] pt-[8px] pr-[12px]" key={item.option}>{item.icon}{item.option}</li>
                    )
                })}

            </ul>
        </div>
        {/* make this a flex box and put this as flex-end */}
        <button className='flex flex-col px-[10px] py-[15px] justify-center items-center w-full bg-[#1C4587] rounded-full text-white mt-40'>Log Out</button>
    </div>
  )
}
