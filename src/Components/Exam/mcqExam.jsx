import { useState } from "react";

const toppings = [
    {
        name: "Capsicum",
        price: 1.2,
    },
    {
        name: "Paneer",
        price: 2.0,
    },
    {
        name: "Red Paprika",
        price: 2.5,
    },
    {
        name: "Onions",
        price: 3.0,
    },
    {
        name: "Extra Cheese",
        price: 3.5,
    },
    {
        name: "Baby Corns",
        price: 3.0,
    },
    {
        name: "Mushroom",
        price: 2.0,
    },
];

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export function MCQExam() {
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
    );

    const [total, setTotal] = useState(0);

    const handleChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + toppings[index].price;
                }

                return sum;
            },
            0
        );

        setTotal(totalPrice);
    };

    return (
        <div>
            <h3>Select Toppings</h3>
            <ul>
                {toppings.map(({ name, price }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        checked={checkedState[index]}
                                        onChange={() => handleChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>
                                        {name}
                                    </label>
                                </div>
                                <div>{getFormattedPrice(price)}</div>
                            </div>
                        </li>
                    );
                })}

                <li>
                    <div>
                        <div>
                            Total: <span>{getFormattedPrice(total)}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
