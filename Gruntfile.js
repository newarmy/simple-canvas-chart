
module.exports = function (grunt) {
	grunt.file.defaultEncoding = "utf-8";
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'app/src',/*相对Gruntfile.js的目录*/
					paths : {
						'zepto': '../lib/Zepto.min',
						'commen': './commen',
						'anchor' : 'list/anchor'
					},
					shim: {
						'zepto': {
							exports: '$'
						}
					},
					dir:'app/js',/*相对Gruntfile.js的目录  优化后的目录*/
					//optimize: 'none',
					modules: [
						{
							name: 'modelCircle',
							include: ['anchor', 'list/initheight', 'list/showCircle']
						},
						{
							name: 'index',
							include: ['list/tab']
						}
						{
							name: 'quickSel',
							include: ['quickRecommend/changeCircle', 'quickRecommend/manageCircle','quickRecommend/linkTo']
						}
					],
					skipDirOptimize: true /*当设置为true时，优化器将会跳过非构建中被约束的JS文件。*/
				}
			}
		}
		
	});
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.registerTask('build',['requirejs']);
};