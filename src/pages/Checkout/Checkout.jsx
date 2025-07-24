import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaidSession } from "../../services/bookingServices";
import { toast } from "react-toastify";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";




const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const {
        slot,
        mentorId,
        sessionTitle,
        sessionImage,
        mentorName,
        mentorTitle,
        sessionPrice,
        sessionDuration,
        sessionType,
        isWorkshop,
        sessionId,
    } = location.state || {};



    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        // Validate Card Number

        if (!cardNumberElement || cardNumberElement._empty) {
            return toast.error("Please enter a valid card number.", {
                position: "top-center",
            });
        }

        // Validate Expiry Date (Check for emptiness and if valid)
        if (!cardExpiryElement || cardExpiryElement._empty) {
            return toast.error("Please enter a valid expiration date.", {
                position: "top-center",
            });
        }

        // Validate CVC
        if (!cardCvcElement || cardCvcElement._empty) {
            return toast.error("Please enter your CVC.", {
                position: "top-center",
            });
        }

        // Validate that Stripe is loaded
        if (!stripe || !elements) {
            return toast.error("Stripe is not loaded yet", {
                position: "top-center",
            });
        }
        if (!stripe || !elements) {
            return toast.error("Stripe is not loaded yet", {
                position: "top-center",
            });
        }
        try {
            setLoading(true);

            // Create a PaymentIntent on the server
            const bookingData = {
                mentorId: mentorId,
                date: slot.date,
                slots: [slot.time],
                type: "online",
                duration: 60,
                amount: Number(sessionPrice),
            };

            const respose = await createPaidSession(bookingData);


            // const cardElement = elements.getElement(CardElement);

            // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: cardElement,
            //         billing_details: {
            //             name: form.name,
            //             email: form.email,
            //         },
            //     },
            // });

            // if (paymentResult.error) {
            //     throw new Error(paymentResult.error.message);
            // }

            // if (paymentResult.paymentIntent.status === "succeeded") {
            //     toast.success("Booking successful!", { position: "top-center" });
            console.log(respose)
            if (respose.data.success) {
                toast.success("Booking successful! Your session is confirmed.", { position: 'top-center' });
                navigate("/studentProfile");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Something went wrong", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <NavBar></NavBar>
            <h2 className="text-2xl font-bold text-primary mb-6">Checkout</h2>

            <section className="grid md:grid-cols-2 gap-6">
                {/* Left Column: Booking Summary + Student Info */}
                <div className="space-y-6">
                    {/* Booking Summary */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            Booking Summary
                        </h2>
                        <div className="bg-surface p-6 rounded-xl shadow-lg space-y-4 border border-default">
                            <div className="flex items-center gap-4">
                                <img
                                    alt={sessionTitle}
                                    className="w-16 h-16 rounded-full object-cover"
                                    src={sessionImage}
                                />
                                <div>
                                    <p className="font-semibold text-lg text-primary">
                                        {isWorkshop ? sessionTitle : `Session with ${mentorName}`}
                                    </p>
                                    <p className="text-sm text-secondary">{mentorTitle}</p>
                                </div>
                            </div>
                            <div className="border-t border-default my-4"></div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-secondary">Date:</span>
                                    <span className="font-medium text-primary">{slot?.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Day:</span>
                                    <span className="font-medium text-primary">{slot?.day}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Time:</span>
                                    <span className="font-medium text-primary">{slot?.time.start} - {slot?.time.end}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-secondary">Session Type:</span>
                                    <span className="font-medium text-primary">{isWorkshop ? sessionType : '1 : 1'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Price:</span>
                                    <span className="font-medium text-primary">
                                        {isWorkshop
                                            ? `${sessionPrice} EGP`
                                            : `$${Number(sessionPrice).toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="border-t border-default my-2"></div>
                                <div className="flex justify-between text-base font-bold">
                                    <span className="text-primary">Total:</span>
                                    <span className="text-brand">
                                        {isWorkshop
                                            ? `${sessionPrice} EGP`
                                            : `$${Number(sessionPrice).toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Card Details section */}
                    <div className="bg-surface p-6 rounded-xl shadow-lg border border-default">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Card Details</h2>
                        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                            {/* Card Number */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-secondary">
                                    Card Number
                                </label>
                                <div className="p-3 border border-input rounded-lg bg-white">
                                    <CardNumberElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#32325d',
                                                    '::placeholder': { color: '#a0aec0' },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Expiration Date and CVC */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-secondary">
                                        Expiration Date
                                    </label>
                                    <div className="p-3 border border-input rounded-lg bg-white">
                                        <CardExpiryElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#32325d',
                                                        '::placeholder': { color: '#a0aec0' },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-secondary">
                                        CVC
                                    </label>
                                    <div className="p-3 border border-input rounded-lg bg-white">
                                        <CardCvcElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#32325d',
                                                        '::placeholder': { color: '#a0aec0' },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={handlePay}
                                    className={`w-full py-3 px-4 rounded cursor-pointer text-white font-medium ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`}
                                >
                                    {loading ? "Processing..." : "Pay & Book Now"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </section>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;
