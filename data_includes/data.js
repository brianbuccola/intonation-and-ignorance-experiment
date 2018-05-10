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

var shuffleSequence = seq("consent", "instructions", sepWith("sep", seq("practice", shuffle(rshuffle("fcert", "funcert"), rshuffle("fall", "rfr")))), "questionnaire");
var showProgressBar = false;
var completionMessage = "The results were successfully sent to the server. Thanks! Now you need to go back to Mechanical Turk and enter the code XXXXXX to validate your participation and obtain your payment."

var defaults = [
    "Separator", {
        transfer: "keypress",
        normalMessage: "Please wait for the next dialogue.",
    },
    "Form", {
        saveReactionTime: true
    },
    "Dialogue", {
        showNumbers: false,
        randomOrder: true
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
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["practice", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that some of the novels were in French.",
             "Liam isn't sure whether or not any of the novels were in French."]
    }],

    //
    // Real trials.
    //
    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that not all of the students passed.",
             "Noah isn't sure whether or not all of the students passed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that not all of the students passed.",
             "Noah isn't sure whether or not all of the students passed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that not all of the novels were in French.",
             "Liam isn't sure whether or not all of the novels were in French."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that not all of the novels were in French.",
             "Liam isn't sure whether or not all of the novels were in French."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that not all of the horses are fast.",
             "William isn't sure whether or not all of the horses are fast."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that not all of the horses are fast.",
             "William isn't sure whether or not all of the horses are fast."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that not all of the guests ate dinner.",
             "Mason isn't sure whether or not all of the guests ate dinner."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that not all of the guests ate dinner.",
             "Mason isn't sure whether or not all of the guests ate dinner."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that not all of the dishes contain meat.",
             "Benjamin isn't sure whether or not all of the dishes contain meat."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that not all of the dishes contain meat.",
             "Benjamin isn't sure whether or not all of the dishes contain meat."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that not all of the clients met Sophia.",
             "Jacob isn't sure whether or not all of the clients met Sophia."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that not all of the clients met Sophia.",
             "Jacob isn't sure whether or not all of the clients met Sophia."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that not all of the planes have been delayed.",
             "Michael isn't sure whether or not all of the planes have been delayed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that not all of the planes have been delayed.",
             "Michael isn't sure whether or not all of the planes have been delayed."]
    }],

    ["fall", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that not all of the reports were filed.",
             "Elijah isn't sure whether or not all of the reports were filed."]
    }],

    ["rfr", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that not all of the reports were filed.",
             "Elijah isn't sure whether or not all of the reports were filed."]
    }],

    //
    // Filler trials.
    //
    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Noah's response, which of the following sentences is true?",
        as: ["Noah thinks that some of the students passed.",
             "Noah isn't sure whether or not any of the students passed."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that some of the novels were in French.",
             "Liam isn't sure whether or not any of the novels were in French."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Liam's response, which of the following sentences is true?",
        as: ["Liam thinks that some of the novels were in French.",
             "Liam isn't sure whether or not any of the novels were in French."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that some of the horses are fast.",
             "William isn't sure whether or not any of the horses are fast."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on William's response, which of the following sentences is true?",
        as: ["William thinks that some of the horses are fast.",
             "William isn't sure whether or not any of the horses are fast."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that some of the guests ate dinner.",
             "Mason isn't sure whether or not any of the guests ate dinner."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Mason's response, which of the following sentences is true?",
        as: ["Mason thinks that some of the guests ate dinner.",
             "Mason isn't sure whether or not any of the guests ate dinner."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that some of the dishes contain meat.",
             "Benjamin isn't sure whether or not any of the dishes contain meat."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Benjamin's response, which of the following sentences is true?",
        as: ["Benjamin thinks that some of the dishes contain meat.",
             "Benjamin isn't sure whether or not any of the dishes contain meat."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that some of the clients met Sophia.",
             "Jacob isn't sure whether or not any of the clients met Sophia."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Jacob's response, which of the following sentences is true?",
        as: ["Jacob thinks that some of the clients met Sophia.",
             "Jacob isn't sure whether or not any of the clients met Sophia."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that some of the planes have been delayed.",
             "Michael isn't sure whether or not any of the planes have been delayed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Michael's response, which of the following sentences is true?",
        as: ["Michael thinks that some of the planes have been delayed.",
             "Michael isn't sure whether or not any of the planes have been delayed."]
    }],

    ["fcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that some of the reports were filed.",
             "Elijah isn't sure whether or not any of the reports were filed."]
    }],

    ["funcert", "Dialogue", {
        html: '<div id="audio"><audio controls autoplay><source src="https://ia800701.us.archive.org/15/items/test_wav/Untitled3.wav" type="audio/wav"></audio></div>',
        q: "Based on Elijah's response, which of the following sentences is true?",
        as: ["Elijah thinks that some of the reports were filed.",
             "Elijah isn't sure whether or not any of the reports were filed."]
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
