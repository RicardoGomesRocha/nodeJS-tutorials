const {
    create
} = require("domain");

const requestHandler = (request, response) => {
    if (request.url === '/') homeRequestHandler(request, response);
    else if (request.url === '/users') usersRequestHandler(request, response);
    else if (request.url === '/create-user') createUserRequestHandler(request, response);
    else pageNotFound(request, response);
}

const homeRequestHandler = (request, response) => {
    response.write(
        `<html>
            <head> 
                <title>Enter Message</title>
            </head>
            <body>
                <form action="/create-user" method="POST">
                    <label>User name: </label>
                    <input type="text" name="username"/>
                    <button type="submit">Create</button>
                </form>
            </body>
        </html>`
    );
    response.write(`</html>`);
    response.end();
}

const usersRequestHandler = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(`<html>`);
    response.write(`<head><title>Assignment Test</title></head>`);
    response.write(getUserRequestBody());
    response.write(`</html>`);
    response.end();
}

const createUserRequestHandler = (request, response) => {
    if (request.method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            response.statusCode = 302;
            response.setHeader('Location', '/');
            response.end();
        });
    } else {
        pageNotFound();
    }
}


const getUserRequestBody = () => {
    const dummyUsersList = getDummyUsersListHtml();
    return `<body>${dummyUsersList}</body>`
}

const getDummyUsersListHtml = () => {
    const dummyUsers = ['User A', 'User B', 'User C', 'User D'];

    let i = -1;
    const listElements = dummyUsers.reduce((users, user) => {
        ++i;
        if (i === 0) return `<li>${users}</li><li>${user}</li>`;
        return `${users}<li>${user}</li>`
    });

    return `<ul>${listElements}</ul>`
}

const pageNotFound = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(
        `<html>
            <head> 
                <title>Page not found!</title>
            </head>
            <body>
                The page ${request.url} was not found!
            </body>
        </html>`
    );
    response.end();
}

module.exports = requestHandler