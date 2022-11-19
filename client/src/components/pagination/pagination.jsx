import './pagination.css';

export default function Pagination({ nextpage, prevPage }) {
    return (
        <div>
            <button onClick={prevPage}  >
                Regresar a tanda anterior
            </button>
            <button onClick={nextpage} >
                Ir a la siguiente tanda
            </button>
        </div >)
}
