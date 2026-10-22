// SkillPath Project JavaScript


let course = document.getElementById("careerGoal");

let startButton = document.getElementById("startBtn");

let questionBox = document.getElementById("questionContainer");

let submitButton = document.getElementById("submitAssessment");

let resultBox = document.getElementById("resultSection");

let homePage = document.querySelector(".container");

let assessmentBox = document.getElementById("assessmentBox");

let selectedQuestions = [];

// Course Data

let courses = {


"Web Development": {

questions:[
{
q:"HTML is used for?",
options:["Structure of Web Page","Database","AI","Networking"],
answer:"Structure of Web Page"
},
{
q:"CSS is used for?",
options:["Programming Language","Designing Web Pages","Database","Security"],
answer:"Designing Web Pages"
},
{
q:"JavaScript is used for?",
options:["OS","Hardware","Storage","Web Interactivity"],
answer:"Web Interactivity"
},
{
q:"React is a?",
options:["Database","JavaScript Library","Language","Browser"],
answer:"JavaScript Library"
},
{
q:"Backend is used for?",
options:["Server Side Development","Design","Images","Animation"],
answer:"Server Side Development"
}
],

weights:[0.30,0.25,0.20,0.15,0.10],

roadmap:[
"Learn HTML and CSS",
"Learn JavaScript",
"Learn React",
"Learn Backend Development",
"Build Web Projects"
]

},



"AI/ML":{

questions:[
{
q:"Which language is mostly used for AI/ML?",
options:["HTML","Python","CSS","SQL"],
answer:"Python"
},
{
q:"Probability is used for?",
options:["Networking","Design","Animation","Prediction"],
answer:"Prediction"
},
{
q:"Statistics is useful for?",
options:["Data Analysis","Web Design","Hardware","Gaming"],
answer:"Data Analysis"
},
{
q:"Linear Algebra is related to?",
options:["Website","Browser","Matrix","Server"],
answer:"Matrix"
},
{
q:"Machine Learning uses?",
options:["Images","HTML","CSS","Algorithms"],
answer:"Algorithms"
}
],

weights:[0.35,0.25,0.20,0.20],

roadmap:[
"Learn Python Basics",
"Learn Mathematics",
"Learn Machine Learning Algorithms",
"Practice ML Models",
"Build ML Projects"
]

},



"Data Science":{

questions:[
{
q:"Data Science mainly works with?",
options:["Games","Design","Hardware","Data"],
answer:"Data"
},
{
q:"Python library for data analysis?",
options:["React","Pandas","Bootstrap","Angular"],
answer:"Pandas"
},
{
q:"Statistics helps in?",
options:["Design","Animation","Networking","DesignData Analysis"],
answer:"Data Analysis"
},
{
q:"Visualization is used for?",
options:["Data Representation","Coding Only","Security","Storage"],
answer:"Data Representation"
},
{
q:"SQL is used for?",
options:["Hardware","Web Design","Animation","Database Management"],
answer:"Database Management"
}
],

weights:[0.30,0.25,0.20,0.15,0.10],

roadmap:[
"Learn Python",
"Learn SQL",
"Learn Statistics",
"Learn Pandas and NumPy",
"Create Data Projects"
]

},



"Python Development":{

questions:[
{
q:"Python is a?",
options:["Database","Browser","Programming Language","OS"],
answer:"Programming Language"
},
{
q:"Python file extension is?",
options:[".css",".html",".py",".java"],
answer:".py"
},
{
q:"Python supports?",
options:["Object Oriented Programming","Only Design","Hardware","Networking"],
answer:"Object Oriented Programming"
},
{
q:"Python is used for?",
options:["Images","Only Styling","Software Development","Browser"],
answer:"Software Development"
},
{
q:"Python list is a?",
options:["Data Structure","Framework","Database","OS"],
answer:"Data Structure"
}
],

weights:[0.25,0.25,0.20,0.15,0.15],

roadmap:[
"Learn Python Basics",
"Learn Functions and OOP",
"Learn Libraries",
"Practice Problem Solving",
"Build Python Projects"
]

},



"Others":{

questions:[
{
q:"Do you have basic knowledge related to your selected field?",
options:["Yes","No","Maybe","Not Sure"],
answer:"Yes"
},
{
q:"Do you practice coding regularly?",
options:["Yes","No","Sometimes","Rarely"],
answer:"Yes"
},
{
q:"Do you learn new technologies?",
options:["Yes","No","Sometimes","Rarely"],
answer:"Yes"
},
{
q:"Do you make projects?",
options:["Yes","No","Planning","Never"],
answer:"Yes"
},
{
q:"Are you ready to improve skills?",
options:["Yes","No","Maybe","Not Sure"],
answer:"Yes"
}
],

weights:[0.25,0.25,0.20,0.15,0.15],

roadmap:[
"Identify Required Skills",
"Learn Basic Concepts",
"Practice Regularly",
"Build Projects"
]

}

};



// Start Assessment Button

startButton.onclick=function(){


let selectedCourse = course.value;


if(selectedCourse==""){

alert("Please select your Career Goal");

return;

}
homePage.style.display = "none";
assessmentBox.style.display = "block";


selectedQuestions = courses[selectedCourse].questions;


questionBox.innerHTML="";


selectedQuestions.forEach(function(item,index){


let div=`

<div class="question">

<p>${index+1}. ${item.q}</p>

`;


item.options.forEach(function(option){


div+=`

<input type="radio" name="q${index}" value="${option}">
${option}<br>

`;

});


div+="</div>";


questionBox.innerHTML += div;


});


};





// Submit Assessment


submitButton.onclick=function(){


let selectedCourse = course.value;


let score=0;


selectedQuestions.forEach(function(item,index){


let answer=document.querySelector(
'input[name="q'+index+'"]:checked'
);


if(answer && answer.value==item.answer){

score++;

}

});



let percentage=(score/selectedQuestions.length)*100;



let weights=courses[selectedCourse].weights;


let readiness=0;


for(let i=0;i<weights.length;i++){

readiness += weights[i]*percentage;

}


readiness=readiness.toFixed(2);



let level;


if(readiness>=75){

level="Advanced";

}
else if(readiness>=50){

level="Intermediate";

}
else{

level="Beginner";

}





let days=lagrange(
[30,50,75],
[25,15,5],
Number(readiness)
);


days=Math.round(days);



let roadmap="";


courses[selectedCourse].roadmap.forEach(function(item){

roadmap += "<li>"+item+"</li>";

});




resultBox.innerHTML=`

<h2>SkillPath Result</h2>

<p><b>Career Goal:</b> ${selectedCourse}</p>

<p><b>Score:</b> ${score}/${selectedQuestions.length}</p>

<p><b>Readiness Percentage:</b> ${readiness}%</p>

<p><b>Readiness Level:</b> ${level}</p>

<p><b>Estimated Learning Time:</b> ${days} Days</p>


<h3>Recommended Learning Roadmap</h3>

<ul>

${roadmap}

</ul>

`;

};





// Lagrange Interpolation

function lagrange(x,y,value){


let result=0;


for(let i=0;i<x.length;i++){


let term=y[i];


for(let j=0;j<x.length;j++){


if(i!=j){

term=term*((value-x[j])/(x[i]-x[j]));

}

}


result += term;


}


return result;

}