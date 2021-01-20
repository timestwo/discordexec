const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();



const prefix = "--";
const token = "token here";



function FindLanguageByName(language_name) {
    var id_list = {
        "C#": 1,
        "VB.NET": 2,
        "F#": 3,
        "Java": 4,
        "Python": 5,
        "C": 6,
        "C++": 7,
        "Php": 8,
        "Pascal": 9,
        "Objective-C": 10,
        "Haskell": 11,
        "Ruby": 12,
        "Perl": 13,
        "Lua": 14,
        "Nasm": 15,
        "Sql Server": 16,
        "Sql": 16,
        "Javascript": 17,
        "Lisp": 18,
        "Prolog": 19,
        "Go": 20,
        "Scala": 21,
        "Scheme": 22,
        "Node.js": 23,
        "Nodejs": 23,
        "Node": 23,
        "Python": 24,
        "Py": 24,
        "Octave": 25,
        "D": 30,
        "R": 31,
        "Tcl": 32,
        "MySQL": 33,
        "PostgreSQL": 34,
        "Oracle": 35,
        "Swift": 37,
        "Bash": 38,
        "Ada": 39,
        "Erlang": 40,
        "Elixir": 41,
        "Ocaml": 42,
        "Kotlin": 43,
        "Fortran": 45,
        "Rust": 46,
        "Clojure": 47
    }
    var Languages = {};
    for (var i in id_list) {
        Languages[i.toUpperCase()] = id_list[i];
    }
    return Languages[language_name.toUpperCase()];
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'help') {
        msg.channel.send({
            embed: {
                color: 3447003,
                title: "test",
                url: "SoonTM",
                description: "Code-executor bot in JS\n",
                fields: [{
                        name: "Execute command",
                        value: prefix + "exec (language) (code)"
                    },
                    {
                        name: "Show help",
                        value: prefix + "help"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "Lawl."
                }
            }
        });
    } else if (command === 'exec') {
        if (!args.length) {
            return msg.channel.send("Correct usage: " + prefix + "exec (language) (code)");
        }
        try {

            var language_input = args[0];
            var language_code = FindLanguageByName(language_input);
            var codes = args.slice(1).join(' ');



            const data = {
                "LanguageChoice": String(language_code),
                "Program": String(codes),
                "Input": "",
                "CompilerArgs": ""
            };



            axios.post('https://rextester.com/rundotnet/api', data)
                .then((res) => {
                    var fields = [{
                            name: "Output:",
                            value: res.data.Result !== '' ? res.data.Result : '``Empty!``'
                        },
                    ];

                    if (res.data.Errors !== '' && res.data.Errors != null) {
                        fields.push({
                            name: "Errors:",
                            value: res.data.Errors
                        });
                    }
                    if (res.data.Warnings !== '' && res.data.Warnings != null) {
                        fields.push({
                            name: "Flags:",
                            value: res.data.Warnings
                        });
                    }

                    msg.channel.send(res.data.Result)

                    });
                

        } catch (err) {}

    }


});
client.login(token);
