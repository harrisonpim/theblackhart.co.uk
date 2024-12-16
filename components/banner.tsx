import React from 'react'

export default function Banner() {
  return (
    <div className="bg-white text-black mb-3 text-center text-sm">
      <div className="p-3 lg:w-4/5 xl:w-7/12 lg:px-0 px-4 mx-auto antialiased flex flex-col items-center">
        <p className="font-bold">Please note:</p>
        <p>
          All orders placed after 17th December will be made to order in the new
          year (apart from those marked &quot;Ships in time for Christmas&quot;)
        </p>
      </div>
    </div>
  )
}
