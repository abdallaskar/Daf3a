function Hero() {
  return (
    <>
      <section className="relative mt-5 py-24 sm:py-32 lg:py-48">
        <div className="absolute  inset-0">
          <img
            alt="Diverse professionals collaborating"
            className="h-full header-glass w-full object-cover"
            src="/Hero.jpg"
          />
          <div className="absolute  inset-0 overlay-gradient"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
          <h1 className="font-poppins text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Accelerate Your Career Journey
          </h1>
          <p className="font-poppins mx-auto mt-6 max-w-2xl text-lg text-gray-200">
            Connect with industry experts, build your professional profile, and
            unlock opportunities through personalized mentorship.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="flex h-14 min-w-[200px] items-center justify-center rounded-lg bg-primary text-lg font-semibold  btn-primary btn-primary:hover">
              Start Your Journey
            </button>
            <button className="flex h-14 min-w-[200px] items-center justify-center rounded-lg border border-white bg-white/10  text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              Explore Mentors
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
