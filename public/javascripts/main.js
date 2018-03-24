let mockDataGET = {
    meta: {
        verb: "GET",
        url: "https://guesty-user-service.herokuapp.com/user/us8A-82jf-FFa7-291v"
    },
    payload: [
        {
            "id": 14,
            "name": "Jon Snow",
            "email": "jon@wall.com",
            "age": 21
        },
        {
            "id": 29,
            "name": "Dainerys",
            "email": "jon@wall.com",
            "age": 22
        },
        {
            "id": 103,
            "name": "Stark",
            "email": "jon@wall.com",
            "age": 197
        }]
};


let mockDataPOST = {
    meta: {
        verb: "POST",
        url: "https://guesty-user-service.herokuapp.com/user/"
    },
    payload: [
        {
            "name": "Jon Snow",
            "email": "jon@wall.com",
            "age": 21
        },
        {
            "name": "Dainerys",
            "email": "jon@wall.com",
            "age": 22
        },
        {
            "name": "Stark",
            "email": "jon@wall.com",
            "age": 197
        }]
};


let mockDataPATCH = {
    meta: {
        verb: "PATCH",
        url: "https://guesty-user-service.herokuapp.com/user/"
    },
    payload: [
        {
            "id": "ja2S-hs81-ksn3-iQI9",
            "age": 21
        },

        {
            "id": "ja2S-hs81-ksn3-iQI9",
            "age": 22
        },
        {
            "id": "ja2S-hs81-ksn3-iQI9",
            "age": 197
        }]
};


function doRequest() {
    // NOT TO CONNECT ANY ADITIONAL MODULES
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "/batch", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(mockDataPATCH));

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    }
}

document.querySelector('.requestMaker').addEventListener('click', doRequest);