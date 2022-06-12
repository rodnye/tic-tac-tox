/* My Math */

math = {};

math.random = function(min, max) {
  return Math.round(Math.random() * max) + min;
};

math.randomItem = function (array) {
  return array[math.random(0, array.length - 1)];
};