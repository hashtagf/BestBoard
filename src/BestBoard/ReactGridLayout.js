import React from "react"
import { WidthProvider, Responsive } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)
const originalLayouts = getFromLS("layouts") || {}

class MyResponsiveGrid extends React.Component {
  render() {
    // {lg: layout1, md: layout2, ...}
    // var layouts = getLayoutsFromSomewhere();
    let layouts = JSON.parse(JSON.stringify(originalLayouts))
    return (
      <ResponsiveGridLayout className="layouts" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key="1">1</div>
        <div key="2">2</div>
        <div key="3">3</div>
      </ResponsiveGridLayout>
    )
  }
}



export default MyResponsiveGrid

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}