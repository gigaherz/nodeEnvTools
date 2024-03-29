/**
 * Created with JetBrains WebStorm.
 * User: gigaherz
 * Date: 22/06/12
 * Time: 18:02
 *
 *  Copyright (c) 2012 David Quintana <gigaherz@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

var envReplace = (function () {
  var pattern = /%([a-z0-9_()]*)%/gi;

  function findInsensitive(obj, key, cache) {
    key=key.toLowerCase();
    
    if(cache.hasOwnProperty(key))
      return cache[key] || undefined;
    
    for (var k in obj) {
      if (k.toLowerCase() === key) {
        var value = obj[k];
        cache[key] = value;
        return value;
      }
    }
    
    cache[key]=false;
    return undefined;
  }
    
  function envReplace(input) {
    var output = '', last=0, env=process.env;
    var cache = {};

    pattern.lastIndex = 0;

    var res = pattern.exec(input);
    while (res !== null) {
      var idx = res.index;

      if(idx > last) {
        output += input.substring(last,idx);
      }

      var match = res[1];
      output += match ? findInsensitive(env, match, cache) : '%';

      last = idx + res[0].length;
      res = pattern.exec(input);
    }

    if(last < input.length) {
      output += input.substring(last);
    }

    return output;
  }

  return envReplace;
})();

if (module)
  module.exports = envReplace;
