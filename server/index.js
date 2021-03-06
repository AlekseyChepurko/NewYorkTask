import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from 'body-parser';
import compression from "compression";
import * as db from "./utils/DBUtils";

const PORT = process.argv[2] || 3000;

db.setupConnection();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({
    filter: (req) => !(req.query.compress === "false"),
}));

app.use(express.static(path.join(__dirname, "../build")));


// Healthchec
app.get("/health", (req, res) => {
    fs.readFile("package.json", "utf8", (err, PackageInfo) => {
        if (err) {
            return res.json({
                status: "Error, can\"t read package.json",
            });
        }
        const packageJSON = JSON.parse(PackageInfo);

        res.json({
            version: packageJSON.version,
            status: "OK",
        });

        return null;
    });
});


app.post("/api/articles/add", async (req, res) => {
    await db.addArticle(req.body);
    res.end();
});

app.get("/api/articles/count", async (req, res) => {
    const count = await db.getArticlesCount(req.query);
    res.send(JSON.stringify(count));
    res.end();
});

app.get("/api/articles/list", async (req, res) => {
    res.send(await db.getArticleList(req.query, req.query.index));
});


app.get('/api/article/:id', async (req, res) => {
    res.send( await db.getArticleById(req.params.id));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => console.info(`Listening on ${PORT} port`));
