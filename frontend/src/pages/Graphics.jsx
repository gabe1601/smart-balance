import { useEffect, useState } from "react";

function Graphics({ reload }) {

    const [value, setValue] = useState(null);

    const getValue = async () => {
        try {
            const response = await fetch(`http://localhost:8080/transaction/sumValue`);
            const data = await response.json()

            setValue(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getValue();
    }, [reload]);

    return (
        <div>
            <div className="flex flex-wrap m-8">
                <div className="flex flex-col justify-center h-30 w-60 shadow-xl/30 border-collapse border rounded-xl m-5 text-center ">
                    <h1 className="text-xl">Entradas</h1>
                    <h1 className="text-3xl p-3">R$ {Number(value).toFixed(2)}</h1>
                </div>
                <div className="flex flex-col justify-center h-30 w-60 shadow-xl/30 border-collapse border rounded-xl m-5 text-center ">
                    <h1 className="text-xl ">Saídas</h1>
                    <h1 className="text-3xl p-3">R$ </h1>
                </div>
                <div className="flex flex-col justify-center h-30 w-60 shadow-xl/30 border-collapse border rounded-xl m-5 text-center ">
                    <h1 className="text-xl ">Total</h1>
                    <h1 className="text-3xl p-3">R$ </h1>
                </div>

            </div>
        </div>

    )

}

export default Graphics