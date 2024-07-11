import React from 'react'
import { IconStar, IconMessage , IconFlame } from '@tabler/icons-react'
import Image from 'next/image'

const ListRow = () => {
    const photoUrl = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/images%2FReact.png?alt=media&token=908a4279-205e-4de9-ae3c-c4023cac86de'
    const photoUrl2 = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/images%2FIMG_5512jpeg.jpg?alt=media&token=55d00d42-eac0-4fb8-9436-7ff59cf0ef2e'
    const photoUrl3 = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/my-setup.jpg?alt=media&token=fcc90adf-e108-4ed4-aa54-cda35596b883'
    return (
        <main className='flex flex-col md:flex-row justify-between items-center w-full px-2 pt-4 pb-2 md:py-4 cursor-pointer border-b-2 border-b-stone-100 hover:bg-stone-100 dark:bg-dark-200 dark:border-b-dark-100 dark:hover:bg-dark-100'>
            <div className='flex flex-row items-center justify-start gap-4 p-2 h-[150px]'>
                <div className='relative flex flex-[0.8] items-center h-[150px] justify-center overflow-hidden'>
                    <Image src={photoUrl2} alt='My Setup' fill className='object-cover' />
                </div>
                <div className='flex flex-col flex-[1.2] items-start justify-start h-full overflow-y-hidden gap-2 text-ellipsis'>
                    <div>
                        <p className='text-lg dark:text-dark-600 font-semibold'>Jade Jamig</p>
                        <p className='text-xs dark:text-dark-500'>{new Date().toDateString()}</p>
                    </div>
                    <div className='text-sm dark:text-dark-400 overflow-hidden text-ellipsis' style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,  // Change this number to the desired number of lines
                        overflow: 'hidden',
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>

            <div className='hidden md:block w-[2px] h-[150px] bg-stone-200 dark:bg-dark-400'/>

            <ul className='flex flex-row md:flex-col items-center justify-between md:justify-center gap-1 w-full md:w-auto'>
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