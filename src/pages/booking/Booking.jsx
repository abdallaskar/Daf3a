import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

function Booking() {
    // Payment per hour (could be dynamic in the future)
    const paymentPerHour = 50;
    // Available durations in minutes
    const durations = [30, 60, 90];
    // State for selected slot and duration
    const [selectedSlot, setSelectedSlot] = useState({ day: '', date: '', time: '' });
    const [selectedDuration, setSelectedDuration] = useState(60); // default 60 min

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="bg-surface shadow-sm">
                <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <NavBar></NavBar>
                </nav>
            </header>
            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Mentor Card */}
                        <div className="card p-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-32 h-32 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDL0skgoVWrgDybp6MjXEKjposOQJIialf6TE-eTs0WZZlga6ROCjOlLCZx8whNQlqM94edu-w9gPCYSlyFSPr_gHihQgrpk-Czcr5w95I3RhB71WE1sqIr3qEt--8omGEjdiZCfecKwURTSJcwU5SQILaNyuH9aBTzkto-LBKd95eDEOhulCbRa2-eJdmadpBFeQZth_vOZvjd2I4CLF3z-7KavNVLnE3I2ZmLGsw4Ksy35y6QbXWuTQmfB9Un5twPCTD6UI9brIk')" }} ></div>
                                <div className="text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <h2 className="text-2xl font-bold text-primary">Sarah Al-Mousa</h2>
                                        {/* Verified Badge */}
                                        <svg className="w-6 h-6 text-brand" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a.75.75 0 00-1.06-1.06l-3.89 3.889-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.44-4.44z" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <p className="text-lg text-secondary">Product Design Mentor</p>
                                    {/* Payment per hour */}
                                    <p className="text-base font-semibold text-brand mt-1">${paymentPerHour}/hr</p>
                                    <div className="flex items-center justify-center sm:justify-start mt-2 gap-1">
                                        {/* Star Icon */}
                                        <svg className="w-5 h-5 text-amber" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <p className="text-base font-semibold text-primary">
                                            4.9 <span className="font-normal text-secondary">(120 reviews)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Availability Time Card */}
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-6 text-primary dark:text-primary">Availability Time</h3>
                            <div className="space-y-6">
                                {[
                                    { date: 'July 20, 2025', day: 'Sunday', times: ['09:00 AM', '11:00 AM'] },
                                    { date: 'July 21, 2025', day: 'Monday', times: ['10:00 AM', '01:00 PM'] },
                                    { date: 'July 22, 2025', day: 'Tuesday', times: ['08:00 AM', '12:00 PM'] },
                                ].map((slot, index) => (
                                    <div
                                        key={index}
                                        className="bg-surface dark:bg-surface card-elevated rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-default transition-colors"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-poppins text-lg font-semibold text-primary dark:text-primary">{slot.day}</span>
                                            <span className="text-secondary dark:text-secondary text-sm">{slot.date}</span>
                                        </div>
                                        <div className="flex flex-col gap-3 mt-2 sm:mt-0">
                                            {slot.times.map((time, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <span className="px-5 py-2 rounded-lg font-medium bg-primary text-white dark:bg-primary dark:text-white shadow-sm">
                                                        {time}
                                                    </span>
                                                    <button
                                                        className="btn-secondary px-4 py-2 rounded transition-colors duration-200"
                                                        type="button"
                                                        onClick={() => setSelectedSlot({ day: slot.day, date: slot.date, time })}
                                                    >
                                                        Choose this time
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Session Duration Card */}
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-4">Session Duration</h3>
                            <div className="flex flex-wrap gap-4">
                                {durations.map((duration) => (
                                    <label
                                        key={duration}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-input cursor-pointer has-[:checked]:border-brand has-[:checked]:border-2 has-[:checked]:bg-primary-light ${selectedDuration === duration ? 'border-brand border-2 bg-primary-light' : ''}`}
                                    >
                                        <input
                                            className="form-radio text-brand focus:ring-brand"
                                            name="duration"
                                            type="radio"
                                            checked={selectedDuration === duration}
                                            onChange={() => setSelectedDuration(duration)}
                                        />
                                        <span>{duration} min</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Side - Booking Summary */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Date</span>
                                    <span className="font-semibold">{selectedSlot.date || 'May 5, 2024'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Time</span>
                                    <span className="font-semibold">{selectedSlot.time || '11:00 AM'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Duration</span>
                                    <span className="font-semibold">{selectedDuration} min</span>
                                </div>
                                <div className="border-t border-input my-4"></div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Price</span>
                                    <span>${((paymentPerHour / 60) * selectedDuration).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-bold mb-2">Payment Method</h4>
                                <div className="flex items-center justify-between p-3 rounded-lg border border-input">
                                    <div className="flex items-center gap-3">
                                        <img alt="Visa" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYVL7SiI8A0K-BewiOpYrJ9NqDNsBlllVJiGPfQAUuq5puPpmBdUGv66xYh6dBB0b09a5kqk8S8XKMZqwL7qI4gHLIh8Xsdl9T-pwQ4UmYelwuyzgpevIjveHduA8Fm3fWcuwqAJLNvQzIYxjhAun_S5bAmOvvtZ0mh49R61LZHZ87fM_eaMCy-Ur32-VQP67nR5KWHUoPgVvUZGdsaUredOVVjN_kC5bme0Y7veRizOo3KT6h8phIGj6vd-BNbBCFOyKDx13i7pQ" />
                                        <div>
                                            <p className="font-semibold">Credit Card</p>
                                            <p className="text-sm text-secondary">•••• 4242</p>
                                        </div>
                                    </div>
                                    <a className="text-sm font-semibold text-brand hover:underline" href="#">Change</a>
                                </div>
                            </div>
                            <button className="btn-primary w-full mt-6">Confirm Booking</button>
                            <p className="text-xs text-center text-secondary mt-4">By confirming, you agree to our terms and conditions.</p>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
export default Booking; 