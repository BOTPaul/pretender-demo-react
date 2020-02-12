import Pretender from "pretender";

const USERS: Record<string, { id: number, name: string, role: string, avatar: string }> = {
    "12345": {
        id: 12345,
        name: "Ned",
        role: "Read Only User",
        avatar: "https://vignette.wikia.nocookie.net/gameofthrones/images/3/34/Eddard_Stark.jpg/revision/latest/top-crop/width/360/height/360?cb=20190701140812"
    },
    "54321": {
        id: 54321,
        name: "Bob",
        role: "Read Write User",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg"
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

        this.get("/comments", (res) => {
            return [
                200,
                { "content-type": "application/json" },
                JSON.stringify([
                    { name: "Fred", comment: "This is a comment" },
                    { name: "Fred", comment: "Hello World" }
                ])
            ];
        })
    });

    return server;
}