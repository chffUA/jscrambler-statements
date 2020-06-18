const Benchmark = require("benchmark");

/**
 * Intent: Replace the contents of an object.
 * 
 * Utility: Replace a node in the AST with another node that was just created.
 */

/* ---- Setup -------------------------------------------------------------- */

let input5 = {
    key1: 1000, key2: undefined, key3: { type: "Statement" }, key4: "string", key5: "text"
};
let input10 = {
    ...input5,
    key6: 1000, key7: undefined, key8: { type: "Statement" }, key9: "string", key10: "text"
};
let input50 = {
    ...input10,
    key11: 1000, key12: undefined, key13: { type: "Statement" }, key14: "string", key15: "text",
    key16: 1000, key17: undefined, key18: { type: "Statement" }, key19: "string", key20: "text",
    key21: 1000, key22: undefined, key23: { type: "Statement" }, key24: "string", key25: "text",
    key26: 1000, key27: undefined, key28: { type: "Statement" }, key29: "string", key30: "text",
    key31: 1000, key32: undefined, key33: { type: "Statement" }, key34: "string", key35: "text",
    key36: 1000, key37: undefined, key38: { type: "Statement" }, key39: "string", key40: "text",
    key41: 1000, key42: undefined, key43: { type: "Statement" }, key44: "string", key45: "text",
    key46: 1000, key47: undefined, key48: { type: "Statement" }, key44: "string", key50: "text"
};
let input100 = {
    ...input50,
    key51: 1000, key52: undefined, key53: { type: "Statement" }, key54: "string", key55: "text",
    key56: 1000, key57: undefined, key58: { type: "Statement" }, key59: "string", key60: "text",
    key61: 1000, key62: undefined, key63: { type: "Statement" }, key64: "string", key65: "text",
    key66: 1000, key67: undefined, key68: { type: "Statement" }, key69: "string", key70: "text",
    key71: 1000, key72: undefined, key73: { type: "Statement" }, key74: "string", key75: "text",
    key76: 1000, key77: undefined, key78: { type: "Statement" }, key79: "string", key80: "text",
    key81: 1000, key82: undefined, key83: { type: "Statement" }, key84: "string", key85: "text",
    key86: 1000, key87: undefined, key88: { type: "Statement" }, key89: "string", key90: "text",
    key91: 1000, key92: undefined, key93: { type: "Statement" }, key94: "string", key85: "text",
    key96: 1000, key97: undefined, key98: { type: "Statement" }, key99: "string", key100: "text"
};

let input5x = {
    key1x: 1000, key2x: undefined, key3x: { type: "Statement" }, key4x: "string", key5x: "text"
};
let input10x = {
    ...input5x,
    key6x: 1000, key7x: undefined, key8x: { type: "Statement" }, key9x: "string", key10x: "text"
};
let input50x = {
    ...input10x,
    key11x: 1000, key12x: undefined, key13x: { type: "Statement" }, key14x: "string", key15x: "text",
    key16x: 1000, key17x: undefined, key18x: { type: "Statement" }, key19x: "string", key20x: "text",
    key21x: 1000, key22x: undefined, key23x: { type: "Statement" }, key24x: "string", key25x: "text",
    key26x: 1000, key27x: undefined, key28x: { type: "Statement" }, key29x: "string", key30x: "text",
    key31x: 1000, key32x: undefined, key33x: { type: "Statement" }, key34x: "string", key35x: "text",
    key36x: 1000, key37x: undefined, key38x: { type: "Statement" }, key39x: "string", key40x: "text",
    key41x: 1000, key42x: undefined, key43x: { type: "Statement" }, key44x: "string", key45x: "text",
    key46x: 1000, key47x: undefined, key48x: { type: "Statement" }, key44x: "string", key50x: "text"
};
let input100x = {
    ...input50x,
    key51x: 1000, key52x: undefined, key53x: { type: "Statement" }, key54x: "string", key55x: "text",
    key56x: 1000, key57x: undefined, key58x: { type: "Statement" }, key59x: "string", key60x: "text",
    key61x: 1000, key62x: undefined, key63x: { type: "Statement" }, key64x: "string", key65x: "text",
    key66x: 1000, key67x: undefined, key68x: { type: "Statement" }, key69x: "string", key70x: "text",
    key71x: 1000, key72x: undefined, key73x: { type: "Statement" }, key74x: "string", key75x: "text",
    key76x: 1000, key77x: undefined, key78x: { type: "Statement" }, key79x: "string", key80x: "text",
    key81x: 1000, key82x: undefined, key83x: { type: "Statement" }, key84x: "string", key85x: "text",
    key86x: 1000, key87x: undefined, key88x: { type: "Statement" }, key89x: "string", key90x: "text",
    key91x: 1000, key92x: undefined, key93x: { type: "Statement" }, key94x: "string", key85x: "text",
    key96x: 1000, key97x: undefined, key98x: { type: "Statement" }, key99x: "string", key100x: "text"
};

function replaceByRebuilding(oldNode, newNode) {
    for (let key in oldNode) {
        // assume `parent` and `key1` contain important metadata that should be preserved
        if (key !== "parent" && key !== "key1") delete oldNode[key];   
    }

    for (let key in newNode) {
        if (key !== "parent" && key !== "key1") oldNode[key] = newNode[key];
    }
}

function replaceByReference(oldNode, newNode) {
    // fallback which will not be necessary in these tests
    if (!oldNode.parent) {
        replaceByRebuilding(oldNode, newNode);
        return;
    }

    // assume `parent` and `key1` contain important metadata that should be preserved
    newNode.parent = oldNode.parent;
    if (oldNode.key1) newNode.key1 = oldNode.key1;
    
    // replace node in the AST
    oldNode.parent.child = newNode;
}

/* ---- Tests -------------------------------------------------------------- */

let _oldNode, _newNode, _oldNodeParent = {};

// the section of code to be run before each individual test
const setup = (oldNode, newNode) => {
    return () => {
        _oldNode = { ...oldNode }, _newNode = { ...newNode };
        _oldNode.parent = _oldNodeParent, _oldNodeParent.child = _oldNode;
    };
};
const testOriginal = (oldNode, newNode) => { 
    return () => {
        _oldNode = { ...oldNode }, _newNode = { ...newNode };
        _oldNode.parent = _oldNodeParent, _oldNodeParent.child = _oldNode;

        replaceByRebuilding(_oldNode, _newNode);
    };
};
// upon running `replaceByReference`, the caller must manually update 
// the `oldNode` variable so that it points to the correct node
const testNew = (oldNode, newNode) => { 
    return () => { 
        _oldNode = { ...oldNode }, _newNode = { ...newNode };
        _oldNode.parent = _oldNodeParent, _oldNodeParent.child = _oldNode;

        replaceByReference(_oldNode, _newNode); 
        _oldNode = _oldNode.parent.child; 
    };
};

/* ---- Benchmarker -------------------------------------------------------- */

// add commas to number
const print = (number) => {
    let string = Math.abs(number).toFixed(0), max = string.length - 1, printable = "";
    for (let i=0; i<=max; i++)
        printable = ((i < max) && (i+1)%3 === 0 ? "," : "") + string[max-i] + printable;
    return number < 0 ? "-"+printable : printable;
};

// confidence interval of subtraction (95%)
const rme = (test, setup) => (test.moe + setup.moe) / (test.time + setup.time) * 100;

/**
 * Benchmarker suites do not support running a setup function before each
 * individual test (only before each test loop). The execution time of the
 * setup procedure can be subtracted in order to estimate the real execution
 * time of the test.
 */ 
function runSuite(desc, test, oldNode, newNode) {
    const suite = new Benchmark.Suite, data = {};

    suite.add("setup", setup(oldNode, newNode))
         .add("test", test(oldNode, newNode))
         
         .on("cycle", (e) => data[e.target.name] = {
             time: 1/e.target.hz, // full execution time of the test: 1/(runs/sec)
             moe: e.target.stats.moe,
             samples: e.target.stats.sample.length
         }).run();

    console.log(`${desc} x ${print(1/(data.test.time-data.setup.time))} ops/sec ` +
                `±${rme(data.test, data.setup).toFixed(2)}% ` +
                `(${Math.min(data.test.samples, data.setup.samples)} runs sampled)`);
}

runSuite("  Original - 5 keys", testOriginal, input5, input5x);
runSuite("       New - 5 keys", testNew, input5, input5x);

runSuite(" Original - 10 keys", testOriginal, input10, input10x);
runSuite("      New - 10 keys", testNew, input10, input10x);

runSuite(" Original - 50 keys", testOriginal, input50, input50x);
runSuite("      New - 50 keys", testNew, input50, input50x);

runSuite("Original - 100 keys", testOriginal, input100, input100x);
runSuite("     New - 100 keys", testNew, input100, input100x);