import loader from '../../assets/Gear-loader-noanim.svg';
import { RectangleGroupIcon } from '@heroicons/react/24/outline'


const TopBar = ({resetLayout}) => {

    return <div className='h-[5%] flex items-center justify-between bg-[#E6F4F1]'>
        <div className='flex ml-2 py-2 items-center'>
            <img src={loader} alt='loader' className='w-7' />
            <h3 className='text-xl italic inline font-bold'>Webengine</h3>
        </div>
        <div className='p-2'>
            <RectangleGroupIcon 
                onClick={resetLayout}
                className='w-6 cursor-pointer'
                title='Reset Layout'
            />
        </div>
    </div>
}

export default TopBar;