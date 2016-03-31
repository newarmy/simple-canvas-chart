
module.exports = function (grunt) {
	grunt.file.defaultEncoding = "utf-8";
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src',/*相对Gruntfile.js的目录*/
					
					dir:'js',/*相对Gruntfile.js的目录  优化后的目录*/
					//optimize: 'none',
					modules: [
						{
							name: 'column-main',
							include: ['column']
						},
						{
							name: 'pie-main',
							include: ['pie']
						},
						{
							name: 'line-main',
							include: ['line']
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