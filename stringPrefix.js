const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;

/**
 * Intent: Check if a string begins with a certain pattern.
 * 
 * Utility: Check the type of an AST node, the value of an identifier
 *          or literal, the name of a transformation, etc.
 */

/* ---- Setup -------------------------------------------------------------- */

const inputA = "prefix______________";
const inputB = "______________prefix";

function regex(string) {
    return /^prefix/.test(string);
}

function startsWith(string) {
    return string.startsWith("prefix");
}

/* ---- Tests -------------------------------------------------------------- */

const testOriginal = (string) => { return () => regex(string) };
const testNew = (string) => { return () => startsWith(string) };

/* ---- Benchmarker -------------------------------------------------------- */

suite.add("Original - A", testOriginal(inputA))
     .add("     New - A", testNew(inputA))

     .add("Original - B", testOriginal(inputB))
     .add("     New - B", testNew(inputB))

     .on("cycle", (e) => console.log(String(e.target)))
     .run();