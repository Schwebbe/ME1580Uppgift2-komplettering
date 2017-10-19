var request = require("request");

var data = "";
module.exports = function () {

    var postData = function () {
        //Configure the request.
        //Criterias that our GET request sends
        var headers = {
            "Content-Type": "application/json"
        }
        //Settings for the request.
        var options = {
            url: "http://localhost:3000/nasadb",
            method: "POST",
            headers: headers,
            form: data[0]
        };

        /* Start the request. */
        request(options, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                console.log("posted successfully.");
            }
        }).on("Error", function(err) {
            console.log(err);
        });
    };




    //Configure the request.
    //Criterias that our GET request accepts
    var headers = {
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    }
    //Settings for the request.
    var options = {
        url: "https://data.nasa.gov/resource/y77d-th95.json",
        method: "GET",
        headers: headers
    };

    /* Start the request. */
    request(options, function (err, res, body) {
        data = JSON.parse(body);
        console.log(data[0]);

        
        //Configure the promise.
        var checkObject = new Promise(function(resolve, reject) {
            if (!data.isEmptyObject) {
                resolve("not empty");
            } else {
                reject("empty.");
            }
        });
        
        //Handle the promise
        checkObject.then(function (fromResolve) {
            console.log("The object is" + fromResolve);
            postData();
        }).catch(function (fromReject) {
            console.log("The object is" + fromReject);
        });

    }).on("error", function (err) {
        console.log(err); // If error, let us know.
    });
};
