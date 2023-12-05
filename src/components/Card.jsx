
const Card = () => {
  return (
    <div className="w-full mt-8 h-full text-slate-950 border-black border-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
    <a href="" className="block cursor-pointer">
      <article className="w-full h-full">
        <figure className="w-full h-1/2 border-black border-b-2">
          <img
            src="https://neo-brutalism-ui-library.vercel.app/assets/neo-brutalism-image1-6c6a875b.jpg"
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="px-6 py-5 text-left h-full">
          <p className="text-base mb-4">May 15th, 2023</p>
          <h1 className="text-[32px] mb-4">Neo Brutallism</h1>
          <p className="text-xs mb-4 line-clamp-4">
            Neobrutalism is an aesthetic characterized by high contrast
            elements, bright colors, and bold shapes. It is often used to make
            a statement, as it is meant to be eye-catching and stand out to
            the viewer. It is also used in user interface and web design, with
            features such as vibrant colors and bold shapes. Neobrutalism can
            also be used in print design, with an example being a bold shape
            with a vibrant color fill applied to it.
          </p>
          <strong>Read More</strong>
        </div>
      </article>
    </a>
  </div>
  )
}

export default Card