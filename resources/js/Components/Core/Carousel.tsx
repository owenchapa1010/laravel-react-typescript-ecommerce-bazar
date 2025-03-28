import {Image} from "@/types";
import { useState } from "react";

function Carousel ({images}:{images:Image[]}){
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveIndex(index);
    };

    return(
        <div className="flex items-start gap-8">
            <div className="flex flex-col items-center gap-2 py-2 overflow-y-auto max-h-[500px]">
                {images.map((image, i) => (
                    <a 
                        onClick={(e) => handleThumbnailClick(i, e)}
                        href={'#item' + i} 
                        className={`border-2 transition-all duration-300 
                            ${activeIndex === i 
                                ? 'border-blue-500 scale-105' 
                                : 'border-transparent hover:border-blue-300'}`} 
                        key={image.id}
                    >
                        <img 
                            src={image.thumb} 
                            alt={`Thumbnail ${i + 1}`} 
                            className="w-[50px] h-[50px] object-cover"
                        />
                    </a>
                ))}
            </div>
            <div className="carousel w-full overflow-hidden">
                {images.map((image, i) => (
                    <div 
                        id={"item" + i} 
                        className={`carousel-item w-full transition-transform duration-500 ease-in-out 
                            ${activeIndex === i 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 absolute translate-x-full'}`} 
                        key={image.id}
                    >
                        <img 
                            src={image.large} 
                            alt={`Image ${i + 1}`} 
                            className="w-full object-cover max-h-[500px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel;