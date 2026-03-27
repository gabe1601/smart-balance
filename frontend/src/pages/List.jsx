import { useState } from "react";
import { useEffect } from "react";

function Content({ reload }) {

    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [sortType, setSortType] = useState("recent");
    const [showModal, setShowModal] = useState(false);
    const [selectId, setSelectId] = useState(null);

    const dateFormatter = new Intl.DateTimeFormat('pt-BR');

    const loadTransactions = async (pageNumber) => {
        const response = await fetch(`http://localhost:8080/transaction?page=${pageNumber}&size=10`);
        const data = await response.json();

        setTransactions(data.content);
        setTotalPages(data.totalPages);
        setPage(data.number);
    };

    useEffect(() => {
        loadTransactions(page);
    }, [page, reload]);

    const filterTransactions = transactions.filter((t) => {
        if (filter === "all") return true;
        return t.type === filter;
    });

    const translateTypes = (type) => {
        if (type === "INCOME") return "Entrada";
        if (type === "EXPENSE") return "Saída";
        return type;
    }

    const handleEdit = async (id, place, value) => {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, [place]: value } : t))
    }

    const handleSave = async (id) => {
        const transaction = transactions.find(t => t.id === id);

        try {
            await fetch(`http://localhost:8080/transaction/${transaction.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(transaction),
            });
            setEditingId(null);
        } catch (error) {
            console.error("Erro ao salvar ", error)
        }
    }

    const sortedTransaction = [...filterTransactions].sort((a, b) => {
        switch (sortType) {
            case "bigger":
                return b.value - a.value;

            case "smaller":
                return a.value - b.value;

            case "older":
                return new Date(a.date) - new Date(b.date);

            case "recent":
                return new Date(b.date) - new Date(a.date);
            default:
                return 0;
        }
    })

    const deleteTransaction = async (id) => {
        await fetch(`http://localhost:8080/transaction/${id}`, {
            method: "DELETE"
        });
        setTransactions(prev =>
            prev.filter(t => t.id !== id)
        );
    }

    return (

        <div className="">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-20 w-40 border-collapse border text-center bg-[#292929] focus:outline-none shadow-md px-4 py-2 rounded relative"
            >
                <option value="INCOME">Entrada</option>
                <option value="EXPENSE">Saída</option>
                <option value="all">Todos</option>
            </select>
            <select
                onChange={(e) => setSortType(e.target.value)}
                className="ml-20 w-40 border-collapse border text-center bg-[#292929] focus:outline-none shadow-md px-4 py-2 rounded relative"
            >
                <option value="">Selecione</option>
                <option value="bigger">Maior valor</option>
                <option value="smaller">Menor valor</option>
                <option value="older">Mais antigo</option>
                <option value="recent">Mais recente</option>
            </select>
            <table className="border-collapse border text-center w-6xl m-3">
                <thead>
                    <tr className="h-10">
                        <th className="border-collapse border bg-[#292929]">ID</th>
                        <th className="border-collapse border bg-[#292929]">DATA</th>
                        <th className="border-collapse border bg-[#292929]">DECRIÇÃO</th>
                        <th className="border-collapse border bg-[#292929]">QUANTIDADE</th>
                        <th className="border-collapse border bg-[#292929]">VALOR</th>
                        <th className="border-collapse border bg-[#292929]">MOVIMENTAÇÃO</th>
                        {(filter === "INCOME" || filter === "all") && <th className="border-collapse border  bg-[#292929]">COMPRADOR</th>}
                        <th className="border-collapse border bg-[#292929]">AÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTransaction.map((t) => (
                        <tr key={t.id} className="h-8 focus:outline">
                            <td className="border-collapse border bg-[#292929]">{t.id}</td>
                            <td
                                className="border-collapse border bg-[#292929]"
                                contentEditable={editingId === t.id}
                                suppressContentEditableWarning
                                onBlur={(e) => handleEdit(t.id, 'date', e.target.innerText)}>
                                {dateFormatter.format(new Date(t.date))}
                            </td>
                            <td
                                className="border-collapse border bg-[#292929]"
                                contentEditable={editingId === t.id}
                                suppressContentEditableWarning
                                onBlur={(e) => handleEdit(t.id, 'description', e.target.innerText)}>
                                {t.description}
                            </td>
                            <td
                                className="border-collapse border bg-[#292929] contentEditable"
                                contentEditable={editingId === t.id}
                                suppressContentEditableWarning
                                onBlur={(e) => handleEdit(t.id, 'quantity', e.target.innerText)}>
                                {t.quantity}
                            </td>
                            <td
                                className="border-collapse border bg-[#292929]"
                                contentEditable={editingId === t.id}
                                suppressContentEditableWarning
                                onBlur={(e) => handleEdit(t.id, 'value', e.target.innerText)}>
                                {Number(t.value).toFixed(2)}
                            </td>
                            <td className="border-collapse border bg-[#292929]">{translateTypes(t.type)}</td>
                            {(filter === "INCOME" || filter === "all") && <td className="border-collapse border bg-[#292929]"
                                contentEditable={editingId === t.id}
                                suppressContentEditableWarning
                                onBlur={(e) => handleEdit(t.id, 'buyer', e.target.innerText)}>
                                {t.buyer}
                            </td>}
                            <td className="flex">
                                {editingId === t.id ? (
                                    <button
                                        onClick={() => handleSave(t.id)}
                                        className="border-collapse border text-center w-full h-8 cursor-pointer cursor-pointer bg-[#76cca1] hover:bg-[#069c51] text-[#2d6348] hover:text-[#012b16]"
                                    >
                                        Salvar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEditingId(t.id)}
                                        className="duration-200 border-collapse border bg-[#292929] text-center w-full h-8 cursor-pointer bg-[#b8c1f5] hover:bg-[#394cb8] text-[#435299] hover:text-[#01061f]">
                                        Editar
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectId(t.id)
                                        setShowModal(true)
                                    }}
                                    className="duration-200 order-collapse border bg-[#292929] text-center w-full h-8 cursor-pointer bg-[#a38181] hover:bg-[#fa7a7a] text-[#8a4e4e] hover:text-[#260101]">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-[#292929] p-6 rounded-lg shadow-lg text-white">
                        <h2 className="text-lg mb-4">
                            Você realmente deseja excluir?
                        </h2>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={async () => {
                                    await deleteTransaction(selectId);
                                    setShowModal(false);
                                    setSelectId(null);
                                }}
                                className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded cursor-pointer"
                            >
                                Sim
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectId(null);
                                }}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded cursor-pointer"
                            >
                                Não
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Content