import React, { useEffect, useRef, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

const Batches = () => {

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState([])

    const pageRef = useRef(null)

    const getProducts = async() => {
        const response = await fetch("https://dummyjson.com/products?limit=100")
        const result = await response.json();
        setTotalProducts(result.products)
        setProducts(result.products);
        setNumberOfPages(new Array(Math.ceil(result.products.length / 3)).fill(""))
    }
    useEffect(()=>{
        getProducts();
    },[])

    const handleSearch = (e) =>{
        const search = e.target.value
        const searchedProduct = totalProducts.filter((product)=>{
            return search.toLocaleLowerCase() === '' ? product : product.title.includes(search.toLocaleLowerCase())
        })
        setProducts(searchedProduct);
        setNumberOfPages(new Array(Math.ceil(searchedProduct.length/3)).fill(""))
        pageRef.current.value = 1;
        setPage(1)
    }

    return (
        <div className='min-h-screen w-full bg-batch-page-bg py-10'>
            <h1 className='text-[5rem] text-center font-[700] text-batch-page-heading'>Chai aur Code</h1>
            <div className='flex justify-center w-[90%]'>
                <div className='flex flex-col items-start bg-[#F9F7F7] w-[90%] p-10 rounded-xl'>
                    <h2 className='text-[2.5rem] font-semibold text-[#313131]'>Batches</h2>
                    <p className='text-xl text-[#4b4747]'>Create learner’s batch and share information at the same time.</p>
                    
                        <div className='mt-8 flex flex-row items-center justify-start gap-3'>
                            <input type="text" onChange={handleSearch}
                                className='min-w-[20rem] border border-[#BEBEBE] rounded-[4px] text-xl p-3 outline-none'
                                placeholder='Search by Title'
                            />
                            <button
                                className='text-xl bg-batch-page-button rounded-[4px] text-white py-3 px-8'
                            >Search</button>
                        </div>
                    <table className='w-full '>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            products.length > 0 ?
                            products.slice(page * 3 - 3, page * 3).map((product) =>(
                                <tr>
                                    <td className='w-[60%] overflow-hidden'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-[8rem] overflow-hidden'>
                                                <img src={product?.images[0]} alt="" loading='lazy' className='object-contain'/>
                                            </div>
                                            <span>{product?.title}</span>
                                        </div>
                                    </td>
                                    <td>{product?.price}</td>
                                    <td>{product?.rating}</td>
                                    <td>{product?.stock}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4} className='text-center text-gray-400 py-8'>No products found</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    
                    <div
                        className='flex justify-end items-center gap-3 w-full'
                    >
                        <span
                            className='text-[1.2rem] text-gray-600'
                        >Rows per page</span>
                        <div className='py-1 px-2 border border-gray-400 rounded-md bg-white'>
                            <select name="" id="" onChange={(e)=>{
                                setPage(e.target.value);
    
                            }}
                            ref={pageRef}
                            className='bg-transparent outline-none px-1'
                            >
                                
                                {
                                    numberOfPages.map((_, index)=>(
                                        <option
                                        key={index} value={index+1}
                                        >   
                                            {index+1}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            page > 1 ?
                            <span
                                onClick={()=>{
                                    setPage((prev) => prev - 1)
                                    pageRef.current.value = page - 1
                                }}
                            >
                                <IoMdArrowDropleftCircle size={24}/>
                            </span>
                            :
                            <span className='text-gray-400 font-bold'>
                                <IoMdArrowDropleftCircle size={24}/>
                            </span>
                        }
                        {
                            page < numberOfPages.length ?
                            <span
                                onClick={()=>{
                                    setPage((prev) => prev + 1)
                                    pageRef.current.value = page + 1
                                }}
                            >
                                <IoMdArrowDroprightCircle size={24}/>
                            </span>
                            :
                            <span className='text-gray-400 '>
                                <IoMdArrowDroprightCircle size={24}/>
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Batches