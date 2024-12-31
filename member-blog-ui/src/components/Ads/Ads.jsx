import { Carousel } from 'flowbite-react';

function Ads() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 rounded-md overflow-hidden">
            <Carousel slideInterval={5000}>
                <img src="/coming-soon.jpg" alt="..." />
                <img src="/coming-soon.jpg" alt="..." />
                <img src="/coming-soon.jpg" alt="..." />
            </Carousel>
        </div>
    );
}

export default Ads;
