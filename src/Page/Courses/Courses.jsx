

import { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState([]);

    const saveCartToLocalStorage = (cartData) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    const handleAddToCart = (course) => {
        const newCart = [course];
        setCart(newCart);
        saveCartToLocalStorage(newCart); 
        console.log("Added to Cart:", course);
    };

    const loadCourses = () => {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            setCourses(JSON.parse(storedCourses));
        } else {
            fetch('https://itder.com/api/get-course-list')
                .then(res => res.json())
                .then(data => {
                    setCourses(data.courseData);
                    localStorage.setItem('courses', JSON.stringify(data.courseData));
                });
        }
    };

    const loadCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    };

    useEffect(() => {
        loadCourses();
        loadCartFromLocalStorage();
    }, []);

    return (
        <div className="m-mt_16px relative">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img className="h-[400px] w-full" src={course.photo} alt={course.course_name} />
                            <div className="absolute top-0 left-0 p-2">
                                <h3 className="text-white text-xl font-bold">{course.course_name}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-gray-800 text-lg font-semibold mb-2">{course.course_name}</h2>
                            <div className="flex items-center justify-between mb-4">
                                <span className="flex text-blue-500 text-md">★★★★★</span>
                                <span className="ml-2 text-gray-600 text-md font-bold">{course.trainer_data.name}</span>
                            </div>
                            <p className="text-gray-600 text-md mb-4">
                                Course Details <span className="text-blue-500">Show Details</span>
                            </p>
                            <hr />
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <span className="line-through text-gray-400 text-sm">Tk {course.regular_price}</span>
                                    <span className="text-green-600 text-md font-bold ml-2">
                                        -{Math.round(((course.regular_price - course.discount_price) / course.regular_price) * 100)}%
                                    </span>
                                    <span className="text-black text-lg font-bold ml-2">
                                        Tk {course.discount_price}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full font-bold text-md"
                                    onClick={() => handleAddToCart(course)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute">
                <Link to={'/cart'} className="text-4xl fixed top-3 right-40 bg-white rounded-full shadow-lg">
                    <div className="text-black">
                        <div className="indicator">
                            <span className="indicator-item badge badge-secondary">{cart.length}</span>
                            <BiCart className="size-8" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Courses;
