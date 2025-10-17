import React, { useState } from 'react'

function TodoFilter() {

    const [filter, setFilter] = useState({
        createdDate : 'today'
    })

  return (
    <>

        <div>
            <label htmlFor="">Created Date</label>
            
        </div>
    
    </>
  )
}

export default TodoFilter