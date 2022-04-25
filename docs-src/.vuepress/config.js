module.exports = {
	base: "/vue3-gdpr-guard/",
	dest: "../docs",
	themeConfig: {
		logo: "https://raw.githubusercontent.com/Voltra/vue3-gdpr-guard/dev/vue3-gdpr-guard.png",
		smoothScroll: true,
		plugins: [
			["clean-urls", true]
		],
		sidebar: [
			'/',
			/*'/exports',
			'/plugin',
			{
				title: "Components",
				path: "/components",
				children: [
					"/components/GdprManager",
					"/components/GdprGroup",
					"/components/GdprGuard"
				],
				prev: "/plugin",
				next: "/components/GdprManager",
			},
			'/helpers',
			'/in-depth',*/
		],
	},
};
