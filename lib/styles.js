export default function(val, props) {
  const {
    zIndex,
    left,
    right,
    height,
    handleWidth,
    overlayColor,
    fadeOut,
    offset,
    open,
  } = props;

  let clientWidth = 1000;
  let width = props.width;

  if (typeof document !== "undefined") {
    clientWidth = document.body.clientWidth;
    if (/\D/.test(width))
      width = document.body.clientWidth * (width.match(/\d*/) / 100);
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  const opacity = (val - offset) / width;

  if (right) val = width - val;
  else val = val - width;

  const drawer = {
    display: "block",
    width: width,
    height: height,
    overflow: "auto"
  };

  const container = {
    position: "fixed",
    zIndex: zIndex,
    width: opacity > 0 ? '100%' : '0px',
    height: "100%",
  };

  const transform = {
    boxSizing: "content-box",
    pointer: "cursor",
    position: "fixed",
    display: "block",
    zIndex: zIndex,
    width: width,
    [right ? "paddingLeft" : "paddingRight"]: handleWidth,
    maxWidth: width,
    height: height,
    top: 0,
    [right ? "right" : "left"]: 0,
    margin: 0,
    transform: `translate3d(${val}px, 0, 0)`,
    WebkitTransform: `translate3d(${val}px, 0, 0)`,
    opacity: fadeOut ? opacity : 1
  };

  const overlayTransform = right ? -width : width;
  const overlay = {
    zIndex: -2,
    pointer: "cursor",
    position: "fixed",
    width: clientWidth,
    height: "100%",
    background: overlayColor,
    opacity: opacity,
    top: 0,
    [right ? "right" : "left"]: 0,
    margin: 0,
    transform: `translate3d(${overlayTransform}px, 0, 0)`,
    WebkitTransform: `translate3d(${overlayTransform}px, 0, 0)`
  };

  return { drawer, transform, overlay, container };
}
