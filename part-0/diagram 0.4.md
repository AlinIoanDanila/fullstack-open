Diagram for part 0.4 of the Fullstack Open project showing the diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

The difference between this diagram and the one used [here](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review) is the addition of the POST request send to the 'new_note' address with the payload of the new note at the start of the diagram. After the POST request, the server asks for a new request of the 'notes' address in order to get the updated list. This also triggers GET requests in order to get the HTML,CSS,JS and data.json, each with its own request.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: URL Redirect to 'notes'
    deactivate server

    Note right of browser: The browser sends a POST request to the server address 'new_note' with the note payload (ex: {note: ${newNote}}), the server asks <br/> for new requests to get the updated data (default behavior of form submition in HTML). This means getting the entire page again, with updated JSON data.

    %% Please note the next part is copied from the initial diagram.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server, including the newly added note, newNote.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "${newNote}", "date": "2025-8-3" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
