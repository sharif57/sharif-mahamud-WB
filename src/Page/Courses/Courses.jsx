// import { useEffect } from "react";
// import { useState } from "react";


// const Courses = () => {

//     const [courses, setCourses] = useState([])

//     useEffect(() => {
//         fetch('https://itder.com/api/get-course-list')
//             .then(res => res.json())
//             .then(data => setCourses(data.courseData))
//     }, [])


//     return (
//         <div className="m-mt_16px">


//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">



//                 {
//                     courses.map((course, index) => <div key={index} className=" bg-white shadow-lg rounded-lg overflow-hidden">
//                         <div className="relative">
//                             <img className="h-[400px] w-full" src={course.photo} alt="" />
//                             <div className="absolute top-0 left-0 p-2">
//                                 <h3 className="text-white text-xl font-bold">{course.course_name}</h3>
//                             </div>
//                         </div>
//                         <div className="p-4">
//                             <h2 className="text-gray-800 text-lg font-semibold mb-2">{course.course_name}</h2>
//                             <div className="flex items-center justify-between mb-4">

//                                 <span className="flex text-blue-500 text-md">★★★★★</span>
//                                 <span className="ml-2 text-gray-600 text-md font-bold">{course.trainer_data.name}</span>
//                             </div>
//                             {/* <div className="flex gap-2 mb-4 flex-wrap">
//                                 {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
//                                     <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div> */}
//                             <p className="text-gray-600 text-md mb-4">
//                                 Course Details <span className="text-blue-500">Show Details</span>
//                             </p>
//                             <hr />
//                             <div className="mt-4 flex justify-between items-center">
//                                 <div>
//                                     <span className="line-through text-gray-400 text-sm">Tk {course.regular_price}</span>

//                                     <span className="text-green-600 text-md font-bold ml-2">
//                                         -{Math.round(((course.regular_price - course.discount_price) / course.regular_price) * 100)}%
//                                     </span>
//                                     <span className="text-black text-lg font-bold ml-2">
//                                         Tk {course.discount_price}
//                                     </span>
//                                 </div>

//                                 {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
//                             </div>
//                             <div className="mt-4 flex gap-2">
//                                 <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">Add To Cart</button>

//                             </div>
//                         </div>
//                     </div>)
//                 }

//             </div>
//         </div>
//     );
// };

// export default Courses;


import { useEffect, useState } from "react";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState([]);

    const saveToLocalStorage = (data) => {
        localStorage.setItem('courses', JSON.stringify(data));
    };

    const handleAddToCart = (course) => {
        setCart((prevCart) => [...prevCart, course]);
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
                    saveToLocalStorage(data.courseData);
                });
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="m-mt_16px">
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

            <div>
                {
                    cart.map((c, index) => <div key={index}>
                        <div>
                        <h1>{c.course_name}</h1>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Courses;
