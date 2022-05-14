import { Stack, AppBar, Paper, CircularProgress } from "@mui/material";
import { Graph } from "react-d3-graph";
import { ReactComponent as ICLogo } from "./assets/imgs/logo.svg";
import { useQuery } from "@apollo/client";
import { SEARCH } from "./queries";
import Search from "./component/Search";
import { useEffect, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function addRandomData(data, myConfig) {
  if (!data) return undefined;
  console.log(data);
  let convertedNodes = data.search.nodes.map((node) => {
    let newNode = { ...node };
    var check = false;
    for (var i = 0; i < data.search.links.length; i++) {
      if (
        node.id === data.search.links[i].source ||
        node.id === data.search.links[i].target
      ) {
        check = true;
        break;
      }
    }
    if (!check) {
      newNode.fx = String(getRandomInt(40, myConfig.width - 40));
      newNode.fy = String(getRandomInt(40, myConfig.height - 40));
    }
    return newNode;
  });
  let result = { search: { nodes: convertedNodes, links: data.search.links } };

  return result;
}

function App() {
  const [words, setWords] = useState("");
  const [renderData, setRenderData] = useState();
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { limit: 100, words: words, width: 850, height: 1500 },
  });
  useEffect(() => {
    setRenderData(addRandomData(data, myConfig));
    console.log(renderData);
  }, [data]);

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
    height: 850,
    width: 1500,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
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
    <Stack alignItems="center">
      <Search setWords={setWords} />
      <Paper
        sx={{
          bgcolor: "#ffffff",
          borderRadius: 10,
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "1500px",
            height: "850px",
          }}
        >
          {!loading &&
          renderData &&
          renderData.search.nodes.length !== 0 &&
          renderData.search.links.length !== 0 ? (
            <Graph
              id="graph-id" // id is mandatory
              data={renderData.search}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
            />
          ) : (
            <CircularProgress size={100} />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default App;
