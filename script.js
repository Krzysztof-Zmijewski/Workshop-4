const apikey = 'daba6d5c-e5c2-423e-8abc-4b413a032243';
const apihost = 'https://todo-api.coderslab.pl';

function apiListTask () {
    return fetch(apihost + '/api/tasks',
        {
            headers: { Authorization : apikey }
        }
        ).then( resp => {
            if(!resp.ok) {
                alert('Błąd apiListTask! Otwórz devtools i sprawdź o co chodzi.');
            }
            return resp.json();
        }
    )
}
function renderTask (taskId, title, description, status,) {
    const section = document.createElement("section");
    section.className = "card mt-5 shadow-sm";
    document.querySelector("main").appendChild(section);
    const headerDiv = document.createElement("div");
    headerDiv.className = "card-header d-flex justify-content-between align-items-center";
    section.appendChild(headerDiv);
    const headerSecondDiv = document.createElement("div");
    headerDiv.appendChild(headerSecondDiv);
    const h5 = document.createElement("h5");
    h5.innerText = title;
    headerSecondDiv.appendChild(h5);
    const h6 = document.createElement("h6");
    h6.className = "card-subtitle text-muted";
    h6.innerText = description;
    headerSecondDiv.appendChild(h6);
    const headerThirdDiv = document.createElement("div");
    headerDiv.appendChild(headerThirdDiv);
    if(status === "open"){
        const finnishButton = document.createElement("button");
        finnishButton.className = "btn btn-dark btn-sm js-task-open-only";
        finnishButton.innerText = "Finish";
        headerThirdDiv.appendChild(finnishButton);
    }
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-danger btn-sm ml-2";
    deleteButton.innerText = "Delete";
    headerThirdDiv.appendChild(deleteButton);
    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";
    section.appendChild(ul);
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    ul.appendChild(li);
    const liDiv = document.createElement("div");
    liDiv.innerText = "W otwartym zadaniu istniejącym operacjom można dodać czas";
    li.appendChild(liDiv);
    const liSpan = document.createElement("span");
    liSpan.className = "badge badge-success badge-pill ml-2";
    liSpan.innerText = "2h 0m";
    li.appendChild(liSpan);
    const liSecondDiv = document.createElement("div");
    li.appendChild(liSecondDiv);
    const button15m = document.createElement("button");
    button15m.className = "btn btn-outline-success btn-sm mr-2";
    button15m.innerText = "+15m";
    liSecondDiv.appendChild(button15m);
    const button1h = document.createElement("button");
    button1h.className = "btn btn-outline-success btn-sm mr-2";
    button1h.innerText = "+1h";
    liSecondDiv.appendChild(button1h);
    const liButtonDelete = document.createElement("button");
    liButtonDelete.className = "btn btn-outline-danger btn-sm";
    liButtonDelete.innerText = "Delete";
    liSecondDiv.appendChild(liButtonDelete);
    console.log("taskId to " + taskId);
    console.log("title to " + title);
    console.log("description to " + description);
    console.log("status to " + status);

}
document.addEventListener('DOMContentLoaded', function() {
    apiListTask().then(
        resp =>  {
            resp.data.forEach( task => {
                renderTask(task.id, task.title, task.description, task.status);
            })
        }
    )

});
