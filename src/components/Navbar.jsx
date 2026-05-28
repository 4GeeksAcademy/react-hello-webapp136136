import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-5 py-3 shadow-sm">
            <Link to="/">
                <span className="navbar-brand mb-0 h1 text-dark fw-bold">STAR WARS BLOG</span>
            </Link>
            <div className="dropdown">
                <button 
                    className="btn btn-primary dropdown-toggle d-flex align-items-center" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    Favorites 
                    <span className="badge bg-secondary ms-2">{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{ minWidth: "220px" }}>
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-center text-muted">(empty)</li>
                    ) : (
                        store.favorites.map((fav, index) => (
                            <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                <Link to={`/single/${fav.type}/${fav.uid}`} className="text-decoration-none text-dark text-truncate" style={{ maxWidth: "160px" }}>
                                    {fav.name}
                                </Link>
                                <i 
                                    className="fas fa-trash text-danger ms-2" 
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch({ type: 'REMOVE_FAVORITE', payload: { uid: fav.uid, type: fav.type } });
                                    }}
                                ></i>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};