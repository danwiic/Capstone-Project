import { X } from "lucide-react";
import { useState } from "react";

type RefundReason =
    | "defective"
    | "wrong_item"
    | "changed_mind"
    | "not_as_described"
    | "arrived_late"
    | "other";

interface FormData {
    orderNumber: string;
    email: string;
    fullName: string;
    reason: RefundReason;
    description: string;
    refundMethod: "original_payment" | "store_credit" | "product";
    agreeToTerms: boolean;
}

interface RefundProps {
    onClose: () => void;
    isOpen: boolean;
}

export default function Refund({ onClose, isOpen }: RefundProps) {
    if (!isOpen) return null;
    const [formStep, setFormStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        orderNumber: "",
        email: "",
        fullName: "",
        reason: "defective",
        description: "",
        refundMethod: "original_payment",
        agreeToTerms: false
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const reasonOptions: { value: RefundReason; label: string }[] = [
        { value: "defective", label: "Product is defective" },
        { value: "wrong_item", label: "Received wrong item" },
        { value: "changed_mind", label: "Changed my mind" },
        { value: "not_as_described", label: "Item not as described" },
        { value: "arrived_late", label: "Item arrived too late" },
        { value: "other", label: "Other reason" }
    ];

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 0) {
            if (!formData.orderNumber) {
                newErrors.orderNumber = "Order number is required";
            }
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Please enter a valid email";
            }
            if (!formData.fullName) {
                newErrors.fullName = "Full name is required";
            }
        } else if (step === 1) {
            if (!formData.reason) {
                newErrors.reason = "Please select a reason";
            }
            if (!formData.description || formData.description.length < 10) {
                newErrors.description = "Please provide a detailed description (min 10 characters)";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNextStep = () => {
        if (validateStep(formStep)) {
            setFormStep(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setFormStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.agreeToTerms) {
            setErrors({ agreeToTerms: "You must agree to the terms" });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900/45 z-50">
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="text-center items-center flex flex-col gap-4">
                        <div className=" flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="mt-3 text-lg font-medium text-gray-900">Refund Request Submitted!</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Your refund request has been submitted successfully. We will process your request within 3-5 business days.
                            You will receive a confirmation email at {formData.email}.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Reference number: REF-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                        </p>
                        <button
                            className="mt-6 w-full px-4 py-3 bg-mayormoto-pink text-white font-medium text-sm
                            rounded-md hover:bg-mayormoto-pink/80"
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormStep(0);
                                setFormData({
                                    orderNumber: "",
                                    email: "",
                                    fullName: "",
                                    reason: "defective",
                                    description: "",
                                    refundMethod: "original_payment",
                                    agreeToTerms: false
                                });
                            }}
                        >
                            Submit Another Request
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/45 z-50">
            <div className="w-md h-auto mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 mb-6">Product Refund Request</h1>
                    <X size={18} onClick={onClose} />
                </div>

                <div className="mb-6">
                    <div className="flex items-center">
                        <div className={`flex-1 border-t-2 ${formStep >= 0 ? 'border-pink-500' : 'border-gray-300'}`}></div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${formStep >= 0 ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>1</div>
                        <div className={`flex-1 border-t-2 ${formStep >= 1 ? 'border-pink-500' : 'border-gray-300'}`}></div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${formStep >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
                        <div className={`flex-1 border-t-2 ${formStep >= 2 ? 'border-pink-500' : 'border-gray-300'}`}></div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${formStep >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
                        <div className={`flex-1 border-t-2 ${formStep >= 2 ? 'border-pink-500' : 'border-gray-300'}`}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Order Info</span>
                        <span>Refund Details</span>
                        <span>Review</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {formStep === 0 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number *</label>
                                <input
                                    type="text"
                                    id="orderNumber"
                                    name="orderNumber"
                                    value={formData.orderNumber}
                                    onChange={handleChange}
                                    className={` block w-full rounded-md border-gray-300 
                                       px-3 py-2 border outline-none text-sm
                                         ${errors.orderNumber ? 'border-red-500' : ''}`}
                                    placeholder="Example: ORD-12345678"
                                />
                                {errors.orderNumber && <p className="mt-1 text-sm text-red-600">{errors.orderNumber}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={` block w-full rounded-md border-gray-300 
                                        px-3 py-2 border  outline-none  text-sm
                                          ${errors.orderNumber ? 'border-red-500' : ''}`}
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={` block w-full rounded-md border-gray-300 
                                        px-3 py-2 border outline-none text-sm
                                          ${errors.orderNumber ? 'border-red-500' : ''}`}
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full px-4 py-2 bg-mayormoto-pink text-white 
                                    font-medium rounded-md hover:bg-mayormoto-pink/80"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {formStep === 1 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Refund *</label>
                                <select
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className={` block w-full rounded-md border-gray-300 
                                        px-3 py-2 border outline-none text-sm
                                        ${errors.reason ? 'border-red-500' : ''}`}
                                >
                                    {reasonOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className={` block w-full rounded-md border-gray-300 
                                         px-3 py-2 border outline-none text-sm
                                        ${errors.description ? 'border-red-500' : ''}`}
                                    placeholder="Please provide details about your refund request"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div>
                                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                                    Attach Supporting Image (If damaged or defective)
                                </label>
                                <div className="mt-2 flex items-center">
                                    <label
                                        htmlFor="fileUpload"
                                        className="px-4 py-2 bg-mayormoto-pink text-white text-sm
                                         font-medium rounded-md cursor-pointer hover:bg-mayormoto-pink/80
                                         "
                                    >
                                        Choose File
                                    </label>
                                    <input
                                        id="fileUpload"
                                        name="fileUpload"
                                        type="file"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Refund Method</label>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            id="original_payment"
                                            name="refundMethod"
                                            type="radio"
                                            value="original_payment"
                                            checked={formData.refundMethod === "original_payment"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label htmlFor="original_payment" className="ml-3 block text-sm text-gray-700">
                                            Refund to original payment method
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="store_credit"
                                            name="refundMethod"
                                            type="radio"
                                            value="store_credit"
                                            checked={formData.refundMethod === "store_credit"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label htmlFor="store_credit" className="ml-3 block text-sm text-gray-700">
                                            Store credit (10% bonus)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="store_credit"
                                            name="refundMethod"
                                            type="radio"
                                            value="product"
                                            checked={formData.refundMethod === "product"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label htmlFor="store_credit" className="ml-3 block text-sm text-gray-700">
                                            Receive product change
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-2 text-sm">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-4 py-2 bg-mayormoto-pink text-white font-medium rounded-md
                                     hover:bg-mayormoto-pink/80"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="flex flex-col gap-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-sm font-medium text-gray-800">Review Your Information</h3>
                                <dl className="mt-2 space-y-2">
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Order Number:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">{formData.orderNumber}</dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Email:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">{formData.email}</dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Full Name:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">{formData.fullName}</dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Reason:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">
                                            {reasonOptions.find(o => o.value === formData.reason)?.label}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Refund Method:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">
                                            {formData.refundMethod === "original_payment"
                                                ? "Original payment method"
                                                : "Store credit (+10% bonus)"}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1">
                                        <dt className="text-xs font-medium text-gray-500">Description:</dt>
                                        <dd className="text-xs text-gray-900 col-span-2">{formData.description}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="flex items-start gap-1">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                        I agree to the refund policy *
                                    </label>
                                    <p className="text-gray-500">
                                        I understand that refunds typically take 5-7 business days to process once approved.
                                    </p>
                                    {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end text-sm gap-2">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-mayormoto-pink text-white font-medium rounded-md
                                     hover:bg-mayormoto-pink/85 disabled:bg-mayormoto-pink/45"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : "Submit Refund Request"}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}