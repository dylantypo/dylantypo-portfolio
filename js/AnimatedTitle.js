const { Component, Children, PropTypes } = React;

class SplitText extends Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("span", { "aria-label": this.props.copy, role: this.props.role },
      this.props.copy.split("").map(function (char, index) {
        let style = { "animation-delay": 0 + index / 10 + "s" };
        return /*#__PURE__*/React.createElement("span", {
          "aria-hidden": "true",
          key: index,
          style: style },
        char);

      })));


  }}


class Layout extends Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("h1", null, /*#__PURE__*/React.createElement(SplitText, { copy: "wikiDylan", role: "heading" })));

  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Layout, null), document.getElementById('animatedTitle'));