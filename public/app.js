document.addEventListener("DOMContentLoaded",()=>{

    let formAdd = document.querySelector(".form_add"),
        allTasks = document.querySelector(".all_tasks"),
        clearBtn = document.querySelector(".clear_tasks"),
        filterInput = document.querySelector(".filter_filed");


    //load tasks in localstorage
    loadTasks();
    function loadTasks(){
        if(localStorage.getItem("tasks") != null){
            let tasks = JSON.parse(localStorage.getItem("tasks")),
                html;
            tasks.forEach((e)=>{
                html = `
                <div class="task">
                <p>${e}</p>
                <a href="#" class="delete">Delete</a>
                </div>
                `;
                allTasks.innerHTML += html;
            });
        }
    }
    //Delete Task
    deletebtn();
    function deletebtn(){
        allTasks.querySelectorAll(".delete").forEach((e)=>{
            e.addEventListener("click",(e)=>{
                e.preventDefault();
                let currentDiv = e.target.parentNode;
                
                    if(localStorage.getItem("tasks") != null){
                        let tasks = JSON.parse(localStorage.getItem("tasks")),
                            taskName = e.target.parentNode.querySelector("p").textContent,
                            taskIndex = tasks.indexOf(taskName);
                
                        if(taskIndex > -1){
                            tasks.splice(taskIndex,1);
                        }
                        localStorage.setItem("tasks",JSON.stringify(tasks));
                    }
                    e.target.parentNode.parentNode.removeChild(currentDiv);
                
            });
        });
    }

    //Add Task
    formAdd.addEventListener("submit",(e)=>{
        e.preventDefault();
        let value = e.target.querySelector(".add_field").value,
            html = `
            <div class="task">
                <p>${value}</p>
                <a href="#" class="delete">Delete</a>
            </div>
            `;
        allTasks.innerHTML += html;
        e.target.querySelector(".add_field").value = "";
        deletebtn();

        //localstorage
        if(localStorage.getItem("tasks") != null){
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.push(value)
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }else{
            let tasks = [];
            tasks.push(value)
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
        
    });

    //Clear tasks
    clearBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(confirm("Are you shure tou want to delete all your tasks ?")){
            allTasks.innerHTML = '';
            //Localstorage
            localStorage.removeItem("tasks");
        }
    });

    //Filter Tasks
    filterInput.addEventListener("keyup",(e)=>{
        e.preventDefault();
        let divs = allTasks.querySelectorAll(".task");
        divs.forEach((e)=>{
            let tasksName = e.querySelector("p").textContent.toLowerCase(),
                filterField = filterInput.value.toLowerCase();
            if(tasksName.indexOf(filterField) == -1){
                e.style.display = 'none';
            }else{
                e.style.display = 'grid';
            }
        });
    });
});