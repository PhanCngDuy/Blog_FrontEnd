function Loading() {
    return (
        <>
            <div className="flex fixed top-0 left-0 right-0 bottom-0 justify-center items-center ">
                <div className="relative z-50">
                    <div
                        className="w-12 h-12 rounded-full absolute
                            border-8 border-dashed border-white"
                    ></div>

                    <div
                        className="w-12 h-12 rounded-full animate-spin absolute
                            border-8 border-dashed border-orange-500 border-t-transparent"
                    ></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full block bg-black opacity-20"></div>
            </div>
        </>
    );
}

export default Loading;
