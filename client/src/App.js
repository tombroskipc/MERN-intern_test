import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    let [inputSearch, setInputSearch] = useState('');
    let [users, setUsers] = useState([]);
    let [toggleEditKey, setToggleEditKey] = useState(0);
    let [inputUsernameChange, setInputUsernameChange] = useState('');
    let [inputEmailChange, setInputEmailChange] = useState('');
    let [inputBirthdateChange, setInputBirthdateChange] = useState('');
    let [toggleRefresh, setToggleRefresh] = useState(false);
    useEffect(() => {
        axios.get(`http://54.172.183.43:5000/users?name=${inputSearch}`)
        .then(res => setUsers(res.data));

    }, [inputSearch, toggleRefresh]);
    const handleOnChange = (e) => {
        setInputSearch(e.target.value);
    }
    const toggleEdit = (e) => {
        setToggleEditKey(e.target.attributes.currid.value);
        setInputUsernameChange(e.target.attributes.currusername.value);
        setInputEmailChange(e.target.attributes.curremail.value);
        setInputBirthdateChange(e.target.attributes.currbirthdate.value);
        // console.log('toggleEditKey';
    }
    const applyChange = () => {
        let updatedUser = {
            _id: toggleEditKey,
            username: inputUsernameChange,
            email: inputEmailChange,
            birthdate: inputBirthdateChange
        }
        console.log('updatedUser: ', JSON.stringify(updatedUser));
        axios.post("http://54.172.183.43:5000/users", updatedUser).then(function (response) {
            //handle success
            console.log(response);
            setToggleEditKey(0);
            setToggleRefresh(!toggleRefresh);
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        setToggleEditKey(0);
    }
    const handleUsernameChange = (e) => {
        setInputUsernameChange(e.target.value);
    }
    const handleEmailChange = (e) => {
        setInputEmailChange(e.target.value);
    }
    const handleBirthdateChange = (e) => {
        setInputBirthdateChange(e.target.value);
    }
    return (
        <div className="App">
            <label>
                Input username or email:
                <input type="text" value={inputSearch}
                    onChange={handleOnChange} placeholder='Search...' />
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        if (toggleEditKey === user._id) {
                            return (
                                <tr key={user._id}>
                                    <td><input type="text" value={inputUsernameChange} onChange={handleUsernameChange} /></td>
                                    <td><input type="text" value={inputEmailChange} onChange={handleEmailChange} /></td>
                                    <td><input type="text" value={inputBirthdateChange} onChange={handleBirthdateChange} /></td>
                                    <td> <button currid={user._id} onClick={applyChange}>APPLY</button> </td>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.birthdate}</td>
                                    <td> <button currid={user._id} currusername={user.username} curremail={user.email} currbirthdate={user.birthdate} onClick={toggleEdit}>Edit</button> </td>
                                </tr>
                            )
                        }

                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
