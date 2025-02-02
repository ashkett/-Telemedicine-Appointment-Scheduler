//this is also changed thodusa te slots multiple rows madhe kelet

import React, { useContext, useEffect, useState } from 'react' // Added useState import
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  // Extract docId from useParams
  const { docId } = useParams(); // Destructure docId from the useParams object
  const { doctors, currencySymbol } = useContext(AppContext); // Access doctors from AppContext

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null); // Initialize state for doctor information

  const [docSlots, setDocSlots] = useState([]) //slots sathi

  const [slotIndex, setSlotIndex] = useState(0)  //slot index sathi

  const [slotTime, setSlotTime] = useState(''); //slot time sathi

  // Function to fetch doctor information
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId); // Find doctor by _id
    setDocInfo(docInfo); // Update the state with the fetched doctor's information
  };

  const getAvailableSlots = async () => {
    setDocSlots([]) 

    //getting current date

    let today = new Date()

    for(let i = 0; i < 7; i++){
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      
      // setting end time of the date with index

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      //setting hours

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([] , { hour: '2-digit', minute: '2-digit'})

        //add slots to array timeSlots

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        //increment current time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }//while ends

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo(); // Call fetchDocInfo whenever doctors or docId changes
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* doctor details */}
      <div className='flex flex-cols sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''  />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 p-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
          {/* doc info , name , degree , experience  */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt='' /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* doctor about*/}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt=''></img></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>  {/* he css properties are for taking the div to the right side */}
        <p>Booking Slots</p>
        <div className='flex flex-wrap gap-3 items-center w-full mt-4'> {/* Added flex-wrap here */}
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white ' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex flex-wrap gap-3 items-center w-full mt-4'> {/* Added flex-wrap here */}
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-3'}`} key={index}> {/* whenever we want dynamic css properties we use {``} curly braces and backticks*/}
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>  
      </div>

      {/* listing related doctors */}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  );
};

export default Appointment;
