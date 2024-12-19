import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import axios from "axios"

const BidRequests = () => {

  let {user}=useContext(AuthContext)


  let [myBidsreq,setMyBitsreq]= useState([])

  useEffect(()=>{

    axios.get(`http://localhost:9000/bit/${user?.email}?buyerM=true`)
    .then(data=>setMyBitsreq(data.data))

  },[])




  let handleStatusChanged=(id,prevStatus,status)=>{
    console.table({id,prevStatus,status})

    if(prevStatus === status || prevStatus=== "Complete"){
      return alert("not alowed")
    }

    if(prevStatus==="In Progress"){
      return alert("not allowed")
    }
    if(prevStatus==="Rejected"){
      return alert("not allowed")
    }
    axios
    .put(`http://localhost:9000/updatedStatusBit/${id}`, { status: status })
    .then((response) => {
      if (response.data.modifiedCount > 0) {
        setMyBitsreq((prevBids) =>
          prevBids.map((bid) =>
            bid._id === id ? { ...bid, status: status } : bid
          )
        );
        alert(`Status updated to ${status}`);
      }
    })

  }
  return (
    <section className='container px-4 mx-auto my-12 overflow-x-hidden'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {myBidsreq.length} Requests
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
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Email</span>
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
                        <span>Price</span>
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
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                {
  myBidsreq.map((item) => (
    <tr key={item.id || item._id}> {/* Add a unique key for each item */}
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
       {item.jobTitle}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
       {item.email}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
      {item.deadline}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
      {item.price}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <p className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs">
            {item.category}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          <h2 className="text-sm font-normal">{item.status}</h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">

        {/* set inProgess */}
        <div className="flex items-center gap-x-6">
          <button
          onClick={()=>handleStatusChanged(item._id,item.status,"In Progress")}
          disabled={item.status ==="In Progress" || item.status ==="Rejected" || item.status ==="Complete"}

            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
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
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
     {/* // set Rejected */}
          <button
          onClick={()=>handleStatusChanged(item._id,item.status,"Rejected")}
          disabled={item.status ==="Rejected" || item.status==="In Progress" || item.status ==="Complete"}
            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
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
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  ))
}

                  
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BidRequests
