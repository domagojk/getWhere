# getwhere
Simple function for returning object value based on passed options

## usage
This will extend Object so it can be accessed with "Object.getWhere()"

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
Object.getWhere("go_char_right", {data:data, toReturn: "keys"})
// return ["Right"]

Object.getWhere("go_char_right", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Right"]

Object.getWhere("go_char_right", {data:data, toReturn: "keys", options: {os: "pc"} })
// return false

Object.getWhere("go_char_right", {data:data, toReturn: "keys", flags: {explicit: true} })
// return false

Object.getWhere("go_char_right", {
  data:data, 
    toReturn: "keys", 
    options: {os: "mac"}, 
    flags: {explicit: true} 
})
// return ["Right"]

Object.getWhere("go_char_left", {data:data, toReturn: "keys" })
// return ["Left"]

Object.getWhere("go_char_left", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Left", "Ctrl-B"]

Object.getWhere("go_doc_end", {data:data, toReturn: "keys", options: {os: "mac"} })
// return ["Cmd-Down", "Cmd-End", "Ctrl-Down"]

Object.getWhere("go_doc_end", {
  data:data, 
    toReturn: "keys", 
    options: {os: "mac", extension: "html"} 
})
// return ["Ctrl-H"]
```