import GearLoader from '../../assets/Gear-loader.svg';

const Loader = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            <div className='flex justify-center align-ite flex-col items-center'>
                <img src={GearLoader} className='h-36'/>
                <span className='text-3xl font-bold block'>Loading Modules...</span>
            </div>
        </div>
    )
}

export default Loader;