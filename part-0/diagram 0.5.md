Diagram for part 0.5 of the Fullstack Open project showing the diagram depicting the situation where the user opens the page https://studies.cs.helsinki.fi/exampleapp/spa.

The diagram is similar to the one used in the course, only the file naming being changed.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "new content", "date": "${newDate}" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
