import { GoMoveToTop } from 'react-icons/go';

function GoToTop() {
    const handClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <button
            onClick={handClick}
            type="button"
            className="!fixed z-50 bottom-5 end-5 rounded-full bg-orange-500 p-3 text-xs font-medium leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg"
        >
            <span className="flex justify-center items-center">
                <GoMoveToTop className="text-white" size={20} />
            </span>
        </button>
    );
}

export default GoToTop;
