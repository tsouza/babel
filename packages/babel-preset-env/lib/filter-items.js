"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUnnecessaryItems = removeUnnecessaryItems;

function removeUnnecessaryItems(items, overlapping) {
  items.forEach(item => {
    overlapping[item]?.forEach(name => items.delete(name));
  });
}