import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from '../providers/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';


const UpdateJob = () => {


  
  const [startDate, setStartDate] = useState(new Date())

  let {user}=useContext(AuthContext)

  let {id}=useParams()

  // console.log(data)

  let link= useNavigate()

  let handleUpdated = (e) => {
    e.preventDefault();
  
    const form = e.target;
  
    const jobTitle = form.job_title.value;
    const email = form.email.value;
    const deadline = form.querySelector(".react-datepicker__input-container input").value; // DatePicker input
    const category = form.category.value;
    const minPrice = form.min_price.value;
    const maxPrice = form.max_price.value;
    const description = form.description.value;
  
    const updatedJob = {
      jobTitle,
      email,
      deadline,
      category,
      minPrice,
      maxPrice,
      description,
    };
  
    console.log(updatedJob);
    // Add logic here to send data to the server or process it as needed

    fetch(`http://localhost:9000/my-posted-job/${id}`, {
      method: 'PUT', // Use 'POST' for creating a new job or 'PUT' for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    })
    .then(res=>res.json())
    .then(data => {
      console.log('Full Response Data:', data);
      console.log('Modified Count:', data.modifiedCount);

      if (data.modifiedCount > 0) {
        // Show a SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Job updated successfully!',
        }).then(() => {
          // Redirect after SweetAlert is dismissed
          link('/my-posted-jobs');
        });
      } else {
        // Show a SweetAlert info message if nothing was updated
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'No changes were made to the job.',
        });
      }
    })
    .catch(error => {
      console.error('Error updating job:', error);
      // Show an error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the job. Please try again later.',
      });
  });
  };


  

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handleUpdated}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                 defaultValue={user.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700 ' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                className='border p-2 rounded-md'
              >
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              cols='30'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
