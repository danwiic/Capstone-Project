import { BsImage } from "react-icons/bs";

export default function DisplayProductSkeleton() {
  return (
     <>
         <div
           className="rounded-xs flex flex-col w-56 
         p-6 justify-center gap-2 bg-white"
         >
           <div className="flex flex-col gap-5">
             <div className="flex items-center justify-center w-full  h-32 animate-pulse">
                <BsImage className="text-8xl text-gray-200"/>
             </div>
   
             <div className=" flex flex-col gap-2 cursor-pointer animate-pulse">
               <span
                 className="font-medium text-xs uppercase 
               text-transparent hover:text-mayormoto-blue
               bg-gray-200 rounded-full w-1/4"
               >
                .
               </span>
               <span
                 className="text-sm font-bold break-words 
               bg-gray-200 rounded-full text-transparent"
               >
               .
               </span>
             </div>
           </div>
   
           <div className="text-xl font-medium text-transparent 
           bg-gray-200 rounded-full w-3/5 animate-pulse">
             .
           </div>
         </div>
       </>
  );
}
