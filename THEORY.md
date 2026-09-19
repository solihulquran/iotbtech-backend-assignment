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

### Q2
I use `process.argv.slice(2)` because the first two items are always node and my script file, and they change depending on how or where I run the program. Slice(2) gives me only the arguments I typed, so my tool works the same everywhere.

### Q4
`readFileSync` loads the whole 5 GB file into RAM at once, as one big string. Splitting it into lines makes another big copy. My machine only has 8 GB, so it runs out of memory and crashes. `createReadStream` reads the same file in small chunks and throws each chunk away after using it, so memory stays small.

### Q5
`pipe()` does not clean up when something fails. If the destination breaks halfway, the source stream stays open and leaks. `pipeline()` closes all the streams when there is an error, and it tells me about the error. Example: copying a big file to a disk that becomes full. `pipe()` leaves the source open, but `pipeline()` closes both.

### Q7
"Flat" means memory stays about the same whatever the file size. With the bucket approach (readFileSync), memory grows with the file, so 10,000,000 rows needs about 1,000 times more memory than 10,000 rows. With a stream, it only holds one chunk at a time, so memory stays flat.

### Q9
- `GET /api/products/featured` returns `{ hit: "by-id", id: "featured" }`, because `/:id` is registered first and Express uses the first match. So `/featured` is never reached.
- `GET /api/products/42` returns `{ hit: "by-id", id: "42" }`.
- `GET /api/products` returns `{ hit: "fallback" }`, because `/:id` needs an id and only the `app.use` matches.

### Q11
Routes connect URLs to controllers. The controller reads the request and sends the response. The service holds the data and the rules. To load products from a CSV, I edit only `product.service.ts`, because that is the only file that knows where the data comes from.

### Q13
The two URLs are `GET /api/products` and `GET /api/products/:id`. `router.get("/top")` would answer `GET /api/products/top`. It must be placed before `/:id`, or `/:id` catches it first.

### Q3
The outputs are 10, 5 and 5. "مرحبا" has 5 characters, but each Arabic character takes 2 bytes in UTF-8, so the Buffer length is 10 bytes. "hello" has 5 characters and each takes 1 byte, so it is 5 bytes. The string `.length` counts characters (UTF-16 units), so it gives 5. Buffer length counts bytes, and string length counts characters.

### Q8
1. Bun runs TypeScript files directly, with no build step. 2. `bun install` is much faster than npm. 3. Bun has a built-in test runner and bundler. For a real team project today I would still pick Node, because it is more mature and most companies use it. For my own small projects I would try Bun for the speed.

## Class 33

### Q15
M1 in
M2 GET /
handler starts
handler ends
M1 out
"M1 out" prints last because `next()` runs everything after it first. When the handler finishes, control comes back to M1 and the line after `next()` runs.

### Q16
The client waits forever and sees a spinner. My terminal shows the earlier logs and then nothing. Express cannot guess that a middleware is done, because a middleware is allowed to end the request itself. So it waits until I call `next()` or send a response.

### Q17
Express counts the parameters. Four parameters means an error handler, and fewer means normal middleware. If I clean B to `(err, req, res)`, it becomes normal middleware and stops catching errors.

### Q18
`next()` moves to the next normal middleware. `next(err)` skips all the remaining normal middleware and jumps to the error handler. In `[logger, json, routes, errorHandler]`, (a) `next()` from the routes goes on to the next normal middleware, and (b) `next(err)` goes straight to the error handler.

### Q19
`res.on("finish", ...)` only saves a listener. It does not run yet. `next()` is called, the handler runs and `res.send()` sends the response. Only then does the "finish" event fire, and the log line is written. So the time it logs covers the whole request.

### Q20
In Express 4, an error inside an async handler is not caught, so the request hangs or the process gets an unhandled rejection. In Express 5, the error goes to the error handler automatically. Two fixes for Express 4: wrap the code in `try/catch` and call `next(err)`, or use an `asyncHandler` wrapper. I check my version with `npm ls express`.

### Q21
404 means no route matched, and nothing crashed. 500 means a handler crashed. The 404 handler comes before the error handler, and both come last, after all routes. If I swap them, the order is wrong and the code stops following the standard pipeline, which makes errors harder to handle.