# Ahead of time builds

You know what, in the year of 2023, trying out new things is gonna have an awesome excuese, I can finally outsmart GPT once. ¯\_(ツ)_/¯

According to the Deno Fresh doc, the following command will will create `a _fresh folder in the project directory. That folder contains the optimized assets and a snapshot.json file which includes some metadata for Fresh.
```
# As a task in newer Fresh projects
deno task build
# or invoke it manually
deno run -A dev.ts build
```

Ideally, with AOT the page load speed is faster than JIT. 

What interesting is, Angular has AOT as well, wanted to do deepdive to see the fundamentals.