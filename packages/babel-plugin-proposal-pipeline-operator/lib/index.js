"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _pluginSyntaxPipelineOperator = _interopRequireDefault(require("@babel/plugin-syntax-pipeline-operator"));

var _rxjsVisitor = _interopRequireDefault(require("./rxjsVisitor"));

var _smartVisitor = _interopRequireDefault(require("./smartVisitor"));

var _fsharpVisitor = _interopRequireDefault(require("./fsharpVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const visitorsPerProposal = {
  minimal: _rxjsVisitor.default,
  smart: _smartVisitor.default,
  fsharp: _fsharpVisitor.default
};

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  return {
    name: "proposal-pipeline-operator",
    inherits: _pluginSyntaxPipelineOperator.default,
    visitor: visitorsPerProposal[options.proposal]
  };
});

exports.default = _default;