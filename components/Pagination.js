import Link from "next/link"
import { PER_PAGE } from "../config"
export default function Pagination({page,count}) {
  const totalPage = count/PER_PAGE

  return (
    <>
      
      {page>1 && <Link className="btn-secondary" href={`/events?page=${+page-1}`}>Prev</Link>}
      {page<totalPage && <Link className="btn-secondary" href={`/events?page=${+page+1}`}>Next</Link>}

    </>
  )
}
