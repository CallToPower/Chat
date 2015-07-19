module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jsbeautifier: {
            files: [
                "Gruntfile.js",
                "src/client/js/helper.js",
                "src/client/js/index.js",
                "src/client/js/variables.js",
                "src/client/css/*",
                "src/server/*"
            ],
            options: {
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        jshint: {
            files: [
                "Gruntfile.js",
                "src/client/js/helper.js",
                "src/client/js/index.js",
                "src/client/js/variables.js",
                "src/server/*"
            ],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            options: {
                banner: "/**\n * Chat (<%= pkg.name %>)\n * Compiled on <%= grunt.template.today('dd.mm.yyyy') %>\n * Version <%= pkg.version %>\n *\n * Copyright (c) <%= pkg.year %> <%= pkg.author.name %>, <%= pkg.author.email %>\n * All rights reserved.\n\n * This software is free software; you can redistribute it and/or \n * modify it under the terms of the GNU Lesser General Public \n * License version 3, 29 June 2007, as published by the Free Software Foundation. \n\n * This software is distributed in the hope that it will be useful, \n * but WITHOUT ANY WARRANTY; without even the implied warranty of \n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU \n * Lesser General Public License for more details. \n\n * You should have received a copy of the GNU Lesser General Public \n * License along with this library; if not, write to the Free Software \n * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA\n */\n"
            },
            dist: {
                files: {
                    "Build/src/client/chat.js": [
                        "src/client/js/helper.js",
                        "src/client/js/index.js",
                        "src/client/js/variables.js"
                    ]
                }
            }
        },
        copy: {
            client_css: {
                files: [{
                    expand: true,
                    flatten: false,
                    src: ["src/client/css/**"],
                    dest: "Build"
                }]
            },
            client_img: {
                files: [{
                    expand: true,
                    flatten: false,
                    src: ["src/client/img/**"],
                    dest: "Build"
                }]
            },
            client_favicon: {
                files: [{
                    expand: true,
                    flatten: false,
                    src: ["src/client/favicon.ico"],
                    dest: "Build"
                }]
            },
            client_index: {
                files: [{
                    expand: true,
                    flatten: false,
                    src: ["src/client/index.html"],
                    dest: "Build"
                }]
            },
            server: {
                files: [{
                    expand: true,
                    flatten: false,
                    src: ["src/server/**"],
                    dest: "Build"
                }]
            },
            txt: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["README.md", "LICENSE.txt"],
                    dest: "Build/"
                }]
            }
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        },
        clean: {
            build: ["Build"]
        }
    });

    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["jsbeautifier", "jshint"]);
    grunt.registerTask("cleanup", ["clean:build"]);
    grunt.registerTask("build", ["clean:build", "jsbeautifier", "jshint", "uglify", "copy"]);
};
