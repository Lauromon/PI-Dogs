import './pagination.css';

export default function Pagination({ nextpage, prevPage }) {
    return (
        <div className='paginationContainer'>
            <button onClick={prevPage}  >
                Prev.
            </button>
            <button onClick={nextpage} >
                Next
            </button>
        </div >)
}
