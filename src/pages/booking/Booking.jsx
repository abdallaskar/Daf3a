import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { createFreeBooking } from "../../services/bookingServices";
import { getReviewsByTarget } from '../../services/getAllData';

function Booking(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    // Remove form state if not used
    // const [form, setForm] = useState({
    //     name: "",
    //     email: "",
    // });
    const mentor = location.state?.mentor || props.mentor || {};

    console.log(mentor);
    // Use mentor prop or fallback to default
    const paymentPerHour = mentor.price || 0;
    const mentorName = mentor.name || "Sarah Al-Mousa";
    const mentorTitle = mentor.title || mentor.role || "Product Design Mentor";
    const mentorAvatar = mentor.image || mentor.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDL0skgoVWrgDybp6MjXEKjposOQJIialf6TE-eTs0WZZlga6ROCjOlLCZx8whNQlqM94edu-w9gPCYSlyFSPr_gHihQgrpk-Czcr5w95I3RhB71WE1sqIr3qEt--8omGEjdiZCfecKwURTSJcwU5SQILaNyuH9aBTzkto-LBKd95eDEOhulCbRa2-eJdmadpBFeQZth_vOZvjd2I4CLF3z-7KavNVLnE3I2ZmLGsw4Ksy35y6QbXWuTQmfB9Un5twPCTD6UI9brIk";
    const mentorRating = mentor.rating || 4.9;
    const mentorBio = mentor.bio || "No bio provided.";
    const mentorExpertise = mentor.expertise || [];
    const mentorLanguages = mentor.languages || [];
    // Available durations in minutes
    const durations = [30, 60, 90];
    // State for selected slot and duration
    const [selectedSlot, setSelectedSlot] = useState({ day: '', date: '', time: '' });
    const [selectedDuration, setSelectedDuration] = useState(60); // default 60 min
    // Remove loading state if not used
    // const [loading, setLoading] = useState(false);

    // At the top of the component, replace the availability assignment to support the new structure and local state
    const [availability, setAvailability] = useState(
        Array.isArray(mentor.availability) && mentor.availability.length > 0
            ? mentor.availability
            : []
    );

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);

    React.useEffect(() => {
        const fetchMentorReviews = async () => {
            setLoadingReviews(true);
            try {
                if (mentor && mentor._id) {
                    const response = await getReviewsByTarget('mentor', mentor._id);
                    setReviews(response);
                }
            } catch {
                setReviews([]);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchMentorReviews();
    }, [mentor]);

    // Calculate total price
    const totalPrice = ((paymentPerHour / 60) * selectedDuration).toFixed(2);

    const handleFreeBooking = async () => {
        // Prepare booking/session data
        const bookingData = {
            mentorId: mentor._id,
            date: selectedSlot.day, // or selectedSlot.date if you have a date string
            slots: [selectedSlot.time],
            type: "online",
            duration: selectedDuration,
            price: Number(totalPrice),
            // ...add any other required fields
        };

        try {
            console.log("Token before request:", localStorage.getItem("token"));
            const result = await createFreeBooking(bookingData);
            console.log(result);
            setToast({
                show: true,
                message: "Booking successful! Your session is confirmed.",
                type: "success",
            });
            // Remove the booked slot from the frontend state
            setAvailability(prev => prev.map(dayObj => {
                if (dayObj.day === selectedSlot.day) {
                    const newSlots = dayObj.slots.filter(time => time !== selectedSlot.time);
                    return { ...dayObj, slots: newSlots };
                }
                return dayObj;
            }).filter(dayObj => dayObj.slots.length > 0));
            setSelectedSlot({ day: '', date: '', time: '' });
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
            navigate('/studentProfile');
        }
    };

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
                                <div className="w-32 h-32 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${mentorAvatar}')` }} ></div>
                                <div className="text-center sm:text-left w-full">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <h2 className="text-2xl font-bold text-primary">{mentorName}</h2>
                                        {/* Verified Badge */}
                                        {mentor.verified && (
                                            <svg className="w-6 h-6 text-brand" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a.75.75 0 00-1.06-1.06l-3.89 3.889-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.44-4.44z" fillRule="evenodd"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-lg text-secondary">{mentorTitle}</p>
                                    <p className="text-base font-semibold text-brand mt-1">
                                        {paymentPerHour === 0 ? '0 EGP/hr (Free)' : `${paymentPerHour} EGP/hr`}
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start mt-2 gap-1">
                                        {/* Star Icon */}
                                        <svg className="w-5 h-5 text-amber" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <p className="text-base font-semibold text-primary">
                                            {mentorRating} <span className="font-normal text-secondary">({reviews.length} reviews)</span>
                                        </p>
                                    </div>
                                    <div className="mt-2 text-sm text-secondary">{mentorBio}</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {mentorExpertise.map((exp, i) => (
                                            <span key={i} className="bg-surface text-secondary shadow text-xs font-medium px-3.5 py-1 rounded-full">
                                                {exp}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {mentorLanguages.map((lang, i) => (
                                            <span key={i} className="bg-surface text-secondary shadow text-xs font-medium px-3.5 py-1 rounded-full">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Availability Time Card */}
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-6 text-primary dark:text-primary">Availability Time</h3>
                            {availability.length === 0 ? (
                                <div className="text-center text-secondary py-8">Mentor not available now</div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {availability.filter(slot => Array.isArray(slot.slots) && slot.slots.length > 0).map((slot, index) => {
                                        return (
                                            <div
                                                key={slot._id || index}
                                                className={`rounded-xl p-4 shadow border flex flex-col items-center transition-colors bg-green-100 border-green-400`}
                                            >
                                                <div className="font-bold text-lg text-primary mb-1">{slot.day}</div>
                                                <div className="text-xs text-secondary mb-2">{slot.date}</div>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {slot.slots.map((time, idx) => (
                                                        <button
                                                            key={idx}
                                                            className={`px-4 py-2 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors shadow ${selectedSlot.day === slot.day && selectedSlot.time === time ? 'ring-2 ring-brand' : ''}`}
                                                            type="button"
                                                            onClick={() => setSelectedSlot({ day: slot.day, date: slot.date, time })}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
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
                        {/* Reviews Section */}
                        <div className="card p-6 mt-4">
                            <h3 className="text-xl font-bold mb-4">Reviews</h3>
                            {loadingReviews ? (
                                <div className="text-secondary">Loading reviews...</div>
                            ) : reviews.length === 0 ? (
                                <div className="text-secondary">No reviews yet.</div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review, idx) => (
                                        <div key={idx} className="border-b border-default pb-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-primary">{review.reviewerName || 'Anonymous'}</span>
                                                <span className="text-amber-500 font-bold">{'★'.repeat(Math.round(review.rating || 0))}</span>
                                            </div>
                                            <div className="text-secondary text-sm">{review.comment}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Right Side - Booking Summary */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="card p-6">
                            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Mentor</span>
                                    <span className="font-semibold">{mentorName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Day</span>
                                    <span className="font-semibold">{selectedSlot.day ? selectedSlot.day : '---'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Time</span>
                                    <span className="font-semibold">{selectedSlot.time ? selectedSlot.time : '---'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary">Duration</span>
                                    <span className="font-semibold">{selectedDuration} min</span>
                                </div>
                                <div className="border-t border-input my-4"></div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Price</span>
                                    <span>{totalPrice} EGP</span>
                                </div>
                            </div>
                            {/* Move the toast notification to the top center of the page, above all content */}
                            {toast.show && (
                                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white text-lg font-semibold ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ minWidth: '300px', textAlign: 'center' }}>
                                    {toast.message}
                                </div>
                            )}
                            {/* Button: text and handler depend on price */}
                            {/* Hide the booking button when loading is true */}
                            <button
                                className={`btn-primary px-4 py-2 rounded transition-colors duration-200 w-full mt-6 border-2 ${(!selectedSlot.day || !selectedSlot.time)
                                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                    : 'bg-primary text-white border-primary'}`}
                                onClick={Number(totalPrice) === 0 ? handleFreeBooking : () => {
                                    navigate('/checkout', {
                                        state: {
                                            mentor,
                                            slot: selectedSlot,
                                            duration: selectedDuration,
                                            price: totalPrice,
                                        },
                                    });
                                }}
                                disabled={!selectedSlot.day || !selectedSlot.time}
                            >
                                {Number(totalPrice) === 0 ? 'Confirm booking' : 'Check out'}
                            </button>
                            <p className="text-xs text-center text-secondary mt-4">By confirming, you agree to our terms and conditions.</p>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
export default Booking; 