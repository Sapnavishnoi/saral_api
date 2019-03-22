const axios = require("axios");
const raw_input = require("readline-sync").question;

const SARAL_URL = "http://saral.navgurukul.org/api/courses";

// function to get the data from the api using axios
const get_data = (url) => axios.get(url).then(response => response.data);

// get the courses and ask user to select the courses
const select_course = () => {
    let courses_promise = get_data(SARAL_URL).then(data => {
        // const availableCourses = data.availableCourses;
        const { availableCourses } = data;

        for (let i = 0; i < availableCourses.length; i++) {
            const course = availableCourses[i];
            console.log(`${i + 1}. ${course.name}`);
        }        
        let course_number = raw_input("Kripaya ek course select kare: ");

        // Edge case
        if (course_number < 1 || course_number > availableCourses.length){
            console.log("Error: Apne galat serial number diya hai.");
            process.exit();
        }
        course_number = course_number - 1;
        let course = availableCourses[course_number];

        return course.id;
    })
    return courses_promise
}

// get the exercises and it child exercises to be displayed

const select_exercise = (course_id) => {
    let exercises_url =  SARAL_URL + `/${course_id}/exercises`;
    let exercise_promise = get_data(exercises_url).then(data => {
        let exercises = data.data
        for(let i = 0; i < exercises.length; i++){
            // Parent exericse dikhao
            let exercise = exercises[i];
            console.log(`${i+1}. Parent Exercise Name: ${exercise.name}`)
            
            // child exercise dikhao
            let child_exercises = exercise.childExercises;

            for(let j = 0; j < child_exercises.length; j++){
                let child_exercise = child_exercises[j];
                console.log(`    ${j+1}. Child Exercise : ${child_exercise.name}`)
            }
        }

        const parent_exercise_num = raw_input("Kripaya ek course select kare: ");
        // Edge case
        if (parent_exercise_num < 1 || parent_exercise_num > exercises.length){
            console.log("Error: Apne galat serial number diya hai.");
            process.exit();
        }

        // Does it have child exercises?
        if(parent_exercise_num.parentExerciseId !== null){
            
        } else{
        // it doesn't have any child exercises
        }

    });

    return exercise_promise;
} 

select_course().then(select_exercise)
const slugUrl = "http://saral.navgurukul.org/api/courses/75/exercise/getBySlug?slug=requests__using-json";
axios.get(slugUrl).then(response =>{
    const availableslug = response.data.content;
    for(let k = 0; k < availableslug.length; k++){
        let slug = availableslug[k];
        console.log("-------------------");
        console.log("content", availableslug);
        console.log("exercise id", exercises.slug);
    }
});