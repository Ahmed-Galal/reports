const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const port = 3000;
const reportData = require('./data');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/reports/', (req, res) => {
    let items = reportData.elements.map((elm) => {
        return {
            id: elm.id.trim(),
            state: elm.state || '',
            type: elm.payload.reportType || '',
            message: (elm.payload.message ? elm.payload.message.substring(0, 10) + " ....." : '')
        }
    })
    res.send(JSON.stringify(items));
    res.end();
})
app.put('/reports/:reportId', jsonParser, (req, res) => {
    let reportId = req.params.reportId;
    console.log("Report is Closed: ", reportId, req.body)
    res.send("Report is Closed: " + reportId);
    res.end();
})
app.post('/reports/:reportId', urlencodedParser, (req, res) => {
    let reportId = req.params.reportId;
    console.log("Report is Blocked: ", reportId)
    res.send("Report is Blocked: " + reportId);
    res.end();
})

//assuming app is express Object.
app.get('/', function (req, res) {
    res.redirect("/static");
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})
