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

var shuffleSequence = seq("consent", "instructions", sepWith("sep", seq("practice", shuffle(rshuffle("fall", "rfr"), rshuffle("fcert", "funcert")))), "questionnaire");
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
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/students-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Practice filler certainty (falling)</p><p><em>Q: Did all of the students pass?<br>A: Some of them passed.</em></p>",
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["practice", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/novels-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Practice filler uncertainty</p><p><em>Q: Were any of the novels in French?<br>A: I'm not sure whether or not any of them were in French.</em></p>",
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam isn't sure whether or not any of the novels were in French.",
             "Liam thinks that some of the novels were in French."]
    }],

    //
    // Real trials.
    //
    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/students-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Did all of the students pass?<br>A: Some of them passed.</em></p>",
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that not all of the students passed.",
             "Noah isn't sure whether or not all of the students passed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/students-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Did all of the students pass?<br>A: Some of them passed.</em></p>",
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah isn't sure whether or not all of the students passed.",
             "Noah thinks that not all of the students passed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/novels-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Were all of the novels in French?<br>A: Some of them were in French.</em></p>",
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that not all of the novels were in French.",
             "Liam isn't sure whether or not all of the novels were in French."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/novels-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Were all of the novels in French?<br>A: Some of them were in French.</em></p>",
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam isn't sure whether or not all of the novels were in French.",
             "Liam thinks that not all of the novels were in French."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/horses-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Are all of the horses fast?<br>A: Some of them are fast.</em></p>",
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that not all of the horses are fast.",
             "William isn't sure whether or not all of the horses are fast."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/horses-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Are all of the horses fast?<br>A: Some of them are fast.</em></p>",
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William isn't sure whether or not all of the horses are fast.",
             "William thinks that not all of the horses are fast."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/guests-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Did all of the guests eat dinner?<br>A: Some of them ate dinner.</em></p>",
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that not all of the guests ate dinner.",
             "Mason isn't sure whether or not all of the guests ate dinner."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/guests-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Did all of the guests eat dinner?<br>A: Some of them ate dinner.</em></p>",
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason isn't sure whether or not all of the guests ate dinner.",
             "Mason thinks that not all of the guests ate dinner."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/dishes-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Do all of the dishes contain meat?<br>A: Some of them contain meat.</em></p>",
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that not all of the dishes contain meat.",
             "Benjamin isn't sure whether or not all of the dishes contain meat."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/dishes-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Do all of the dishes contain meat?<br>A: Some of them contain meat.</em></p>",
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin isn't sure whether or not all of the dishes contain meat.",
             "Benjamin thinks that not all of the dishes contain meat."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/clients-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Did all of the clients meet Sophia?<br>A: Some of them met Sophia.</em></p>",
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that not all of the clients met Sophia.",
             "Jacob isn't sure whether or not all of the clients met Sophia."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/clients-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Did all of the clients meet Sophia?<br>A: Some of them met Sophia.</em></p>",
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob isn't sure whether or not all of the clients met Sophia.",
             "Jacob thinks that not all of the clients met Sophia."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/planes-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Have all of the planes been delayed?<br>A: Some of them have been delayed.</em></p>",
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that not all of the planes have been delayed.",
             "Michael isn't sure whether or not all of the planes have been delayed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/planes-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Have all of the planes been delayed?<br>A: Some of them have been delayed.</em></p>",
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael isn't sure whether or not all of the planes have been delayed.",
             "Michael thinks that not all of the planes have been delayed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/reports-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Falling (real)</p><p><em>Q: Were all of the reports filed?<br>A: Some of them were filed.</em></p>",
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that not all of the reports were filed.",
             "Elijah isn't sure whether or not all of the reports were filed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/reports-rfr.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> RFR (real)</p><p><em>Q: Were all of the reports filed?<br>A: Some of them were filed.</em></p>",
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah isn't sure whether or not all of the reports were filed.",
             "Elijah thinks that not all of the reports were filed."]
    }],

    //
    // Filler trials.
    //
    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/students-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Did all of the students pass?<br>A: Some of them passed.</em></p>",
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/students-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Did any of the students pass?<br>A: I'm not sure whether or not any of them passed.</em></p>",
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah isn't sure whether or not any of the students passed.",
             "Noah thinks that some of the students passed."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/novels-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Were all of the novels in French?<br>A: Some of them were in French.</em></p>",
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that some of the novels were in French.",
             "Liam isn't sure whether or not any of the novels were in French."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/novels-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Were any of the novels in French?<br>A: I'm not sure whether or not any of them were in French.</em></p>",
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam isn't sure whether or not any of the novels were in French.",
             "Liam thinks that some of the novels were in French."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/horses-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Are all of the horses fast?<br>A: Some of them are fast.</em></p>",
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that some of the horses are fast.",
             "William isn't sure whether or not any of the horses are fast."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/horses-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Are any of the horses fast?<br>A: I'm not sure whether or not any of them are fast.</em></p>",
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William isn't sure whether or not any of the horses are fast.",
             "William thinks that some of the horses are fast."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/guests-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Did all of the guests eat dinner?<br>A: Some of them ate dinner.</em></p>",
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that some of the guests ate dinner.",
             "Mason isn't sure whether or not any of the guests ate dinner."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/guests-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Did any of the guests eat dinner?<br>A: I'm not sure whether or not any of them ate dinner.</em></p>",
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason isn't sure whether or not any of the guests ate dinner.",
             "Mason thinks that some of the guests ate dinner."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/dishes-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Do all of the dishes contain meat?<br>A: Some of them contain meat.</em></p>",
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that some of the dishes contain meat.",
             "Benjamin isn't sure whether or not any of the dishes contain meat."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/dishes-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Do any of the dishes contain meat?<br>A: I'm not sure whether or not any of them contain meat.</em></p>",
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin isn't sure whether or not any of the dishes contain meat.",
             "Benjamin thinks that some of the dishes contain meat."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/clients-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Did all of the clients meet Sophia?<br>A: Some of them met Sophia.</em></p>",
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that some of the clients met Sophia.",
             "Jacob isn't sure whether or not any of the clients met Sophia."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/clients-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Did any of the clients meet Sophia?<br>A: I'm not sure whether or not any of them met Sophia.</em></p>",
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob isn't sure whether or not any of the clients met Sophia.",
             "Jacob thinks that some of the clients met Sophia."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/planes-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Have all of the planes been delayed?<br>A: Some of them have been delayed.</em></p>",
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that some of the planes have been delayed.",
             "Michael isn't sure whether or not any of the planes have been delayed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/planes-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Have any of the planes been delayed?<br>A: I'm not sure whether or not any of them have been delayed.</em></p>",
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael isn't sure whether or not any of the planes have been delayed.",
             "Michael thinks that some of the planes have been delayed."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/reports-fall.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Certainty filler (falling)</p><p><em>Q: Were all of the reports filed?<br>A: Some of them were filed.</em></p>",
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that some of the reports were filed.",
             "Elijah isn't sure whether or not any of the reports were filed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls controlsList="nodownload" autoplay><source src="https://raw.githubusercontent.com/brianbuccola/intonation-and-ignorance-experiment/master/audio/reports-funcert.wav" type="audio/wav"></audio></div>',
        // html: "<p><b>Condition:</b> Uncertainty filler</p><p><em>Q: Were any of the reports filed?<br>A: I'm not sure whether or not any of them were filed.</em></p>",
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah isn't sure whether or not any of the reports were filed.",
             "Elijah thinks that some of the reports were filed."]
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
