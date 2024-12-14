import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import { data } from 'autoprefixer'
import Swal from 'sweetalert2';

const MyPostedJobs = () => {


  let {user}= useContext(AuthContext)

  let [myPostedData,setMyPostedData]=useState([])

  useEffect(()=>{
    fetch(`http://localhost:9000/my-posted-job/${user.email}`)
    .then(res=>res.json())
    .then(data=>setMyPostedData(data))

    
  },[user.email])


  let handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        fetch(`http://localhost:9000/my-posted-job/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              // Update the UI
              let remaining = myPostedData.filter((item) => item._id !== id);
              setMyPostedData(remaining);
  
              // Show success message
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your job has been deleted.',
              });
            } else {
              // Show info message if no deletion happened
              Swal.fire({
                icon: 'info',
                title: 'No Deletion',
                text: 'No job was deleted.',
              });
            }
          })
          .catch((error) => {
            console.error('Error deleting job:', error);
            // Show error message
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete the job. Please try again later.',
            });
          });
      }
    });
  };
  

  console.log(myPostedData)
  return (
    <section className='container px-4 mx-auto pt-12 overflow-x-hidden'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>My Posted Jobs</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {myPostedData.length} Job
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4  overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price Range</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Description
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>

                {
  myPostedData.map((data, index) => (
    <tr key={index}>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {data.jobTitle}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {/* Assuming the deadline is in ISO format */}
        {new Date(data.deadline).toLocaleDateString("en-US")}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        ${data.minPrice} - ${data.maxPrice}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <p className={`px-3 py-1 ${data.category=="Web Development" && "text-blue-500"} ${data.category=="Graphics Design" && "text-yellow-500"} ${data.category=="Digital Marketing" && "text-red-500"}  bg-blue-100/60 text-xs rounded-full font-extrabold`}>
            {data.category}
          </p>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        {data.description.length > 30
          ? `${data.description.slice(0, 30)}...`
          : data.description}
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          <button
            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
            onClick={() => handleDelete(data._id)} // Replace with your delete handler
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <Link
            to={`/update/${data._id}`} // Assuming you have an `id` field in your data
            className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
      </td>
    </tr>
  ))
}

                  {/* <tr>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      E-commerce Website Development
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      28/05/2024
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      $500-$600
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-2'>
                        <p
                          className={`px-3 py-1  text-blue-500 bg-blue-100/60 text-xs  rounded-full`}
                        >
                          Web Development
                        </p>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      Dramatically redefine bleeding-edge...
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-6'>
                        <button className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>

                        <Link
                          to={`/update/1`}
                          className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyPostedJobs