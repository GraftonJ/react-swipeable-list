import "./SwipeableListItem.css";
import React from "react";

class SwipeableListItem extends React.Component {
  // DOM Refs
  listElement;
  wrapper;
  background;

  render() {
    return (
      <>
        <div className="Wrapper" ref={div => (this.wrapper = div)}>
          <div ref={div => (this.background = div)} className="Background">
            <span>Delete</span>
          </div>
          <div ref={div => (this.listElement = div)} className="ListItem">
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default SwipeableListItem;
