async function loadConfig() {
    const themeModule = await import('./theme.mjs');
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
        themeModule.setLightTheme();
    } else {
        themeModule.setDarkTheme();
    }
}
loadConfig();
