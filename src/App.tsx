import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
    const [users, setUsers] = useState<Record<string, any>[]>([]);
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        fetch("/users").then((res) => {
            if (res.status === 200) {
                res.json().then((json) => setUsers(json));
            }
        });
    });

    async function selectUser(userId: string) {
        const res = await fetch(`/users/${userId}`);
        if (res.status === 200) {
            const user = await res.json();
            setUser(user);
        }
    }

    return (
        <main>
            <section className="section">
                <div className="card">
                    <div className="card-content">
                        <h1 className="title">How does it work?</h1>
                        <div className="columns is-mobile is-centered">
                            <div className="column">
                                <h2 className="title">1. Prep your server</h2>
                                <pre>
                                    {`import Pretender from "pretender";

const USERS: Record<string, { id: number, name: string, role: string, avatar: string }> = {
    "12345": {
        id: 12345,
        name: "Ned",
        role: "Read Only User",
        avatar: "some url"
    },
    "54321": {
        id: 12345,
        name: "Bob",
        role: "Read Write User",
        avatar: "another url"
    }
}

export default function createServer() {
    const server = new Pretender(function () {
        this.get("/users", () => {
            const all = JSON.stringify(Object.keys(USERS).map(k => USERS[k]));
            return [200, { "Content-Type": "application/json" }, all];
        })

        this.get("/users/:id", request => {
            const idParameter: string = (request.params as any).id;
            const user = JSON.stringify(USERS[idParameter]);
            return [200, { "Content-Type": "application/json" }, user];
        })
    });

    return server;
}`}
                                </pre>
                            </div>
                            <div className="column">
                                <h2 className="title">2. Import it during dev</h2>
                                <pre>
                                    {`import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import makeServer from "./server";

if (process.env.NODE_ENV === "development") {
    makeServer();
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`}
                                </pre>
                                <hr></hr>
                                <h2 className="title">3. That's it!</h2>
                                <p>
                                    Your HTTP calls to <strong>/users</strong> and <strong>/users/:id</strong> are now
                                    being intercepted and handled by the mock server
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="card">
                        <div className="card-content">
                            <div className="columns">
                                <div className="column">
                                    <h2 className="title">Here's a simple example</h2>
                                    <div className="panel">
                                        <p className="panel-heading">Users</p>
                                        {users.map((u) => (
                                            <a className="panel-block" key={u.id} onClick={() => selectUser(u.id)}>
                                                <span className="panel-icon">
                                                    <i className="fas fa-user" aria-hidden="true"></i>
                                                </span>
                                                <span>
                                                    {u.name} - {u.role}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="panel">
                                        {user ? (
                                            <>
                                                <p className="panel-heading">
                                                    {user.name} - {user.role}
                                                </p>
                                                <div className="panel-block">
                                                    <div className="container">
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            style={{ width: "100%" }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default App;
