import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Home />} />
            <Route path="single/:type/:id" element={<Single />} />
            <Route path="*" element={<h1>Not found!</h1>} />
        </Route>
    )
);