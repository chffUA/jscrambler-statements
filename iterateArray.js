const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;

/**
 * Intent: Iterate elements of an array.
 *
 * Utility: Iterate an array of transformations or nodes. For example, a node
 *          of the type `Program` contains a `body` that is an array of nodes.
 */

/* ---- Setup -------------------------------------------------------------- */

const node = { type: "Statement" };
const input5 = Array.from({ length: 5 }).map(empty => ({ ...node }));
const input10 = Array.from({ length: 10 }).map(empty => ({ ...node }));
const input50 = Array.from({ length: 50 }).map(empty => ({ ...node }));
const input100 = Array.from({ length: 100 }).map(empty => ({ ...node }));

function forOfStatement(array) {
    for (let element of array) { element; }
}

function forEachStatement(array) {
    array.forEach(element => { element; });
}

function forStatement(array) {
    for (let i=0; i<array.length; i++) { array[i]; }
}

/* ---- Tests -------------------------------------------------------------- */

const testOriginal = (array) => { return () => forOfStatement(array) };
const testNew = (array) => { return () => forEachStatement(array) };
const testAlternative = (array) => { return () => forStatement(array) };

/* ---- Benchmarker -------------------------------------------------------- */

suite.add("     Original - 5 values", testOriginal(input5))
     .add("          New - 5 values", testNew(input5))
     .add("  Alternative - 5 values", testAlternative(input5))
     
     .add("    Original - 10 values", testOriginal(input10))
     .add("         New - 10 values", testNew(input10))
     .add(" Alternative - 10 values", testAlternative(input10))
    
     .add("    Original - 50 values", testOriginal(input50))
     .add("         New - 50 values", testNew(input50))
     .add(" Alternative - 50 values", testAlternative(input50))
    
     .add("   Original - 100 values", testOriginal(input100))
     .add("        New - 100 values", testNew(input100))
     .add("Alternative - 100 values", testAlternative(input100))
     
     .on("cycle", (e) => console.log(String(e.target)))
     .run();