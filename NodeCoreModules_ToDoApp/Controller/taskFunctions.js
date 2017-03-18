var allTasks= ["Get Started with NodeJS", "First Task", "New Task"];

console.log("Im read!");

module.exports.del = function(t){
    allTasks.forEach((task, i) =>{
        if(task === t){
            allTasks.splice(i,1);
            console.log("Deleting!");
            console.log("Updated Array: ", allTasks);
        }
    });
    return allTasks;
}

module.exports.addTask = function(t){
    allTasks.push(t);
}

module.exports.getTasks = function(){
    return allTasks;
}