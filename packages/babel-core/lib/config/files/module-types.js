"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadCjsOrMjsDefault;

var _async = require("../../gensync-utils/async");

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _url() {
  const data = require("url");

  _url = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let import_;

try {
  import_ = require("./import").default;
} catch {}

function* loadCjsOrMjsDefault(filepath, asyncError) {
  switch (guessJSModuleType(filepath)) {
    case "cjs":
      return loadCjsDefault(filepath);

    case "unknown":
      try {
        return loadCjsDefault(filepath);
      } catch (e) {
        if (e.code !== "ERR_REQUIRE_ESM") throw e;
      }

    case "mjs":
      if (yield* (0, _async.isAsync)()) {
        return yield* (0, _async.waitFor)(loadMjsDefault(filepath));
      }

      throw new Error(asyncError);
  }
}

function guessJSModuleType(filename) {
  switch (_path().default.extname(filename)) {
    case ".cjs":
      return "cjs";

    case ".mjs":
      return "mjs";

    default:
      return "unknown";
  }
}

function loadCjsDefault(filepath) {
  const module = require(filepath);

  return module?.__esModule ? module.default || undefined : module;
}

async function loadMjsDefault(filepath) {
  if (!import_) {
    throw new Error("Internal error: Native ECMAScript modules aren't supported" + " by this platform.\n");
  }

  const module = await import_((0, _url().pathToFileURL)(filepath));
  return module.default;
}