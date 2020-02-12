import React, { useState, useEffect } from "react";

const Comments = () => {
    const [comments, setComments] = useState<{ id: number; name: string; comment: string }[]>([]);

    useEffect(() => {
        fetch("/comments").then((res) => res.json().then((json) => setComments(json)));
    }, []);

    return (
        <ul>
            {comments.map((c) => (
                <li key={c.id}>
                    {c.name}: {c.comment}
                </li>
            ))}
        </ul>
    );
};

export default Comments;
