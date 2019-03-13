import "./SwipeableListItem.css";
import React from "react";

class SwipeableListItem extends React.Component {
  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onSwiped= this.onSwiped.bind(this);
  }
  // Drag & Drop
  dragStartX = 0;
  left = 0;
  dragged = false;
  // DOM Refs
  listElement;
  wrapper;
  background;

//*****Methods*****
onDragStartMouse(evt) {
  this.onDragStart(evt.clientX);
  window.addEventListener("mousemove", this.onMouseMove);
}

onDragStartTouch(evt) {
  const touch = evt.targetTouches[0];
  this.onDragStart(touch.clientX);
  window.addEventListener("touchmove", this.onTouchMove);
}

onMouseMove(evt) {
  const left = evt.clientX - this.dragStartX;
  if (left < 0) {
    this.left = left;
  }
}

onTouchMove(evt) {
  const touch = evt.targetTouches[0];
  const left = touch.clientX - this.dragStartX;
  if (left < 0) {
    this.left = left;
  }
}

onDragEndMouse(evt) {
  window.removeEventListener("mousemove", this.onMouseMove);
  this.onDragEnd();
}

onDragEndTouch(evt) {
  window.removeEventListener("touchmove", this.onTouchMove);
  this.onDragEnd();
}

//Shared logic for touch and mouse
onDragStart(clientX) {
  this.dragged = true;
  this.dragStartX = clientX;
  requestAnimationFrame(this.updatePosition);
}

onDragEnd() {
  if (this.dragged) {
    this.dragged = false;

    const threshold = this.props.threshold || 0.3;

    if (this.left < this.listElement.offsetWidth * threshold * -1) {
      this.left = -this.listElement.offsetWidth * 2;
      this.onSwiped();
    } else {
      this.left = 0;
    }
  }
}

onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
}

//lifecycle Methods
componentDidMount() {
  window.addEventListener("mouseup", this.onDragEndMouse);
  window.addEventListener("touchend", this.onDragEndTouch);
}

componentDidUnmount() {
  window.removeEventListener("mouseup", this.onDragEndMouse);
  window.removeEventListener("touchend", this.onDragEndTouch);
}

  render() {
    return (
      <>
        <div className="Wrapper" ref={div => (this.wrapper = div)}>
          <div
            ref={div => (this.background = div)} className="Background">
            <span>Delete</span>
          </div>
          <div
            ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}
            className="ListItem"
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default SwipeableListItem;
