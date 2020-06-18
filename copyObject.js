const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;

/**
 * Intent: Copy all properties of an object.
 * 
 * Utility: Copy an AST node or transformation options.
 */

/* ---- Setup -------------------------------------------------------------- */

const input5 = {
    key1: 1000, key2: undefined, key3: { type: "Statement" }, key4: "string", key5: "text"
};
const input10 = {
    ...input5,
    key6: 1000, key7: undefined, key8: { type: "Statement" }, key9: "string", key10: "text"
};
const input50 = {
    ...input10,
    key11: 1000, key12: undefined, key13: { type: "Statement" }, key14: "string", key15: "text",
    key16: 1000, key17: undefined, key18: { type: "Statement" }, key19: "string", key20: "text",
    key21: 1000, key22: undefined, key23: { type: "Statement" }, key24: "string", key25: "text",
    key26: 1000, key27: undefined, key28: { type: "Statement" }, key29: "string", key30: "text",
    key31: 1000, key32: undefined, key33: { type: "Statement" }, key34: "string", key35: "text",
    key36: 1000, key37: undefined, key38: { type: "Statement" }, key39: "string", key40: "text",
    key41: 1000, key42: undefined, key43: { type: "Statement" }, key44: "string", key45: "text",
    key46: 1000, key47: undefined, key48: { type: "Statement" }, key44: "string", key50: "text",
};
const input100 = {
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

function assignCopy(object) {
    return Object.assign({}, object);
}

function spreadCopy(object) {
    return {...object};
}

/* ---- Tests -------------------------------------------------------------- */

const testOriginal = (object) => { return () => assignCopy(object) };
const testNew = (object) => { return () => spreadCopy(object) };

/* ---- Benchmarker -------------------------------------------------------- */

suite.add("  Original - 5 keys", testOriginal(input5))
     .add("       New - 5 keys", testNew(input5))

     .add(" Original - 10 keys", testOriginal(input10))
     .add("      New - 10 keys", testNew(input10))

     .add(" Original - 50 keys", testOriginal(input50))
     .add("      New - 50 keys", testNew(input50))

     .add("Original - 100 keys", testOriginal(input100))
     .add("     New - 100 keys", testNew(input100))

     .on("cycle", (e) => console.log(String(e.target)))
     .run();