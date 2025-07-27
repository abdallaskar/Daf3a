function SuccessStories() {
  return (
    <>
      <section className="bg-surface py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-poppins text-primary text-3xl font-bold sm:text-4xl">
              Student Success Stories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary">
              See how Df3a has changed the lives of our students.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg card p-8 ">
              <div className="flex items-center gap-4">
                <img
                  alt="Student photo"
                  className="h-16 w-16 rounded-full object-cover"
                  src="https://static.vecteezy.com/system/resources/thumbnails/060/236/525/small_2x/3d-muslim-woman-avatar-free-png.png"
                />
                <div>
                  <h4 className="font-poppins text-primary font-semibold">
                    Fatima Al-Jamil
                  </h4>
                  <p className="text-sm text-secondary">
                    From: Unemployed &gt; New Role: Frontend Developer
                  </p>
                </div>
              </div>
              <div className="mt-6 text-lg italic text-primary before:content-['“'] after:content-['”']">
                Daf3a was a game-changer! The personalized mentorship helped me
                land my first tech job. I'm forever grateful.
              </div>
            </div>
            <div className="rounded-lg card p-8">
              <div className="flex items-center gap-4">
                <img
                  alt="Student photo"
                  className="h-16 w-16 rounded-full object-cover"
                  src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                />
                <div>
                  <h4 className="font-poppins text-primary font-semibold">
                    Ahmed Ehab
                  </h4>
                  <p className="text-sm text-secondary">
                    From: Junior Accountant &gt; New Role: Data Analyst
                  </p>
                </div>
              </div>
              <div className="mt-6 text-lg italic text-primary before:content-['“'] after:content-['”']">
                I was stuck in my career. With Daf3a, I learned new skills and
                transitioned into a data analyst role, doubling my salary!
              </div>
            </div>
            <div className="rounded-lg card p-8">
              <div className="flex items-center gap-4">
                <img
                  alt="Student photo"
                  className="h-16 w-16 rounded-full object-cover"
                  src="https://static.vecteezy.com/system/resources/thumbnails/054/953/149/small_2x/cartoon-female-teacher-avatar-in-a-smart-outfit-with-glasses-ready-to-educate-students-with-enthusiasm-3d-cartoon-female-teacher-educator-avatar-isolated-on-transparent-background-free-png.png"
                />
                <div>
                  <h4 className="font-poppins text-primary font-semibold">
                    Layla Hassan
                  </h4>
                  <p className="text-sm text-secondary">
                    From: Graphic Designer &gt; New Role: UX/UI Designer
                  </p>
                </div>
              </div>
              <div className="mt-6 text-lg italic text-primary before:content-['“'] after:content-['”']">
                The mentorship program was incredible. My mentor guided me
                through building a professional portfolio, which was key to
                getting my new role.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SuccessStories;
