// import React from 'react';


// const UserCard = ({ user }) => {
//   return(

//     <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 h-80 mt-6 ">
//       <img className="w-full h-32 object-cover text-black" src={user.avatar.url} alt={user.name} />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-black">{user.name}</h2>
//         <p className="text-gray-600 mt-2">{user.companyName}</p>
//       </div>
//     </div>
// )
// }

// export default UserCard;



import React from "react";
import {Card, CardHeader, CardBody} from "@nextui-org/react";


const UserCard = ({ user }) =>{
  
  return (
    <Card className="py-4 bg-black h-80 rounded-md shadow-cyan-700/50 transition-all duration-700  hover:skew-y-3 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold ">{user.name}</p>
        <small className="text-default-500">{user.companyName}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 "> 
      <img 
    
  src={user.avatar.url}
  alt={user.name}
  width={270}
  onError={(e) => console.error('Error loading image:', e)}
/>
       </CardBody>
    </Card>
  );
}
export default UserCard;