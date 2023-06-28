function doGet() {
    const authUserEmail = Session.getActiveUser().getEmail();
    const template = HtmlService.createTemplateFromFile('index');

    template.authUserEmail = authUserEmail;

    return template.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}
