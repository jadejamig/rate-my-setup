import React from 'react'
import { IconStar, IconMessage , IconFlame } from '@tabler/icons-react'
import Image from 'next/image'

const ListRow = () => {
  return (
    <main className='flex flex-row justify-between items-center w-full px-2 py-4 cursor-pointer border-b-2 border-b-stone-100 hover:bg-stone-100 dark:bg-dark-200 dark:border-b-dark-100 dark:hover:bg-dark-100'>
        <div className='flex flex-row items-center justify-start gap-4 p-2 h-[150px]'>
            <Image src='/my-setup.jpg' alt='My Setup' width={200} height={200} />
            <div className='flex flex-col items-start justify-start h-full overflow-y-hidden gap-2 text-ellipsis'>
                <div>
                    <p className='text-lg dark:text-dark-600 font-semibold'>Jade Jamig</p>
                    <p className='text-xs dark:text-dark-500'>{new Date().toDateString()}</p>
                </div>
                <p className='text-sm dark:text-dark-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
        </div>

        <div className='w-[2px] h-[150px] bg-stone-200 dark:bg-dark-400'/>

        <ul className='flex flex-col items-center justify-center gap-1'>
            <li className='rowIcon'>
                <IconStar size={20} />
                <p className='text-xs'>(234)</p>
            </li>
            <li className='rowIcon'>
                <IconFlame size={20} />
                <p className='text-xs'>(374)</p>
            </li>
            <li className='rowIcon'>
                <IconMessage size={20} />
                <p className='text-xs'>(23)</p>
            </li>
        </ul>
    </main>
  )
}

export default ListRow