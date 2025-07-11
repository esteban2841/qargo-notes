import { Logo } from "../atoms/Logo";

export const Hero = () => (
  <div className="flex-1 h-2/3 md:h-full flex flex-col justify-center items-start gap-20 px-8 lg:px-16">
    <div className="flex flex-col gap-6 max-w-2xl">
      <Logo className="" />
      
      <h1 className="text:xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
        Notes as Rich as
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
          {' '}Italian Coffee
        </span>
      </h1>
      
      <p className="text-base md:text-xl text-gray-300  leading-relaxed">
        Capture your thoughts with the same passion we put into our gourmet coffee. 
        QargoNotes brings Italian elegance to your digital workspace.
      </p>


      <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-2 border-gray-900"
            />
          ))}
        </div>
        <span>Trusted by 10,000+ coffee lovers worldwide</span>
      </div>
    </div>
  </div>
);
