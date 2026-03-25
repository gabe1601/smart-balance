import Graphics from "./Graphics";
import List from "./List";

function Content({ reload }) {
    return (
        <div className="flex">
            <List />
            <Graphics />
        </div>

    )
}

export default Content;