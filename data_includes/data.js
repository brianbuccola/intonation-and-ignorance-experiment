//
// Define a new "Dialogue" controller, which is a combination of a "Message"
// (the dialogue) and a "Question" (whether the speaker is in this epistemic
// state or that).
//
define_ibex_controller({
    name: "Dialogue",
    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove "Click here to continue" message.
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", this.options,
                    "Question", this.options
                ]
            });
        }
    },
    properties: { }
});

var shuffleSequence = seq("consent", "instructions", sepWith("sep", seq("practice", randomize(anyOf("real", "filler")))), "questionnaire");
var showProgressBar = false;
var completionMessage = "The results were successfully sent to the server. Thanks! Now you need to go back to Mechanical Turk and enter the code LQN4NF to validate your participation and obtain your payment."

var defaults = [
    "Separator", {
        transfer: "keypress",
        normalMessage: "Press any key to continue to the next dialogue.",
        ignoreFailure: true
    },
    "Form", {
        saveReactionTime: true
    },
    "Dialogue", {
        hasCorrect: true,
        showNumbers: false,
        q: "Which of the following two options best describes the meanings of the two responses?"
    }
];

var items = [

    //
    // Separator.
    //
    ["sep", "Separator", { }],

    //
    // Introductory materials.
    //
    ["consent", "Form", {html: {include: "consent.html"}}],
    ["instructions", "Form", {html: {include: "instructions.html"}}],

    //
    // Practice trials.
    //
    ["practice", "Dialogue", {
        html: '<p style="text-align:center;"><em>Practice</em></p><div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-fall.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/reports-fall.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Noah says that some of the students passed, and in Version 2, Noah says that some of the reports were filed.",
             "In Version 1, Noah says that some of the reports were filed, and in Version 2, Noah says that some of the students passed."]
    }],

    ["practice", "Dialogue", {
        html: '<p style="text-align:center;"><em>Practice</em></p><div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/alcohol-yes-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Pat's response, which of the following sentences is true?",
        as: ["Pat drinks alcohol.",
             "Pat doesn't drink alcohol."]
    }],

    //
    // Real trials.
    //
    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-fall.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-rfr.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Noah thinks that not all of the students passed, and in Version 2, Noah isn't sure whether or not all of the students passed.",
             "In Version 1, Noah isn't sure whether or not all of the students passed, and in Version 2, Noah thinks that not all of the students passed."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/novels-fall.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/novels-rfr.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Liam thinks that not all of the novels were in French, and in Version 2, Liam isn't sure whether or not all of the novels were in French.",
             "In Version 1, Liam isn't sure whether or not all of the novels were in French, and in Version 2, Liam thinks that not all of the novels were in French."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/horses-fall.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/horses-rfr.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, William thinks that not all of the horses are fast, and in Version 2, William isn't sure whether or not all of the horses are fast.",
             "In Version 1, William isn't sure whether or not all of the horses are fast, and in Version 2, William thinks that not all of the horses are fast."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/guests-fall.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/guests-rfr.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Mason thinks that not all of the guests ate dinner, and in Version 2, Mason isn't sure whether or not all of the guests ate dinner.",
             "In Version 1, Mason isn't sure whether or not all of the guests ate dinner, and in Version 2, Mason thinks that not all of the guests ate dinner."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/dishes-rfr.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/dishes-fall.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Benjamin isn't sure whether or not all of the dishes contain meat, and in Version 2, Benjamin thinks that not all of the dishes contain meat.",
             "In Version 1, Benjamin thinks that not all of the dishes contain meat, and in Version 2, Benjamin isn't sure whether or not all of the dishes contain meat."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/clients-rfr.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/clients-fall.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Jacob isn't sure whether or not all of the clients met Sophia, and in Version 2, Jacob thinks that not all of the clients met Sophia.",
             "In Version 1, Jacob thinks that not all of the clients met Sophia, and in Version 2, Jacob isn't sure whether or not all of the clients met Sophia."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/planes-rfr.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/planes-fall.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Michael isn't sure whether or not all of the planes have been delayed, and in Version 2, Michael thinks that not all of the planes have been delayed.",
             "In Version 1, Michael thinks that not all of the planes have been delayed, and in Version 2, Michael isn't sure whether or not all of the planes have been delayed."]
    }],

    ["real", "Dialogue", {
        html: '<div id="audio"><strong>Version 1:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/reports-rfr.wav" type="audio/wav"></audio></div><br><div id="audio"><strong>Version 2:</strong><br><br><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/reports-fall.wav" type="audio/wav"></audio></div>',
        as: ["In Version 1, Elijah isn't sure whether or not all of the reports were filed, and in Version 2, Elijah thinks that not all of the reports were filed.",
             "In Version 1, Elijah thinks that not all of the reports were filed, and in Version 2, Elijah isn't sure whether or not all of the reports were filed."]
    }],

    //
    // Filler trials.
    //
    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/alcohol-not-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Pat's response, which of the following sentences is true?",
        as: ["Pat doesn't drink alcohol.",
             "Pat drinks alcohol."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/buy-not-no-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Chris's response, which of the following sentences is true?",
        as: ["Chris isn't going to buy that.",
             "Chris is going to buy that."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/employee-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Morgan's response, which of the following sentences is true?",
        as: ["Morgan isn't an employee here.",
             "Morgan is an employee here."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/friend-not-yes-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Taylor's response, which of the following sentences is true?",
        as: ["Taylor is a friend of Jenny's.",
             "Taylor isn't a friend of Jenny's."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/hockey-yes-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Jordan's response, which of the following sentences is true?",
        as: ["Jordan played on the hockey team.",
             "Jordan didn't play on the hockey team."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/movies-yes-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Devin's response, which of the following sentences is true?",
        as: ["Devin likes movies.",
             "Devin doesn't like movies."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/pres-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Alex's response, which of the following sentences is true?",
        as: ["Alex isn't coming to the presentation.",
             "Alex is coming to the presentation."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload"><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/trash-not-yes-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Riley's response, which of the following sentences is true?",
        as: ["Riley took the trash out.",
             "Riley didn't take the trash out."]
    }],

    //
    // Questionnaire.
    //
    ["questionnaire", "Form", {
        html: {include: "questionnaire.html"},
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    }]
];
