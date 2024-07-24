import React, { useState, useEffect, useRef } from 'react'
import MoveVector from "../assets/courseImages/move.png"
import { courseData } from '../data/CourseData'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";


const CourseList = () => {

    const [showMenu, setShowMenu] = useState(null)
    const [courses, setCourses] = useState([]);

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        setCourses(courseData);
        console.log("course", courses, courseData)
    }, [])

    const handleSort = () => {
        const _courses = [...courses];
        const dragCourseContent = _courses.splice(dragItem.current , 1)[0];
        _courses.splice(dragOverItem.current, 0, dragCourseContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setCourses(_courses);
    }

    useEffect(() => {
        let handler = ()=>{
            const whatGotClick = event.target;
            if(whatGotClick && !menuRef.current.contains(whatGotClick)){
                setShowMenu(null)
            }
        }
        document.addEventListener("mousedown", handler)
        document.removeEventListener("mousedown", handler)
    })

    const moveToTop = (index) => {
        const _courses = [...courses];  
        const currentCourse = _courses[index];
        const topCourse = _courses[0];

        _courses[index] = topCourse;
        _courses[0] = currentCourse;

        setCourses(_courses);
        setShowMenu(null)
    }

    const moveToBottom = (index) => {
        const _courses = [...courses];  
        const currentCourse = _courses[index];
        const bottomCourse = _courses[_courses.length - 1];

        _courses[index] = bottomCourse;
        _courses[_courses.length - 1] = currentCourse;

        setCourses(_courses);
        setShowMenu(null)
    }

    const deleteCourse = (index) => {
        const _courses = [...courses];
        _courses.splice(index, 1);
        setCourses(_courses);
        setShowMenu(null)
    }

    return (
        <div className='min-h-screen w-full bg-course-page-bg'>
            <h1 className='text-[5rem] text-center font-[700] pt-16 text-course-page-heading'>Chai aur Code</h1>
            <div className='flex justify-center w-[90%]'>
                <div className='flex flex-col items-start bg-white w-[90%] p-6 pb-12 rounded-xl'>
                    <h2 className='text-[2.5rem] font-semibold text-[#313131]'>Manage Bundle</h2>
                    <p className='text-xl text-[#4b4747]'>Change orders of the products based on priority</p>
                    <div className='flex flex-col mt-6 w-full gap-5'>
                        {
                            courses.map((course, index) => (
                                <>
                                    <div className='grid grid-cols-10 border w-[80%] items-center py-2 gap-6 '
                                        draggable
                                        onDragStart={(e) => dragItem.current = index}
                                        onDragEnter={(e) => dragOverItem.current = index}
                                        onDragEnd={handleSort}
                                        onDragOver={(e)=>e.preventDefault()}
                                    >
                                        <span className='col-span-1 w-[30%] place-self-center cursor-move'>
                                            <img src={MoveVector} alt="" className=' pointer-events-none'/>
                                        </span>
                                        <div className='col-span-2 pointer-events-none'>
                                            <img src={course.image} alt="" />
                                        </div>
                                        <h2 className='col-span-4 text-[1.25rem] font-dmsans font-[500]'>{course.courseName}</h2>
                                        <span className='col-span-1 text-[1rem] font-[200]'>{course.price}</span>
                                        <span className='col-span-1  bg-[#DBFFCE] text-center text-[1rem] py-1 rounded-sm border'>{course.type}</span>
                                        <span className='col-span-1 place-self-center relative'>
                                            <span 
                                                onClick={()=>{
                                                    if(showMenu === course.id){
                                                        setShowMenu(null);
                                                    }
                                                    else{
                                                        setShowMenu(course.id);
                                                    }
                                                }}
                                            >
                                                <HiOutlineDotsVertical size={20}/>
                                            </span>
                                            {
                                                showMenu && showMenu === course.id &&
                                                <div
                                                    className=' absolute  w-[250px] bg-white rounded-md shadow-xl drop-shadow-xl h-fit top-[110%] z-40 left-[0%]'>
                                                    <div ref={menuRef} className=' flex flex-col gap-3 p-4'>
                                                        {
                                                            index !== 0 &&
                                                            <div 
                                                                onClick={()=>{moveToTop(index)}}
                                                                className=' flex items-center justify-start text-xl gap-2'> <GoArrowUp/> <span>Move To Top</span></div>
                                                        }
                                                        {
                                                            index !== courses.length - 1 &&
                                                            <div 
                                                                onClick={()=>{moveToBottom(index)}}
                                                                className=' flex items-center justify-start text-xl gap-2'> <GoArrowDown/> <span>Move To Bottom</span></div>
                                                        }
                                                            <div 
                                                                onClick={()=>{deleteCourse(index)}}
                                                                className=' flex items-center justify-start text-xl gap-2 text-red-500'> <RiDeleteBinLine/> <span>Delete</span> </div>
                                                    </div>
                                                </div>
                                            }
                                        </span>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseList


