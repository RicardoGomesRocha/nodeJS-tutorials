exports.get404 = (request, response) => {
    response.render("404", { title: 'Page not found!', path: ''});
}