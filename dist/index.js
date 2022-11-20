"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const port = 3000;
const app = (0, express_1.default)();
let logStream = fs_1.default.createWriteStream(path_1.default.join("./", "api-logger.log"), {
    flags: 'a'
});
app.use((0, morgan_1.default)(':method :url :status - :response-time ms', {
    stream: logStream
}));
app.use("/api", index_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
