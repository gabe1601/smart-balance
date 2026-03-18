import { NumericFormat } from "react-number-format";

function Header() {

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
                        <div className="">
                            <p>Entrada</p>
                            <input className="border rounded-md p-1 shadow-md focus:outline-none"
                                type="checkbox"
                                placeholder="compra"
                            />
                        </div>
                        <div className="">
                            <p>Saída</p>
                            <input className="border rounded-md p-1 shadow-md focus:outline-none"
                                type="checkbox"
                                placeholder="compra"
                            />
                        </div>
                        <input className="border rounded-md p-1 shadow-md focus:outline-none w-xs focus:bg-[#d1b8a0] focus:text-black"
                            type="text"
                            placeholder="Descição"
                        />
                        <input className="border rounded-md p-1 shadow-md focus:outline-none w-xs focus:bg-[#d1b8a0] focus:text-black"
                            type="text"
                            placeholder="Comprador"
                        />
                        <input className="border rounded-md p-1 shadow-md focus:outline-none focus:bg-[#d1b8a0] focus:text-black"
                            type="number"
                            placeholder="Quantidade"
                        />
                        <NumericFormat className="border rounded-md p-1 shadow-md focus:outline-none focus:bg-[#d1b8a0] focus:text-black"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            decimalScale={2}
                            fixedDecimalScale
                            placeholder="R$ 0.00"
                        />

                        <buttom className="duration-300 flex items-center justify-center text-lg hover:text-xl bg-[#D1B8A0] hover:bg-[#FF8830] text-gray-700 hover:text-[#000000] w-64 border rounded-xl cursor-pointer">
                            Cadastrar
                        </buttom>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header;