import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Single = () => {
    const { type, id } = useParams();
    const [properties, setProperties] = useState(null);

    const imageType = type === "people" ? "characters" : type;
    const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`;

    useEffect(() => {
        setProperties(null); 
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setProperties(data.result.properties);
                }
            })
            .catch(err => console.error(err));
    }, [type, id]);

    if (!properties) return <div className="text-center mt-5">Loading detailed information...</div>;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card mb-3 border-0">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img 
                                src={imageUrl} 
                                className="img-fluid rounded shadow" 
                                alt={properties.name}
                                onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available"; }} 
                            />
                        </div>
                        <div className="col-md-8 px-4 d-flex flex-column justify-content-center">
                            <div className="card-body">
                                <h1 className="card-title mb-4">{properties.name}</h1>
                                {}
                                <Link to="/" className="btn btn-primary mt-3">Back home</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr className="text-danger my-4" style={{ borderTop: "3px solid" }} />
                
                <div className="row text-danger text-center fw-bold">
                    {type === "people" && (
                        <>
                            <div className="col"><div>Height</div><span className="text-dark fw-normal">{properties.height}</span></div>
                            <div className="col"><div>Mass</div><span className="text-dark fw-normal">{properties.mass}</span></div>
                            <div className="col"><div>Hair Color</div><span className="text-dark fw-normal">{properties.hair_color}</span></div>
                            <div className="col"><div>Skin Color</div><span className="text-dark fw-normal">{properties.skin_color}</span></div>
                            <div className="col"><div>Eye Color</div><span className="text-dark fw-normal">{properties.eye_color}</span></div>
                            <div className="col"><div>Birth Year</div><span className="text-dark fw-normal">{properties.birth_year}</span></div>
                        </>
                    )}
                    {type === "planets" && (
                        <>
                            <div className="col"><div>Climate</div><span className="text-dark fw-normal">{properties.climate}</span></div>
                            <div className="col"><div>Diameter</div><span className="text-dark fw-normal">{properties.diameter}</span></div>
                            <div className="col"><div>Gravity</div><span className="text-dark fw-normal">{properties.gravity}</span></div>
                            <div className="col"><div>Population</div><span className="text-dark fw-normal">{properties.population}</span></div>
                            <div className="col"><div>Orbital Period</div><span className="text-dark fw-normal">{properties.orbital_period}</span></div>
                            <div className="col"><div>Terrain</div><span className="text-dark fw-normal">{properties.terrain}</span></div>
                        </>
                    )}
                    {type === "vehicles" && (
                        <>
                            <div className="col"><div>Model</div><span className="text-dark fw-normal">{properties.model}</span></div>
                            <div className="col"><div>Class</div><span className="text-dark fw-normal">{properties.vehicle_class}</span></div>
                            <div className="col"><div>Manufacturer</div><span className="text-dark fw-normal">{properties.manufacturer}</span></div>
                            <div className="col"><div>Cost</div><span className="text-dark fw-normal">{properties.cost_in_credits}</span></div>
                            <div className="col"><div>Length</div><span className="text-dark fw-normal">{properties.length}</span></div>
                            <div className="col"><div>Passengers</div><span className="text-dark fw-normal">{properties.passengers}</span></div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};