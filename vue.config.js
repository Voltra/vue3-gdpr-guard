const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: false,
	parallel: true,
	lintOnSave: true,
});
