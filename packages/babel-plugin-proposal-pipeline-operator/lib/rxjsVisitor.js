"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@babel/core");

var _buildOptimizedSequenceExpression = _interopRequireDefault(require("./buildOptimizedSequenceExpression"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const minimalVisitor = {
  BinaryExpression(path) {
    const {
      scope,
      node
    } = path;
    const {
      operator,
      left,
      right
    } = node;
    if (operator !== "|>") return;
    const placeholder = scope.generateUidIdentifierBasedOnNode(left);

    const pipeMember = _core.types.memberExpression(_core.types.cloneNode(placeholder), _core.types.identifier("pipe"));

    const call = _core.types.callExpression(pipeMember, [right]);

    path.replaceWith((0, _buildOptimizedSequenceExpression.default)({
      assign: _core.types.assignmentExpression("=", _core.types.cloneNode(placeholder), left),
      call,
      path
    }));
  }

};
var _default = minimalVisitor;
exports.default = _default;