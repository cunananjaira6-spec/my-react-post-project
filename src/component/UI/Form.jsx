import {useState} from 'react';

export default function Form()
{
    //usestate
    const [name, setName] = useState("");

    //events
    function handleSubmit(e) {
        e.preventDefault();
        console.log(name);
    }

    return (
        <form methods="POST" onSubmit={handleSubmit}>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Input your name here"
            />
            <button>Submit</button>
        </form>
    )
}