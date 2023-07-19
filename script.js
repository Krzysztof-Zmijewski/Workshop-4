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
    deleteButton.addEventListener('click', function() {
        apiDeleteTask(taskId).then(
            function() {
                section.parentElement.removeChild(section);
            }
        );
    });

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

    if( status === "open") {
        const thirdDiv = document.createElement("div");
        thirdDiv.className = "card-body";
        section.appendChild(thirdDiv);

        const form = document.createElement("form");
        thirdDiv.appendChild(form);

        const formDiv = document.createElement("div");
        formDiv.className = "input-group";
        form.appendChild(formDiv);

        const input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Operation description');
        input.setAttribute('minlength', '5');
        input.minLength = 5;
        formDiv.appendChild(input);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            apiCreateOperationForTask(taskId, input.value).then(
                function(response) {
                    renderOperation(
                        ul,
                        status,
                        response.data.id,
                        response.data.description,
                        response.data.timeSpent
                    );
                }
            );
        });

        const inputDiv = document.createElement("div");
        input.className = "input-group-append";
        formDiv.appendChild(inputDiv);

        const inputButton = document.createElement("button");
        inputButton.className = "btn btn-info";
        inputButton.innerText = "Add";
        inputDiv.appendChild(inputButton);

        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';
        section.appendChild(ul);

        apiListOperationsForTask(taskId).then(
            function(response) {
                response.data.forEach(
                    function(operation) {
                        renderOperation(ul, status, operation.id, operation.description, operation.timeSpent);
                    }
                );
            }
        );

    }
    console.log("taskId to " + taskId);
    console.log("title to " + title);
    console.log("description to " + description);
    console.log("status to " + status);

}
function apiListOperationsForTask (taskId) {
    return fetch( apihost + `/api/tasks/${taskId}/operations`,
        {headers: { Authorization : apikey }
        }
    ).then( resp => {
        if (!resp.ok) {
            alert('Błąd apiListTask! Otwórz devtools i sprawdź o co chodzi.');
        }
        return resp.json();
    }
    )
}
function renderOperation(operationsList, status, operationId, operationDescription, timeSpent) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    // operationsList to lista <ul>
    operationsList.appendChild(li);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement('span');
    time.className = 'badge badge-success badge-pill ml-2';
    time.innerText = timeSpent + 'm';
    descriptionDiv.appendChild(time);

    if(status === "open") {
        const controlDiv = document.createElement('div');
        controlDiv.className = 'js-task-open-only';
        li.appendChild(controlDiv);

        const add15minButton = document.createElement('button');
        add15minButton.className = 'btn btn-outline-success btn-sm mr-2';
        add15minButton.innerText = '+15m';
        controlDiv.appendChild(add15minButton);

        const add1hButton = document.createElement('button');
        add1hButton.className = 'btn btn-outline-success btn-sm mr-2';
        add1hButton.innerText = '+1h';
        controlDiv.appendChild(add1hButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm';
        deleteButton.innerText = 'Delete';
        controlDiv.appendChild(deleteButton);

    }
    // ...
}
function formatTime(timeSpent) {
    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;
    if(hours > 0) {
        return hours + 'h ' + minutes + 'm';
    } else {
        return minutes + 'm';
    }
}
function apiCreateTask(title, description) {

    return fetch(
        apihost + '/api/tasks',
        {
            headers: { Authorization: apikey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, status: 'open' }),
            method: 'POST'
        }
    ).then(resp => {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}
function apiDeleteTask (taskId) {
    return fetch(
        apihost + `/api/tasks/${taskId}`,
        {
            headers: { Authorization: apikey},
            method: 'DELETE'
        }
    ).then(resp => {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}
function apiCreateOperationForTask(taskId, description) {

    return fetch(
        apihost + `/api/tasks/${taskId}/operations`,
        {
            headers: { Authorization: apikey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: description, timeSpent: 0 }),
            method: 'POST'
        }
    ).then(resp => {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    );
}
document.addEventListener('DOMContentLoaded', function() {
    apiListTask().then(
        resp =>  {
            resp.data.forEach( task => {
                renderTask(task.id, task.title, task.description, task.status);
            })
        }
    )
    const form = document.querySelector(".js-task-adding-form");
    form.addEventListener("submit", event => {
        event.preventDefault();
        apiCreateTask(event.target.elements.title.value, event.target.elements.description.value).then(
            function(response) { renderTask(response.data.id, response.data.title, response.data.description, response.data.status); }
        )
    });


});


