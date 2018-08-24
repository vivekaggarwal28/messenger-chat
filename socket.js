const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const request = require('request');
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let interval;

io.on("connection", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("FetchMessages", (data) => {
        if (interval) {
            clearInterval(interval);
        }
        //interval = setInterval(() => getApiAndEmit(socket, data), 10000);
        getApiAndEmit(socket, data);
        console.log("Fetching Messages...");
    })
});
const getApiAndEmit = (socket, data) => {
    try {
        var postData = {
            "count": 40,
            "businessIds": [100000348, 100000079, 100000080, 100000819, 100000345, 239624, 100001510, 100001511, 239625, 100000054],
            "lastMsgTime": null,
            "bizId": 100000348,
            "listTag": null,
            "conversationId": ""
        };
        var options = {
            method: 'post',
            body: postData, // Javascript object
            url: "https://demo6.birdeye.com/api/resources/v1/messenger/conversations?t=1535025963639",
            headers: {
                "Accept": "application/json",
                "X-Bazaarify-Session-Token": data.sessionToken
            }
        }

        request("https://demo6.birdeye.com/api/resources/v1/messenger/conversations?t=1535025963639", options, function (err, res, body) {
            if (err) {
                console.log('Error :', err)
                return
            }
            console.log(' Response :', res)
            console.log(' Body :', body)

        });


        /* request('https://demo6.birdeye.com/api/resources/v1/messenger/locations?t=1535024193530', {
            headers: {
                accept: 'application/json',
                "X-Bazaarify-Session-Token": "cfb0e442-8139-44a2-8d3c-8d7e88042554"
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
            } else if (response) {
                console.log(response)
            }
        }) */

    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
server.listen(port, () => console.log(`Listening on port ${port}`));