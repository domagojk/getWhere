var getWhere = function(name, toReturn, data, params) {

  if(!params)
    params = {};
  
  var options = params.options;
  var flags = params.flags;

  if(typeof name != 'string') {
    throw new Error("Invalid preference name");
  }

  if(typeof toReturn != 'string') {
    throw new Error("Invalid return parameter");
  }

  if(typeof data != 'object') {
    throw new Error("Invalid data parameter");
  }

  data = data[name];
  
  // if preference value is string return it
  if(typeof data != 'object')
    return data;

  // if preference value is object and there is no options, return property
  if(!options) {
    if(flags && flags.explicit) {
      var dataKeys = Object.keys(data);
      if(dataKeys.length == 1 && dataKeys.indexOf(toReturn) != -1)
        return data[toReturn];
      else
        return false;
    }
    return data[toReturn];
  }

  // function for checking options and retriving appropriate keys
  var getValue = function(data) {
    // get data and options keys
    var dataKeys = Object.keys(data);
    var optKeys = Object.keys(options);

    if(flags && flags.explicit) {
      //if explicit is set, return only if options keys match data keys
      var hasOptionskeys = dataKeys.filter(function(n) {
        // special key not in options object
        if(n == toReturn)
          return true;
        // ignore if object
        if(typeof data[n] == 'object')
          return true;
        // if data key exists in options
        return optKeys.indexOf(n) != -1
      });

      if(hasOptionskeys.length != dataKeys.length)
        return false;
    }

    // intersection between optKeys and dataKeys
    var hasDataKeys = optKeys.filter(function(n) {
        return dataKeys.indexOf(n) != -1
    });

    var returnKeys = true;

    if(dataKeys.indexOf(toReturn) == -1) {
      returnKeys = false;
    }

    // loop trough key filters
    for(var i in hasDataKeys) {
      var key = hasDataKeys[i];

      if(typeof data[key] == 'string') {
        // if key filter is string only check if it is the same as in options
        if(data[key] != options[key]) {
          returnKeys = false;
          break;
        }
      } else if(Array.isArray(data[key])) {
        // if key filter is array check if it contains the same as in options
        if(data[key].indexOf(options[key]) == -1) {
          returnKeys = false;
          break;
        }
      } else if (typeof data[key] == 'object' && data[key][options[key]]) {
        // if key filter is object, recursive call to getValue with new data
        return getValue(data[key][options[key]]);
      }
    }

    if(returnKeys) {
      return data[toReturn];
    }

    return false;
  }
  
  return getValue(data);
};

if (typeof exports == "object" && typeof module == "object")
  module.exports = getWhere;
else
  window.getWhere = getWhere;