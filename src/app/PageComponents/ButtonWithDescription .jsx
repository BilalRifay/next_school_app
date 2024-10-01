import { Button } from '../components/ui/button'

const ButtonWithDescription = ({ buttonText, subtitle, description, linkText, linkUrl }) => {
    return (
        <div className=" my-5">
            {subtitle && (
                <p className='mt-1 text-sm text-gray-500 font-medium'>
                    {subtitle}
                </p>
            )}
            <p className='mt-2 text-sm text-white'>
                {description}
            </p>
            {linkText && linkUrl && (
                <a href={linkUrl} className='mt-2 inline-block text-blue-600 hover:underline'>
                    {linkText}
                </a>
            )}
            <Button className='bg-blue-800/80 font-bold hover:bg-blue-800 block'>
                {buttonText}
            </Button>
        </div>
    );
};

export default ButtonWithDescription;
