const compile = require("near-sdk-as/compiler").compile

compile("assembly/main.ts", // input file
        "out/main.wasm",    // output file
        [
        //   "-O1",          // Optional arguments
        // "--debug",        // Add debug names to binary
        "--measure",         // Shows compiler runtime
        ], {
          verbose: true,     // Output the cli args passed to asc
          // wat: true // Output wat file
        });
