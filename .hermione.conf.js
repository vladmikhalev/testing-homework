module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      // retry: 5,
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      }
    },
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione-html-report",
      enabled: true,
    },
  },
};
