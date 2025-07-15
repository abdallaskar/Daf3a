function HowItWorks() {
  return (
    <>
      <section className="py-24 bg-background sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-poppins text-3xl text-primary font-bold sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary">
              A simple process to connect you with your perfect mentor.
            </p>
          </div>
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-0.5 -translate-x-1/2 bg-[var(--border)] md:block"></div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface text-3xl font-bold text-brand">
                  1
                </div>
                <h3 className="mt-6 font-poppins text-primary text-xl font-semibold">
                  Create Profile
                </h3>
                <p className="mt-2 text-base text-secondary">
                  Quick onboarding process
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface text-3xl font-bold text-brand">
                  2
                </div>
                <h3 className="mt-6 font-poppins text-primary text-xl font-semibold">
                  Find Your Mentor
                </h3>
                <p className="mt-2 text-base text-secondary">
                  Browse and connect with experts
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface text-3xl font-bold text-brand">
                  3
                </div>
                <h3 className="mt-6 font-poppins text-primary text-xl font-semibold">
                  Grow Together
                </h3>
                <p className="mt-2 text-base text-secondary">
                  Regular sessions and career development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
