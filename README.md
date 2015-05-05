# getWhere
Simple function for returning object value based on passed options

## usage
This script can be imported as module (browserify, systemJS) or if just included in script tag, it can be accessed globaly (window.getWhere)

## examples

Object for extracting data

```javascript
var data = {
  go_char_right: {
      'keys': ['Right'],
      'os': 'mac'
    },
    
   go_char_left: {
      'keys': ['Left'],
      'os': {
        'mac': {
          'keys': ['Left', 'Ctrl-B']
        }
      }
    },

    go_doc_end: {
      'keys': ['Ctrl-End'],
      'os': {
        'mac': {
          'keys': ['Cmd-Down', 'Cmd-End', 'Ctrl-Down'],
          'extension': {
            'html': {
              'keys': ['Ctrl-H'] 
            },
            'js': {
              'keys': ['Ctrl-J'] 
            }
          }
        }
      }
    }
}
```
Examples of retrieving data

```javascript
getWhere("go_char_right", {data:data, toReturn: "keys"})
// return ["Right"]

getWhere("go_char_right", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Right"]

getWhere("go_char_right", {data:data, toReturn: "keys", options: {os: "pc"} })
// return false

getWhere("go_char_right", {data:data, toReturn: "keys", flags: {explicit: true} })
// return false

getWhere("go_char_right", {
  data:data, 
    toReturn: "keys", 
    options: {os: "mac"}, 
    flags: {explicit: true} 
})
// return ["Right"]

getWhere("go_char_left", {data:data, toReturn: "keys" })
// return ["Left"]

getWhere("go_char_left", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Left", "Ctrl-B"]

getWhere("go_doc_end", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Cmd-Down", "Cmd-End", "Ctrl-Down"]

getWhere("go_doc_end", {
  data:data, 
    toReturn: "keys", 
    options: {os: "mac", extension: "html"} 
})
// return ["Ctrl-H"]
```