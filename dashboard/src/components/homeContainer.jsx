import Widget from "./widget/widget";
import Graph from "../components/graph/graph"
import "./homeContainer.css";

export default () => {
    return (
        <div className="maincontainer">
            <div className="widgets">
                <Widget />
            </div>
            <div className="graph">
                <Graph />
            </div>
        </div>
    )
}



