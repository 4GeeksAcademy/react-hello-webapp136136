import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.people.length === 0) {
            fetch("https://www.swapi.tech/api/people/")
                .then(res => res.json())
                .then(data => dispatch({ type: 'SET_PEOPLE', payload: data.results }))
                .catch(err => console.error(err));
        }
        if (store.planets.length === 0) {
            fetch("https://www.swapi.tech/api/planets/")
                .then(res => res.json())
                .then(data => dispatch({ type: 'SET_PLANETS', payload: data.results }))
                .catch(err => console.error(err));
        }
        if (store.vehicles.length === 0) {
            fetch("https://www.swapi.tech/api/vehicles/")
                .then(res => res.json())
                .then(data => dispatch({ type: 'SET_VEHICLES', payload: data.results }))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-danger my-4">Characters</h2>
                <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
                    {store.people && store.people.length > 0 ? (
                        store.people.map(person => <Card key={person.uid} item={person} type="people" />)
                    ) : (
                        <p className="text-muted ps-2">Loading characters...</p>
                    )}
                </div>

                <h2 className="text-danger my-4">Planets</h2>
                <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
                    {store.planets && store.planets.length > 0 ? (
                        store.planets.map(planet => <Card key={planet.uid} item={planet} type="planets" />)
                    ) : (
                        <p className="text-muted ps-2">Loading planets...</p>
                    )}
                </div>

                <h2 className="text-danger my-4">Vehicles</h2>
                <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
                    {store.vehicles && store.vehicles.length > 0 ? (
                        store.vehicles.map(vehicle => <Card key={vehicle.uid} item={vehicle} type="vehicles" />)
                    ) : (
                        <p className="text-muted ps-2">Loading vehicles...</p>
                    )}
                </div>
            </div>
        </>
    );
};