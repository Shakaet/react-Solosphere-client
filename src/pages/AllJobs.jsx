// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from 'react'
// import JobCard from '../components/JobCard'

// const AllJobs = () => {

//    let [data,setData]=useState([])
  
  
//     useEffect(()=>{
//       fetch("http://localhost:9000/add-jobs")
//       .then(res=>res.json())
//       .then(data=>setData(data))
//     },[])
//   return (
//     <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
//       <div>
//         <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
//           <div>
//             <select
//               name='category'
//               id='category'
//               className='border p-4 rounded-lg'
//             >
//               <option value=''>Filter By Category</option>
//               <option value='Web Development'>Web Development</option>
//               <option value='Graphics Design'>Graphics Design</option>
//               <option value='Digital Marketing'>Digital Marketing</option>
//             </select>
//           </div>

//           <form>
//             <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
//               <input
//                 className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
//                 type='text'
//                 name='search'
//                 placeholder='Enter Job Title'
//                 aria-label='Enter Job Title'
//               />

//               <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
//                 Search
//               </button>
//             </div>
//           </form>
//           <div>
//             <select
//               name='category'
//               id='category'
//               className='border p-4 rounded-md'
//             >
//               <option value=''>Sort By Deadline</option>
//               <option value='dsc'>Descending Order</option>
//               <option value='asc'>Ascending Order</option>
//             </select>
//           </div>
//           <button className='btn'>Reset</button>
//         </div>
//         <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {
//             data.map(item=><JobCard job={item}></JobCard>)
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AllJobs










import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useLoaderData } from 'react-router-dom';

const AllJobs = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  let {count}= useLoaderData()
  console.log("count",count)

  let [curretPages,setCurrentPages]=useState(0)
  let [itemPerPages,setItemPerPages]=useState(15)

  let numOfPages= Math.ceil(count/itemPerPages)
  console.log("noOfPages",numOfPages)


  let pages=[]
  for (let i=0;i<numOfPages;i++){

    pages.push(i)
  }



  useEffect(() => {
    fetch(`http://localhost:9000/add-jobs?page=${curretPages}&size=${itemPerPages}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, [curretPages,itemPerPages]);

  const handleFilter = () => {
    let result = data;

    // Filter by category
    if (categoryFilter) {
      result = result.filter((job) => job.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by deadline
    if (sortOrder) {
      result = result.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredData(result);
  };

  const handleReset = () => {
    setCategoryFilter('');
    setSearchQuery('');
    setSortOrder('');
    setFilteredData(data);
  };

  useEffect(() => {
    handleFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, searchQuery, sortOrder]);

  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select
              name='category'
              id='category'
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFilter();
            }}
          >
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button
                type='submit'
                className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
              >
                Search
              </button>
            </div>
          </form>

          <div>
            <select
              name='sortOrder'
              id='sortOrder'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='asc'>Ascending Order</option>
              <option value='dsc'>Descending Order</option>
            </select>
          </div>

          <button className='btn' onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredData.map((item) => (
            <JobCard key={item._id} job={item} />
          ))}
        </div>

      <div className='flex justify-center mt-10 gap-1'>
      {
  pages.map((page, index) => (
    <div key={index} className="">
      <input
        className="btn"
        type="radio"
        onClick={()=>setCurrentPages(page)}
        // name={`options-${page}`}
        aria-label={page}
        defaultChecked
      />
      
    </div>
  ))
}

<div>
            <select
              name='itemPerPages'
              id='itemPerPages'
              value={itemPerPages}
              onChange={(e) => {
                setItemPerPages(e.target.value)
                setCurrentPages(0)
              }}
              className='border p-4 rounded-lg'
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </div>
      </div>

      



      </div>
    </div>
  );
};

export default AllJobs;

