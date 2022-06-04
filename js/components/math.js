/* My Math */

math = {};

math.random = function(min, max) {
  return Math.round(Math.random() * (max + min)) + max;
};