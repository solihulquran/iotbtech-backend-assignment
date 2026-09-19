Output 1: ([ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\nonbo\\...\\scripts\\test-argv.ts',
  '--port', '8080', '--host', 'localhost' ])

Output 2: ([ '--port', '8080', '--host', 'localhost' ])

Why they are different: Index 0 is node which is the program that runs my code, index 1 is my script file, and index 2 onwards is what I typed (--port 8080 --host localhost). The second line uses slice(2) so it removes the first two items (node and my file) and shows only the arguments that I typed.


# Question 6
I ran the code to check. The hex output is `4e6f64652e6a73` and the base64 output is `Tm9kZS5qcw==`. Hex writes every byte of "Node.js" as two digits. Base64 writes the same bytes using letters and numbers, so they are easier to send as text. (Add one line here: was your guess right or wrong?)

# Question 10
`req.params.id` is a string. To get a number, I write `Number(req.params.id)`. Express does not convert it for me because the parts of a URL are always text, and Express cannot know if I want a number or a word.

# Question 12
The missing line is `app.use(express.json())`. It must come before the routes. Without it, nothing reads the body of the request, so `req.body` stays `undefined` and the handler has nothing to show.

# Question 4
(a) 201 Created, because a new product was made.
(b) 404 Not Found, because that id does not exist.
(c) 400 Bad Request, because the user sent incomplete data.
(d) 500 Internal Server Error, because the server crashed.
(e) 200 OK, because the request worked and the list is returned