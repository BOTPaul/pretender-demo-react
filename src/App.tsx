import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
    const [photos, setPhotos] = useState<Record<string, any>[]>([]);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        fetch("/photos").then((res) => {
            if (res.status === 200) {
                res.json().then((json) => setPhotos(json));
            }
        });
    });

    async function selectPhoto(photoId: string) {
        const res = await fetch(`/photos/${photoId}`);
        if (res.status === 200) {
            const photo = await res.json();
            setPhoto(photo.src);
        }
    }

    return (
        <div className="app">
            <div className="card title-card">
                <h1>Pretender Demo</h1>
                <span>This app is making HTTP calls, but they are intercepted by the Pretender server.</span>
                <span>
                    Checkout <code>server.ts</code> to see how it works.
                </span>
                <pre>
                    {`//// server.ts ////

import Pretender from "pretender";

const PHOTOS: Record<string, { id: number, src: string }> = {
    "10": {
        id: 10,
        src: "https://media.giphy.com/media/UdqUo8xvEcvgA/giphy.gif"
    },
    "42": {
        id: 42,
        src: "https://media0.giphy.com/media/Ko2pyD26RdYRi/giphy.gif"
    }
}

export default function createServer() {
    const server = new Pretender(function () {
        this.get("/photos", () => {
            const all = JSON.stringify(Object.keys(PHOTOS).map(k => PHOTOS[k]));
            return [200, { "Content-Type": "application/json" }, all];
        })

        this.get("/photos/:id", request => {
            const idParameter: string = (request.params as any).id;
            const photo = JSON.stringify(PHOTOS[idParameter]);
            return [200, { "Content-Type": "application/json" }, photo];
        })
    });

    return server;
}`}
                </pre>
                <span>
                    If you have the network tab open, you'll see our calls to{" "}
                    <em>
                        <strong>/photos</strong>
                    </em>{" "}
                    and{" "}
                    <em>
                        <strong>/photos/:id</strong>
                    </em>{" "}
                    are not listed.
                </span>
                <span>They have been intercepted before hitting the standard XHTTP request handler.</span>
            </div>
            <div className="card demo-card">
                <ul>
                    {photos.map((p) => (
                        <li onClick={() => selectPhoto(p.id)} key={p.id}>
                            {p.id}
                        </li>
                    ))}
                </ul>
                {photo ? (
                    <div>
                        <img src={photo} alt={photo} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="card footer-card">
                <span>Checkout the </span>
                <a href="https://github.com/pretenderjs/pretender">Pretender Docs</a>
                <span> for more info</span>
            </div>
        </div>
    );
};

export default App;
