import React, { useState } from "react";
import { useLocation } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import { createPaidSession, createFreeBooking } from '../../services/bookingServices';

function Checkout() {
    const location = useLocation();
    // Get data from navigation state
    const {
        mentor = {},
        slot = {},
        duration = 60,
        price = 0,
    } = location.state || {};

    // Fallbacks for mentor/session info
    const mentorName = mentor.name || "Sarah Chen";
    const mentorTitle = mentor.title || mentor.role || "Software Engineering Mentor";
    const mentorImage = mentor.image || mentor.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-zgCwl3g-4CBeVH6BjNSQfYKrk9znEprAwwa0gaJxpF_IoCazhUwj8mrD6zEs4tX4fOHYz7og4ol6-_PTlGAa-n4aSh0blV_WjQB4dolAIlwpvsTuIfSfg3VS8JXb0W5HmfYKVsc-_DqR2tf7h5E7eYE9i2Qk9Gn2dYPdvGoJKHyhb0L7Lk0IGjFqkeelilD-v7dVnRu06ttPA5a4Wq1bseFQoKyyavSz4oFq3LmJgpT3m675RQ09Rrcb0568t2I_uGKu8KEKsE";
    const sessionType = "1:1 Session";
    const dateTime = slot.day && slot.time ? `${slot.day}, ${slot.time}` : "---";
    const sessionDuration = duration || 60;
    const sessionPrice = price || 0;

    // Toast and form state (unchanged)
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [form, setForm] = useState({
        name: "",
        email: "",
        country: "",
        phone: "",
        invoice: false,
        paymentMethod: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        promo: "",
        terms: false,
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePay = async () => {
        setLoading(true);


        // Prepare booking/session data
        const bookingData = {
            mentorId: mentor._id,
            date: slot.day, // or slot.date if you have a date string
            slots: slot.time, // the selected time
            type: "online",
            duration,
            price: Number(sessionPrice),
            user: form.name, // or get from auth context
            email: form.email,
            // ...add any other required fields
        };

        try {
            let result;
            if (Number(sessionPrice) > 0) {
                // Paid session
                console.log("paid session");
                result = await createPaidSession(bookingData);
            } else {
                // Free booking
                console.log("free booking");
                result = await createFreeBooking(bookingData);
                console.log("result", result);
            }
            console.log("result", result);
            setToast({
                show: true,
                message: "Booking successful! Your session is confirmed.",
                type: "success",
            });
            // Optionally redirect or update UI here
        } catch (err) {
            setToast({
                show: true,
                message: err.message || "Booking failed. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
            setTimeout(() => setToast({ show: true, message: 'Booking successful! Your session is confirmed.', type: 'success' }), 4000);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-primary">
            <NavBar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Booking Summary & Billing */}
                    <div className="space-y-8">
                        {/* Booking Summary */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-6">Booking Summary</h2>
                            <div className="bg-surface p-6 rounded-xl shadow-lg space-y-4 border border-default">
                                <div className="flex items-center gap-4">
                                    <img alt={mentorName} className="w-16 h-16 rounded-full object-cover" src={mentorImage} />
                                    <div>
                                        <p className="font-semibold text-lg text-primary">1:1 Session with {mentorName}</p>
                                        <p className="text-sm text-secondary">{mentorTitle}</p>
                                    </div>
                                </div>
                                <div className="border-t border-default my-4"></div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-secondary">Date &amp; Time:</span>
                                        <span className="font-medium text-primary">{dateTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-secondary">Duration:</span>
                                        <span className="font-medium text-primary">{sessionDuration} minutes</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-secondary">Session Type:</span>
                                        <span className="font-medium text-primary">{sessionType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-secondary">Price:</span>
                                        <span className="font-medium text-primary">${Number(sessionPrice).toFixed(2)}</span>
                                    </div>
                                    {/* Promo/discount logic can be added here if needed */}
                                    <div className="border-t border-default my-2"></div>
                                    <div className="flex justify-between text-base font-bold">
                                        <span className="text-primary">Total:</span>
                                        <span className="text-brand">${Number(sessionPrice).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Billing Information section removed */}
                    </div>
                    {/* Right: Payment Method */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-6">Payment Method</h2>
                            <div className="bg-surface p-6 rounded-xl shadow-lg border border-default space-y-6">
                                {/* Replace payment method options */}
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 rounded-lg border border-brand bg-primary-light dark:bg-primary-light/20 cursor-pointer">
                                        <input checked={form.paymentMethod === 'card'} className="form-radio h-5 w-5 text-brand focus:ring-brand" name="paymentMethod" type="radio" value="card" onChange={handleInput} />
                                        <span className="ml-3 text-sm font-medium text-primary">Credit Card</span>
                                    </label>
                                    <label className="flex items-center p-4 rounded-lg border border-default hover:border-brand cursor-pointer">
                                        <input checked={form.paymentMethod === 'apple'} className="form-radio h-5 w-5 text-brand focus:ring-brand" name="paymentMethod" type="radio" value="apple" onChange={handleInput} />
                                        <span className="ml-3 text-sm font-medium text-primary">Apple Pay</span>
                                    </label>
                                    <label className="flex items-center p-4 rounded-lg border border-default hover:border-brand cursor-pointer">
                                        <input checked={form.paymentMethod === 'google'} className="form-radio h-5 w-5 text-brand focus:ring-brand" name="paymentMethod" type="radio" value="google" onChange={handleInput} />
                                        <span className="ml-3 text-sm font-medium text-primary">Google Pay</span>
                                    </label>
                                </div>
                                {/* Show input fields based on selected payment method */}
                                {form.paymentMethod === 'card' && (
                                    <div className="mt-4 p-6 rounded-xl border border-default bg-gray-50 shadow-sm space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2" htmlFor="cardNumber">Card Number</label>
                                            <input className="input-field w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-lg tracking-widest bg-white" id="cardNumber" name="cardNumber" placeholder="•••• •••• •••• 4242" type="text" value={form.cardNumber} onChange={handleInput} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-primary mb-2" htmlFor="expiry">Expiry Date</label>
                                                <input className="input-field w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white" id="expiry" name="expiry" placeholder="MM / YY" type="text" value={form.expiry} onChange={handleInput} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-primary mb-2" htmlFor="cvv">CVV</label>
                                                <input className="input-field w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white" id="cvv" name="cvv" placeholder="•••" type="text" value={form.cvv} onChange={handleInput} />
                                            </div>
                                        </div>
                                        <div className="border-t border-default my-4"></div>
                                        <div className="flex items-end gap-2">
                                            <div className="flex-1">
                                                <label className="block text-sm font-semibold text-primary mb-2" htmlFor="promo">Promo Code</label>
                                                <input className="input-field w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white" id="promo" name="promo" placeholder="Enter promo code" type="text" value={form.promo} onChange={handleInput} />
                                            </div>
                                            <button className="h-10 mt-6 px-5 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors">Apply</button>
                                        </div>
                                        <div className="flex justify-center items-center gap-2 pt-4 border-t border-default mt-4">
                                            <svg className="h-6 w-6 text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M21.1,8.32,19.33,3.34a2,2,0,0,0-2-1.34H6.62a2,2,0,0,0-2,1.34L2.9,8.32A2.06,2.06,0,0,0,2,9.58,2,2,0,0,0,4,11.55H20a2,2,0,0,0,2-2A2.06,2.06,0,0,0,21.1,8.32ZM20,9.55H4a.1.1,0,0,1-.09,0L5,4.72a.1.1,0,0,1,.09-.06H18.86a.1.1,0,0,1,.09.06l.95,4.83A.1.1,0,0,1,20,9.55Z" />
                                                <path d="M20,13.55H4a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2v-4A2,2,0,0,0,20,13.55Zm-9,6H8v-2h3Zm5,0H13v-2h3Z" />
                                            </svg>
                                            <p className="text-xs text-secondary font-semibold">Secure payments by Stripe</p>
                                        </div>
                                    </div>
                                )}
                                {form.paymentMethod === 'apple' && (
                                    <div className="mt-4 p-4 bg-gray-100 rounded text-center text-secondary">Apple Pay details will be collected on the next step.</div>
                                )}
                                {form.paymentMethod === 'google' && (
                                    <div className="mt-4 p-4 bg-gray-100 rounded text-center text-secondary">Google Pay details will be collected on the next step.</div>
                                )}
                            </div>
                        </section>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <input className="form-checkbox mt-1" id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleInput} />
                                <label className="ml-3 text-sm text-secondary" htmlFor="terms">
                                    I agree to Daf3a's
                                    <a className="font-medium text-brand hover:underline" href="#">Terms of Service</a>
                                    and
                                    <a className="font-medium text-brand hover:underline" href="#">Privacy Policy</a>.
                                </label>
                            </div>
                            <button
                                className="btn-primary px-4 py-2 rounded transition-colors duration-200 w-full mt-6 bg-primary text-white border-primary border-2 flex items-center justify-center gap-2"
                                id="pay-button"
                                onClick={handlePay}
                                disabled={loading || !form.terms}
                            >
                                <span id="pay-text">{loading ? "Processing..." : "Confirm & Pay"}</span>
                                {loading && (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                )}
                            </button>
                            <p className="text-center text-sm text-secondary">
                                Questions? Read our
                                <a className="font-medium text-brand hover:underline" href="#">Cancellation Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            {/* Toast */}
            {toast.show && (
                <div className={`fixed bottom-5 right-5 p-4 rounded-lg text-white max-w-sm z-50 transition-transform duration-300 ${toast.type === 'success' ? 'bg-success' : 'bg-error'} show`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default Checkout;
