import { toTitleCase } from "../../services/utility"

const ReportCard = ({data,report_type}:{data:any[],report_type:string}) => {
  return (
    <div className='bg-gray-100 w-fit m-10' ><h3 className="p-2 w-full py-2 text-l font-bold text-cyan-900 uppercase bg-teal-500">{toTitleCase(report_type)} Report</h3>
      <div className='text-center w-fit grid grid-cols-2 '>{data.map((entry:any)=><><p key={entry[report_type]+"1"} className="p-2 font-semibold border border-teal-100 ">{entry[report_type]}</p><p key={entry[report_type]+"2"} className='border border-teal-100 p-2 '>{entry["count"]}</p></>)}
    </div>
    </div>
  )
}

export default ReportCard