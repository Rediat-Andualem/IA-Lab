
import React from 'react'
import BookingTable from './BookingTable'
function App() {
  let day = '12/20/2024'
    let reasonForBlock=2
  return (
    <>
      <BookingTable day={day} reasonForBlock={reasonForBlock}/>
    </>
  )
}

export default App

