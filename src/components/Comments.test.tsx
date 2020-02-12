import React from "react";
import { render, act, RenderResult, waitForElement } from "@testing-library/react";
import Comments from "./Comments";
import Pretender from "pretender";

describe("comments component", () => {
    let server = null;

    beforeEach(() => {
        server = new Pretender(function() {
            this.get("/comments", (res) => {
                return [
                    200,
                    { "content-type": "application/json" },
                    JSON.stringify([
                        { id: 1, name: "Fred", comment: "This is a comment" },
                        { id: 2, name: "Fred", comment: "Hello World" }
                    ])
                ];
            });
        });
    });

    test("renders hello world comment", async () => {
        await act(async () => {
            const { getByText } = render(<Comments />);
            await waitForElement(() => getByText("Fred: Hello World"));
            const el = getByText("Fred: Hello World");
            expect(el).toBeInTheDocument();
        });
    });
});
