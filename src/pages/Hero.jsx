import { Outlet } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="w-full h-full border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#FFBDC4]">
        <article className="w-full h-full flex relative">
          <p
            className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            font-bold text-6xl drop-shadow-[0_3.0px_3.2px_rgba(0,0,0,1)]"
          >
            Anymelist {" "}
          </p>
          <figure className="w-full h-60 border-black border-b-2">
            <img
              src={"/src/assets/hero.jpg"}
              //    src={"https://cdn.dribbble.com/userupload/9856929/file/original-79e0bbf436f9e487b674362b8f96eeb9.png?resize=1024x1024"}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </figure>
        </article>
      </div>

      <Outlet />
    </>
  );
};

export default Hero;
