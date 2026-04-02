export async function getTaskList() {
    const url = "http://localhost:5000/tasks";
    const taskList = await fetch(url);
    console.log("tasklist", taskList)
    return taskList;
}
