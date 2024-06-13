import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";



const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }

  return (
    <div>
        <nav>
            <ul className='pagination'>
                <li className="page-item"> {/* Previous page button */}
                    <a className="page-link-nav" 
                        onClick={goToPrevPage}  // Click event handler for navigating to previous page
                        href='#'> 
                        <HiOutlineArrowSmallLeft />
                    </a>
                </li>
                 {/* Mapping through each page number */}
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}  // Click event handler for setting the current page
                            className='page-link-pg' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item"> {/* Next page button */}
                    <a className="page-link-nav" 
                        onClick={goToNextPage} // Click event handler for navigating to next page
                        href='#'>
                        <HiOutlineArrowSmallRight />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Pagination