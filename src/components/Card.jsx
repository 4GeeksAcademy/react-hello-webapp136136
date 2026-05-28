import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    // Mapeo crucial: si es 'people', la guía visual usa 'characters'
    const imageType = type === "people" ? "characters" : type;
    const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`;

    const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === type);

    return (
        <div className="card m-2" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img 
                src={imageUrl} 
                className="card-img-top" 
                alt={item.name}
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Image+Not+Available"; }} 
            />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">
                        Learn more!
                    </Link>
                    <button 
                        className="btn btn-outline-warning" 
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({ type: 'REMOVE_FAVORITE', payload: { uid: item.uid, type } });
                            } else {
                                dispatch({ type: 'ADD_FAVORITE', payload: { ...item, type } });
                            }
                        }}
                    >
                        <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};