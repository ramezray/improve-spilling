import {createSignal} from "solid-js";

function User(props) {
    const [selectedUser, setSelectedUser] = createSignal('');

    function handleChange(event) {
        const user = event.target.value;
        setSelectedUser(user);
        props.onSelect(user);
    }

    const selectStyles = {
        padding: '10px',
        fontSize: '16px',
        background: '#0d6efd',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '10px',
    };

    return (
        <div>
            <select style={selectStyles} on:change={handleChange}>
                <option value="">Select User</option>
                <option value="Kenzie">Kenzie</option>
                <option value="Joy">Joy</option>
                <option value="Ray">Ray</option>
            </select>
        </div>
    );
}

export default User;