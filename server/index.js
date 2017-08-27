const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const PORT = process.argv[2] || 3000;

const app = express();
app.use(compression({
    filter: (req) => !(req.query.compress === 'false'),
}));

app.use(express.static(path.join(__dirname, '../build')));

// Healthcheck
app.get('/health', (req, res) => {
    fs.readFile('package.json', 'utf8', (err, PackageInfo) => {
        if (err) {
            return res.json({
                status: 'Error, can\'t read package.json',
            });
        }
        const packageJSON = JSON.parse(PackageInfo);

        res.json({
            version: packageJSON.version,
            status: 'OK',
        });

        return null;
    });
});


app.listen(PORT, () => console.info(`Listening on ${PORT} port`));
