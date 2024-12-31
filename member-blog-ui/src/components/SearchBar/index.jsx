import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
function SearchBar() {
    const [keyword, setKeyword] = useState('');
    return (
        <>
            <div className="flex items-center max-w-lg mx-auto">
                <form method="get" action="/searching" className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IoSearchOutline size={20} />
                    </div>
                    <input
                        type="text"
                        name="q"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5 "
                        placeholder="Searching..."
                        required
                    />
                </form>
            </div>
        </>
    );
}

export default SearchBar;
