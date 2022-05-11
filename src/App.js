import { Stack, AppBar } from "@mui/material";
import { Graph } from "react-d3-graph";
import { ReactComponent as ICLogo } from "./assets/imgs/logo.svg";
import { useQuery } from "@apollo/client";
import { SEARCH } from "./queries";
import Search from "./component/Search";
import { useState } from "react";

function App() {
  const [words, setWords] = useState("");
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { limit: 100, words: words },
  });
  console.log(loading);
  console.log(!loading ? data.search : undefined);
  console.log(error);

  // graph payload (with minimalist structure)
  /*const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice", value: "temp" }],
    links: [
      { source: "Harry", target: "Sally", label: "섹스관계" },
      { source: "Harry", target: "Alice" },
    ],
  };*/

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 700,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 1000,
    d3: {
      alphaTarget: 0.05,
      gravity: -400,
      linkLength: 300,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 12,
      fontWeight: "normal",
      highlightColor: "red",
      highlightFontSize: 12,
      highlightFontWeight: "bold",
      highlightStrokeColor: "SAME",
      highlightStrokeWidth: 1.5,
      labelProperty: "name",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 450,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
    },
    link: {
      color: "#d3d3d3",
      fontColor: "red",
      fontSize: 10,
      fontWeight: "normal",
      highlightColor: "blue",
      highlightFontSize: 8,
      highlightFontWeight: "bold",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      semanticStrokeWidth: false,
      strokeWidth: 4,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
    },
  };
  const onClickNode = function (nodeId, node) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    <Stack>
      <AppBar color="secondary">
        <ICLogo width={40} height={40} />
        <Search setWords={setWords} />
      </AppBar>
      {!loading &&
      data &&
      data.search.nodes.length !== 0 &&
      data.search.links.length !== 0 ? (
        <Graph
          id="graph-id" // id is mandatory
          data={data.search}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      ) : undefined}
    </Stack>
  );
}

export default App;
