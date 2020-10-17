const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello API');
})

app.listen(8090, () => {
    console.log('server is working http://localhost:8090')
})