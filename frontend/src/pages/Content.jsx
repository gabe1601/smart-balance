import Graphics from "./Graphics";
import List from "./List";

function Content({ reload }) {

    return (
        <div className="flex">
            <List reload={reload} />
            <Graphics reload={reload} />
        </div>

    )
}

export default Content;