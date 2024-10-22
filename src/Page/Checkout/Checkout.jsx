/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Checkout = () => {

    const [cart, setCart] = useState([]);

    const loadCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            const cartWithQuantity = parsedCart.map(item => ({
                ...item,
                quantity: 1
            }));
            setCart(cartWithQuantity);
        }
    };

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleQuantityChange = (index, delta) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            const newQuantity = updatedCart[index].quantity + delta;

            if (newQuantity > 0) {
                updatedCart[index].quantity = newQuantity;
            }
            return updatedCart;
        });
    };

    // Calculate subtotal for a single course
    const calculateSubtotal = (course) => {
        return course.discount_price * course.quantity;
    };

    // Calculate total price for the cart
    const calculateTotalPrice = () => {
        return cart.reduce((total, course) => total + calculateSubtotal(course), 0);
    };


    const [formData, setFormData] = useState({

        fullName: '',
        formNo: '',
        parentName: '',
        parentNumber: '',
        school: '',
        jobInfo: '',
        email: '',
        gender: '',
        presentAddress: '',
        permanentAddress: '',
        nid: '',
        mobile: '',
        guardianName: '',
        dob: '',
        bloodGroup: ''
    });


    console.log(formData)

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };



    const handleSubmit = (e) => {
        e.preventDefault(); 
        localStorage.setItem('formData', JSON.stringify(formData));
        alert('Form data saved to localStorage!');
    };

    return (
        <div className="mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Trainee Admission Form</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="form-section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="fullName" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                name="fullName"
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="formNo" className="block font-semibold text-base mb-2">Form no:</label>
                            <input
                                name="formNo"
                                type="text"
                                id="formNo"
                                value={formData.formNo}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="parentName" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                name="parentName"
                                type="text"
                                id="parentName"
                                value={formData.parentName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="parentNumber" className="block font-semibold text-base mb-2">Number:</label>
                            <input
                                name="parentNumber"
                                type="text"
                                value={formData.parentNumber}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="school" className="block font-semibold text-base mb-2">School/College:</label>
                            <input
                                name="school"
                                type="text"
                                id="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="jobInfo" className="block font-semibold text-base mb-2">Job Information:</label>
                            <input
                                name="jobInfo"
                                type="text"
                                id="jobInfo"
                                value={formData.jobInfo}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold text-base mb-2">Email:</label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block font-semibold text-base mb-2">Gender:</label>
                            <select
                                name="gender"
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="" disabled selected>Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Others">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="presentAddress" className="block font-semibold text-base mb-2">Present Address:</label>
                            <textarea
                                name="presentAddress"
                                id="presentAddress"
                                value={formData.presentAddress}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="permanentAddress" className="block font-semibold text-base mb-2">Permanent Address:</label>
                            <textarea
                                name="permanentAddress"
                                id="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nid" className="block font-semibold text-base mb-2">NID Number:</label>
                            <input
                                name="nid"
                                type="text"
                                id="nid"
                                value={formData.nid}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block font-semibold text-base mb-2">Mobile No:</label>
                            <input
                                name="mobile"
                                type="text"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="guardianName" className="block font-semibold text-base mb-2">Local Guardian’s Name:</label>
                            <input
                                name="guardianName"
                                type="text"
                                id="guardianName"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block font-semibold text-base mb-2">Date of Birth:</label>
                            <input
                                name="dob"
                                type="date"
                                id="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="bloodGroup" className="block font-semibold text-base mb-2">Blood Group:</label>
                            <select
                                name="bloodGroup"
                                id="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="" disabled selected>Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* <button className="btn btn-success">Submit</button> */}

                <div className="m-mt_16px">


                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className="overflow-x-auto w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className="overflow-x-auto">
                                        {cart.map((course, index) => (
                                            <tr key={index} className="border-b border-gray-300 overflow-x-auto">
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-[20%] text-center flex items-center justify-center">
                                                            <RiDeleteBin5Line
                                                                className="text-xl hover:text-footer_color cursor-pointer"
                                                                onClick={() => {
                                                                    setCart(prevCart => prevCart.filter((_, i) => i !== index));
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                                                            <div className="mask">
                                                                <img
                                                                    className="h-[40px] w-[50px] rounded-lg"
                                                                    src={course.photo}
                                                                    alt="Course"
                                                                />
                                                            </div>
                                                            <p className="text-[14.4px] px-[7px] text-center flex">
                                                                {course.course_name}
                                                                <span className="hidden lg:flex">- unit name</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                        Tk {course.discount_price}
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center">
                                                        <div className="border">
                                                            <button
                                                                className="px-4 w-[30px] font-bold my-1.5"
                                                                onClick={() => handleQuantityChange(index, -1)}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                        <div className="border-y">
                                                            <input
                                                                type="number"
                                                                className="font-bold w-[30px] lg:w-[60px] text-center mx-auto h-full"
                                                                value={course.quantity}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="border">
                                                            <button
                                                                className="px-4 w-[30px] font-bold my-1.5"
                                                                onClick={() => handleQuantityChange(index, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                        Tk {calculateSubtotal(course)}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                        Cart Summary
                                    </h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="text-black font-bold">Total Price</p>
                                        <p className="text-black font-bold">
                                            Tk {calculateTotalPrice()}
                                        </p>
                                    </div>

                                    <button
                                        to={'/checkout'}
                                        className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                                    >
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    );
};

export default Checkout;


// import  { useState, useEffect } from 'react';

// function CheckOut() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//     });

//     // Load data from localStorage when the component mounts
// useEffect(() => {
//     const storedData = localStorage.getItem('formData');
//     if (storedData) {
//         setFormData(JSON.parse(storedData));
//     }
// }, []);

//     // Handle input changes and update state only
// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//         ...formData,
//         [name]: value,
//     });
// };

//     // Handle form submission and store data to localStorage
// const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent form refresh
//     localStorage.setItem('formData', JSON.stringify(formData));
//     alert('Form data saved to localStorage!');
// };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>React Local Storage with Submit Button</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name: </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
                        // onChange={handleInputChange}
//                         placeholder="Enter your name"
//                     />
//                 </div>
//                 <div>
//                     <label>Email: </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email"
//                     />
//                 </div>
//                 <div>
//                     <label>Phone: </label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="Enter your phone number"
//                     />
//                 </div>
//                 <div>
//                     <label>Address: </label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         placeholder="Enter your address"
//                     />
//                 </div>
//                 <div>
//                     <label>City: </label>
//                     <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         placeholder="Enter your city"
//                     />
//                 </div>

//                 <button type="submit" style={{ marginTop: '20px' }}>
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CheckOut;
