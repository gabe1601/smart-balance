import { useState } from "react";
import { NumericFormat } from "react-number-format";

function Header({onProductSaved}) {

    const [description, setDescription] = useState("")
    const [buyer, setBuyer] = useState("")
    const [quantity, setQuantity] = useState("")
    const [value, setValue] = useState("")
    const [type, setType] = useState(false);

    const handleSubmit = async () => {

        const transaction = {
            description: description,
            buyer: buyer,
            quantity: Number(quantity),
            value: value,
            type: type.toUpperCase()
        };


        const response = await fetch("http://localhost:8080/transaction", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(transaction)
        });
        if (response.ok) {
            setDescription("");
            setBuyer("");
            setQuantity("");
            setValue("");

            onProductSaved();
        }
    };

    return (
        <div>

            <div className="flex justify-between py-5">
                <div className="p-5 text-center">
                    <h1 className="text-5xl">SMART</h1>
                    <h1 className="text-4xl ">balance</h1>
                </div>
                <div className="px-20">
                    <h1 className="text-3xl text-center p-5">Cadastre uma movimentação</h1>
                    <div className="flex gap-5 px-5 text-center">
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="income"
                                checked={type === "income"}
                                onChange={(e) => setType(e.target.value)}
                                className="accent-[#ff8830] m-2"
                            />
                            Entrada
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="expense"
                                checked={type === "expense"}
                                onChange={(e) => setType(e.target.value)}
                                className="accent-[#ff8830] m-2"
                            />
                            Saída
                        </label>

                        <input className="duration-300 border rounded-md p-1 shadow-md bg-[#292929] focus:outline-none w-xs focus:bg-[#f2e3d5] focus:text-black"
                            type="text"
                            placeholder="Descição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input className={`duration-300 border rounded-md p-1 shadow-md bg-[#292929] focus:outline-none w-xs focus:bg-[#f2e3d5] focus:text-black
                        ${type === "income" ? "opacity-100" : "opacity-30 pointer-events-none"}`}
                            type="text"
                            placeholder="Comprador"
                            value={buyer}
                            onChange={(e) => setBuyer(e.target.value)}
                        />
                        <input className="duration-300 border rounded-md p-1 shadow-md bg-[#292929] focus:outline-none focus:bg-[#f2e3d5] focus:text-black"
                            type="number"
                            placeholder="Quantidade"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <NumericFormat className="duration-300 border rounded-md p-1 shadow-md bg-[#292929] focus:outline-none focus:bg-[#f2e3d5] focus:text-black"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            decimalScale={2}
                            fixedDecimalScale
                            placeholder="R$ 0,00"
                            value={value}
                            onValueChange={(values) => {
                                setValue(values?.floatValue || 0);
                            }}
                        />

                        <button onClick={handleSubmit} className="duration-300 flex items-center justify-center border rounded-md text-lg hover:text-xl text-[#8c7261]
                         bg-[#ffd9bf] hover:bg-[#FF8830] hover:text-[#1f1006] w-64 border rounded-xl cursor-pointer">
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header;