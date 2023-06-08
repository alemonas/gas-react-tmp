function doGet() {
    const authUserEmail = Session.getActiveUser().getEmail();
    Logger.log('user auth email: ', authUserEmail);
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}
