import { useState } from "react";

function Graphics() {

    const [value, setValue] = useState(null);

    const getValue = async () => {
        try {
            const response = await fetch(`http://localhost:8080/transaction/sumValue`);
            const data = response.json

            setValue(data.number);
        } catch(error){
            console.error(error)
        }

    return (
            <div>
                <h1>Valor total</h1>
                <h1>{value}</h1>

            </div>
        )
    }
}

    export default Graphics