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
}