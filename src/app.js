#!/usr/bin/env node
import {program} from "commander";
import * as clack from "@clack/prompts"
import {generateConfig} from "../service/groqService.js"
import fs from "node:fs"
import pkg from 'enquirer';
const { AutoComplete } = pkg;
import {addToFile} from "../utils/filsOps.js"



program
    .name("autostack")
    .description("cli tool to automate infrastructure files boilerplate")
    .argument("[arg1]","action type")
    .argument("[arg1]","file type")
    .action(async (arg1, arg2) => {
        if (!arg1 && !arg2) {
            intro("welcome to autostack");
            console.log("$ autostack\n" +
                "\n" +
                "Autostack - Automated DevOps Configuration Tool\n" +
                "\n" +
                "Generate Dockerfiles, Docker Compose files, and Kubernetes configurations with ease.\n" +
                "\n" +
                "Usage:\n" +
                "\n" +
                "  autostack init        Initialize a new project structure.\n" +
                "  autostack gen docker  Generate a Dockerfile for your app.\n" +
                "  autostack gen compose Generate a docker-compose.yml for multi-container apps.\n" +
                "  autostack gen k8s     Generate Kubernetes YAML files (Pods, Deployments, Services).\n" +
                "  autostack help        Display help information.\n" +
                "\n" +
                "Quick Start:\n" +
                "$ autostack gen docker\n" +
                "\n" +
                "For detailed documentation, visit:\n" +
                "https://autostack.io/docs\n")
        } else if (arg1 === "init") {
            //choosing a prog langauge for the current project
            const selectedLanguage = new AutoComplete({
                name: 'Language',
                message: 'Pick a lang',
                choices: [
                    // 🟢 Most Common (Docker-First Support)
                    'Node.js',
                    'Python',
                    'Go',
                    'Java',
                    'Ruby',
                    'PHP',
                    'C# (.NET)',

                    // 🧱 Systems-Level
                    'C',
                    'C++',
                    'Rust',

                    // 🟣 Lightweight Runtimes
                    'Deno',
                    'Bun',
                    'Elixir',
                    'Crystal',

                    // ⚙️ Scripting / DevOps
                    'Shell (Bash)',
                    'PowerShell',

                    // 🧪 Data & Research
                    'R',
                    'Julia',

                    // 🟠 JVM Ecosystem
                    'Kotlin',
                    'Scala',
                    'Clojure',

                    // 🌐 Web-related
                    'TypeScript',
                    'JavaScript (Vanilla)',

                    // ⚙️ Config / Infra (not for Docker base images, but useful)
                    'HCL (Terraform)',
                    'YAML',
                    'SQL',
                    'GraphQL',

                    // ⚪ Legacy or Specialized
                    'Perl',
                    'Lua',
                    'Objective-C',
                    'COBOL',
                    'Fortran',
                    'Pascal',
                ]
            });
            let langChoice;
            selectedLanguage.run()
                .then( answer => {
                    langChoice = answer
                     addToFile({language: langChoice});

                    const selectedFramework = new AutoComplete({
                        name: 'framework',
                        message: 'Pick a framework',
                        choices: [
                            'Express',
                            'React',
                            'Next.js',
                            'Remix',
                            'Gatsby',
                            'Vue',
                            'Nuxt',
                            'Svelte',
                            'SvelteKit',
                            'SolidJS',
                            'Angular',
                            'Qwik',
                            'Preact',
                            'Alpine.js',
                            'Lit',
                            'Ember.js',
                            'Mithril',
                            'Marko',
                            'Inferno',
                            'Stencil',
                            'HTMX',
                            'Astro',
                            'Riot.js',
                            'Backbone.js',     // Legacy but still maintained
                            'Polymer',         // Older Google project
                            'Blitz.js',        // Built on Next.js, full-stack
                            'RedwoodJS',       // Full-stack with GraphQL
                            'VuePress',
                            'Docusaurus',
                            'Eleventy (11ty)', // Static site generator
                            'Turbopack',       // Next-gen bundler by Vercel
                        ]
                    });
                    let frameworkChoice;
                    selectedFramework.run()
                        .then(answer => {
                            frameworkChoice = answer
                            addToFile({framework: frameworkChoice});
                        })
                        .catch(console.error);
                })
                .catch(console.error);

            //choosing a framework for the current project




        } else if (arg1 === "gen") {
            if (arg2 === "docker") {
                fs.appendFile("Dockerfile", "", function (err) {
                    if (err) throw err;
                    const raw=fs.readFileSync("autostack.json","utf-8");
                    const config=JSON.parse(raw);
                    const language=config.language
                    const framework=config.framework
                    const dockerfile=generateConfig({language,framework}).then((data)=>{
                        fs.writeFileSync("Dockerfile",data);
                        console.log(data)
                    });




                    //fs.writeFileSync("autostack.json",JSON.stringify(config,null,2));

                })
            }

        }
    })
program.parse();