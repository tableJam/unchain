import React from 'react'

const FausetLink = (prop: {link: string, img: string}) => {
  const {link,img} = prop;
  return (
    <div className='ml-20' onClick={()=>window.open(link)}>
      <img width="90px" height='90px' src={img}/>
      Native Coin
    </div>
  )
}

export default FausetLink