function getEnvironmentProperties() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const env = scriptProperties.getProperty('ENVIRONMENT');
    const ENVIRONMENT = {
        STAGING: 'staging',
        PRODUCTION: 'production',
    };

    const productionEnvProperties = {
        beonApiUrl: 'https://api.beon.tech',
        beonPlatformUrl: 'https://platform.beon.tech',
    };

    const stagingEnvProperties = {
        beonApiUrl: 'https://api.dev.beon.tech',
        beonPlatformUrl: 'https://platform.dev.beon.tech',
    };

    // Return production environment properties by default
    if (!env) {
        return productionEnvProperties;
    }

    if (env === ENVIRONMENT.STAGING) {
        return stagingEnvProperties;
    }

    return productionEnvProperties;
}

function doGet() {
    const authUserEmail = Session.getActiveUser().getEmail();
    const template = HtmlService.createTemplateFromFile('index');
    // NOTE: envProps would be use as environment variables from Google Script Properties (is still in progress)
    const envProps = getEnvironmentProperties();

    template.authUserEmail = authUserEmail;
    template.envProps = envProps;

    return template.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}
