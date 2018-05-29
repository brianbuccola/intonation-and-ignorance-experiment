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

var shuffleSequence = seq("consent", "instructions", sepWith("sep", seq("practice", randomize(anyOf("fall", "rfr", "filler")))), "questionnaire");
var showProgressBar = false;
var completionMessage = "The results were successfully sent to the server. Thanks! Now you need to go back to Mechanical Turk and enter the code XXXXXX to validate your participation and obtain your payment."

var defaults = [
    "Separator", {
        transfer: 0,
        normalMessage: "Press any key to continue to the next dialogue.",
    },
    "Form", {
        saveReactionTime: true
    },
    "Dialogue", {
        hasCorrect: true,
        showNumbers: false,
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
        html: '<p style="text-align:center;"><em>Practice</em></p><div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["practice", "Dialogue", {
        html: '<p style="text-align:center;"><em>Practice</em></p><div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/alcohol-yes-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Pat's response, which of the following sentences is true?",
        as: ["Pat drinks alcohol.",
             "Pat doesn't drink alcohol."]
    }],

    //
    // Real trials.
    //
    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that not all of the students passed.",
             "Noah isn't sure whether or not all of the students passed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/students-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah isn't sure whether or not all of the students passed.",
             "Noah thinks that not all of the students passed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/novels-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that not all of the novels were in French.",
             "Liam isn't sure whether or not all of the novels were in French."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/novels-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam isn't sure whether or not all of the novels were in French.",
             "Liam thinks that not all of the novels were in French."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/horses-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that not all of the horses are fast.",
             "William isn't sure whether or not all of the horses are fast."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/horses-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William isn't sure whether or not all of the horses are fast.",
             "William thinks that not all of the horses are fast."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/guests-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that not all of the guests ate dinner.",
             "Mason isn't sure whether or not all of the guests ate dinner."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/guests-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason isn't sure whether or not all of the guests ate dinner.",
             "Mason thinks that not all of the guests ate dinner."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/dishes-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that not all of the dishes contain meat.",
             "Benjamin isn't sure whether or not all of the dishes contain meat."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/dishes-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin isn't sure whether or not all of the dishes contain meat.",
             "Benjamin thinks that not all of the dishes contain meat."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/clients-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that not all of the clients met Sophia.",
             "Jacob isn't sure whether or not all of the clients met Sophia."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/clients-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob isn't sure whether or not all of the clients met Sophia.",
             "Jacob thinks that not all of the clients met Sophia."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/planes-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that not all of the planes have been delayed.",
             "Michael isn't sure whether or not all of the planes have been delayed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/planes-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael isn't sure whether or not all of the planes have been delayed.",
             "Michael thinks that not all of the planes have been delayed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/reports-fall.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that not all of the reports were filed.",
             "Elijah isn't sure whether or not all of the reports were filed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/targets/reports-rfr.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah isn't sure whether or not all of the reports were filed.",
             "Elijah thinks that not all of the reports were filed."]
    }],

    //
    // Filler trials.
    //
    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/alcohol-not-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Pat's response, which of the following sentences is true?",
        as: ["Pat doesn't drink alcohol.",
             "Pat drinks alcohol."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/alcohol-yes-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Pat's response, which of the following sentences is true?",
        as: ["Pat drinks alcohol.",
             "Pat doesn't drink alcohol."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/buy-no-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Chris's response, which of the following sentences is true?",
        as: ["Chris isn't going to buy that.",
             "Chris is going to buy that."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/buy-not-no-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Chris's response, which of the following sentences is true?",
        as: ["Chris isn't going to buy that.",
             "Chris is going to buy that."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/employee-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Morgan's response, which of the following sentences is true?",
        as: ["Morgan isn't an employee here.",
             "Morgan is an employee here."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/employee-not-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Morgan's response, which of the following sentences is true?",
        as: ["Morgan isn't an employee here.",
             "Morgan is an employee here."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/friend-no-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Taylor's response, which of the following sentences is true?",
        as: ["Taylor isn't a friend of Jenny's.",
             "Taylor is a friend of Jenny's."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/friend-not-yes-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Taylor's response, which of the following sentences is true?",
        as: ["Taylor is a friend of Jenny's.",
             "Taylor isn't a friend of Jenny's."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/hockey-not-no-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Jordan's response, which of the following sentences is true?",
        as: ["Jordan didn't play on the hockey team.",
             "Jordan played on the hockey team."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/hockey-yes-dec-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Jordan's response, which of the following sentences is true?",
        as: ["Jordan played on the hockey team.",
             "Jordan didn't play on the hockey team."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/movies-not-yes-dec-con.wav" type="audio/wav"></audio></div>',
        q: "Based on Devin's response, which of the following sentences is true?",
        as: ["Devin likes movies.",
             "Devin doesn't like movies."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/movies-yes-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Devin's response, which of the following sentences is true?",
        as: ["Devin likes movies.",
             "Devin doesn't like movies."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/pres-no-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Hunter's response, which of the following sentences is true?",
        as: ["Hunter isn't coming to the presentation.",
             "Hunter is coming to the presentation."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/pres-not-yes-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Hunter's response, which of the following sentences is true?",
        as: ["Hunter is coming to the presentation.",
             "Hunter isn't coming to the presentation."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/trash-not-yes-CC-rev.wav" type="audio/wav"></audio></div>',
        q: "Based on Riley's response, which of the following sentences is true?",
        as: ["Riley took the trash out.",
             "Riley didn't take the trash out."]
    }],

    ["filler", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/fillers/trash-yes-CC-rev.wav" type="audio/wav"></audio></div>',
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
    }],
];
