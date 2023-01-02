import React from 'react'
import Link from 'next/link'
import { getData } from '../utils/fetchData';

function index() {
  return (
    <div className='text-red'>index</div>
  )
}
// export async function getServerSideProps(context) {
//   const res = await getData('product')
//   console.log(res)
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
export default index