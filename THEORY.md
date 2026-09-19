Output 1: ([ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\nonbo\\...\\scripts\\test-argv.ts',
  '--port', '8080', '--host', 'localhost' ])

Output 2: ([ '--port', '8080', '--host', 'localhost' ])

Why they are different: Index 0 is node which is the program that runs my code, index 1 is my script file, and index 2 onwards is what I typed (--port 8080 --host localhost). The second line uses slice(2) so it removes the first two items (node and my file) and shows only the arguments that I typed.