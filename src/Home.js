import React, { useEffect, useState } from "react";
import DELETE_ICON from "./assets/delete_icon.png";
import EDIT_ICON from "./assets/edit_icon.png";
import jsonData from "./db.json";

const Home = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [validInput, setvalidInput] = useState(false);

    useEffect(() => {
        setData(jsonData.data);
    }, []);

    const editItem = (item) => {
        setName(item.name);
        setAmount(item.amount);
        setQuantity(item.itemCount);
        setIdToUpdate(item.id);
    };

    const deleteItem = (id) => {
        let items = [...data];
        items.splice(id, 1);
        setData(items);
    };

    const handleChange = (index) => {
        if (index >= 0) {
            let items = [...data];
            let item = { ...items[index] };
            item.amount = Number(amount);
            item.itemCount = Number(quantity);
            item.name = name;
            items[index] = item;
            setData(items);
            setIdToUpdate(null);
        } else {
            const obj = {
                id: data.length,
                name: name,
                itemCount: Number(quantity),
                amount: Number(amount),
            };
            let newArr = [...data, obj];
            setData(newArr);
        }
        setAmount("");
        setName("");
        setQuantity("");
    };

    const addUpdateItem = () => {
        let isValid = false;
        if (name && quantity && amount) {
            if (!isNaN(quantity) && !isNaN(amount)) {
                setError("");
                setvalidInput(true);
                isValid = true;
            } else {
                setvalidInput(false);
                setError("Enter valid inputs , number for Quantity and amount ");
            }
        } else {
            setvalidInput(false);
            setError("All fields are required.");
        }

        if (isValid) {
            if (idToUpdate) {
                // update scenario
                handleChange(idToUpdate);
            } else {
                // add scenario
                handleChange();
            }
        }
    };

    useEffect(() => {
        if (!name && !quantity && !amount) {
            setIdToUpdate(null);
        }
    }, [idToUpdate, name, amount, quantity]);

    useEffect(() => {
        if (error && validInput && name && amount && quantity) {
            setError("");
        }
    }, [error, name, amount, quantity, validInput]);

    const handleClear = () => {
        setName("");
        setError("");
        setAmount("");
        setQuantity("");
        setIdToUpdate("");
        setvalidInput(false);
    };

    return (
        <>
            <div className="split left">
                <span>
                    <u>Today's Purchase - Customer List</u>
                </span>
                <div className="header">
                    <span className="header-item">Name</span>
                    <span className="header-item">Quantity</span>
                    <span className="header-item">Price</span>
                    <span className="header-item">Action</span>
                </div>
                {data?.map((item) => (
                    <div className="header" key={item.id}>
                        <span className="header-item">{item.name}</span>
                        <span className="header-item">{item.itemCount}</span>
                        <span className="header-item">{item.amount}</span>
                        <span className="header-item">
                            <img className="icon" src={EDIT_ICON} alt="edit" onClick={() => editItem(item)} />
                            <span className="space"></span>
                            <img className="icon" src={DELETE_ICON} alt="delete" onClick={() => deleteItem(item.id)} />
                        </span>
                    </div>
                ))}
            </div>
            <div className="split right">
                <h1>Add / Update Customer</h1>
                <div className="input-container">
                    <label className="input-label" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label className="input-label" htmlFor="quantity">
                        Quantity:
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        id="quantity"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label className="input-label" htmlFor="name">
                        Amount:
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        id="amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {error.length > 0 && (
                    <>
                        <span style={{ color: "red" }}>{error}</span>
                        <br />
                    </>
                )}

                <button className="button" onClick={() => addUpdateItem()}>
                    {idToUpdate ? "Update" : "Add"}
                </button>
                <span className="space"></span>
                <button className="button" onClick={() => handleClear()}>
                    Clear
                </button>
            </div>
        </>
    );
};

export default Home;
