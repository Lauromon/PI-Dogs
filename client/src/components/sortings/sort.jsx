import React from "react";
import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions/actions.js"
import './sort.css'

export default function Sortings() {
    const dispatch = useDispatch();

    const handleSort = (e) => {
        dispatch(orderBy(e.target.value))
    }

    return (
        <div>
            <select defaultValue='default' onChange={handleSort} >
                <option value="default" disabled>Sort by:</option>
                <option key={0} value="asc">Name (A-Z)</option>
                <option key={1} value="desc">Name (Z-A)</option>
                <option key={2} value="lower">Weight (asc)</option>
                <option key={3} value="higher">Weight (desc)</option>
            </select>
        </div>
    );
}
