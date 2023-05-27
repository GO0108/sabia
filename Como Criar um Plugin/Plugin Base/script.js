async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  tab = getCurrentTab()

let query = /^[^#?]*(\?[^#]+|)/.exec(tab.url)[1];

function getParameterByName(queryString, name) {
    // Escape special RegExp characters
    name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
    // Create Regular expression
    var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
    // Attempt to get a match
    var results = regex.exec(queryString);
    return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
}

// Usage:
// Example: tab.url = "http://example.com/path?foo=bar&key_name=qs_value#"
var queryString = /\?[^#]+(?=#|$)|$/.exec(tab.url)[0];
var value = getParameterByName(queryString, 'qs_name');
console.log(value);
// Result : value = "value";

// Example 2: Using the function to get a parameter from the current page's URL.
//  (e.g inside content script)
var value = getParameterByName(location.search, 'qs_name');
console.log(value);
// Result : value = "value"