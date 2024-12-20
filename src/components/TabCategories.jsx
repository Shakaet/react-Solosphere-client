/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import JobCard from './JobCard'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const TabCategories = () => {



  // let [data,setData]=useState([])


  // useEffect(()=>{
  //   fetch("http://localhost:9000/homeJob")
  //   .then(res=>res.json())
  //   .then(data=>setData(data))
  // },[])

  const {data: data,isLoading,error} = useQuery({ queryKey: ['jobs'], queryFn: async()=>{
    let {data}= await axios.get('http://localhost:9000/homeJob')
    return data


  }, })
  console.log(data,isLoading,error)

  if(isLoading){
    return <span className="loading loading-spinner loading-lg"></span>
  }
  

  // const { data: newData = [], isLoading, error } = useQuery({
  //   queryKey: ['jobs'],
  //   queryFn: () => axios.get('http://localhost:9000/homeJob').then((res) => res.data),
  // });
  
  // console.log(newData);
  
  return (
    <Tabs>
      <div className=' container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
          Browse Jobs By Categories
        </h1>

        <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className='flex items-center justify-center'>
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {/* <JobCard /> */}
            {/* <JobCard />
            <JobCard />
            <JobCard /> */}

{
  data
    .filter((item) => item.category === "Web Development")
    .map((item) => <JobCard job={item} key={item.id}></JobCard>)
}

            
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {
    data
     .filter((item) => item.category === "Graphics Design")
      .map((item) => <JobCard job={item} key={item.id}></JobCard>)
   }
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {
    data
     .filter((item) => item.category === "Digital Marketing")
      .map((item) => <JobCard job={item} key={item.id}></JobCard>)
   }
     
          </div>
        </TabPanel>
      </div>
    </Tabs>
  )
}

export default TabCategories
