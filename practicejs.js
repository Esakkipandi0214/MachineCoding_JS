// create a simple todo list
// Features: create , view , update and delete

// 1. Create a main function to run in a loop
// 2. Create function create , view , update and delete
// 3. Use Exit keyword to terminate the process

const prompt = require("prompt-sync")();

function main_controller_todolist() {
  var Todolist = [
    {
      title: "Praveen",
      id: 1,
      completed: false,
    },
    {
      title: "Pandi",
      id: 2,
      completed: true,
    },
  ];

  while (true) {
    console.log("==============================================================================")
    console.log(" 1.Add\t2.ViewAll\t3.Update\t4.Delete\t5.Exit");
    console.log("==============================================================================")
    var user_input = Number(prompt("Enter the Option: "));
    // console.log(`User data ${user_input} of type : ${typeof user_input}`);
    if (user_input === 5) return;

    // console.log(`Choosed option : ${user_input}`)

    switch (user_input) {
      case 1:
        handleAddTodo()
        break;
      case 2:
        show_all_list(Todolist);
        break;
      case 3:
        handleUpdateTodo()
        break;
      case 4:
        handleDeleteTodo()
        break;
      default:
        console.log(`Invalid option`);
        break;
    }
  }

  function handleDeleteTodo(){
    const todo_delete = delete_task(Todolist);
         if(todo_delete?.delete_index === undefined) return;
          console.log('Todo delete return data:'+  JSON.stringify(todo_delete))
        const Delete_Index = todo_delete.delete_index;
        console.log(Delete_Index);
        if(typeof Delete_Index !== "undefined" ){
          Todolist.splice(Delete_Index,1);
          console.log("Todo Deleted...!")
          console.log("============================================================")
        }
  }

  function handleAddTodo(){
     const result = add_list(Todolist);
        if (result?.title !== undefined) {
          Todolist.push(result);
        }
  }

  function handleUpdateTodo(){
     const todo_update = update_Index_finder(Todolist);
        if(todo_update?.update_index === undefined) return;
        console.log(todo_update);
        Todolist.map((todo) => {
          if (todo["id"] === todo_update.update_index) {
            for (let single_key in todo_update.update_body) {
              todo[single_key] = todo_update.update_body[single_key];
            }
            console.log(`Update Data:`);
            console.log(todo);
          }
        });
  }
}

function add_list(List_length) {
  var local_storage = {
    title: "",
    id: List_length.length + 1,
    completed: false,
  };
  addEntry: while (true) {
    local_storage = {
      title: "",
      id: List_length.length + 1,
      completed: false,
    };

      console.log("===============================================")
    console.log('1.Add\t2.Exit')
    console.log("===============================================")
    let entry_option = prompt("Enter any one option from above:")

    if(entry_option === "2" || entry_option === "1"){
      if(entry_option === "2"){
      break;
      }
    }else{
      console.log("Invalid Option...")
      continue addEntry;
    }

    let temp_title = prompt("Enter a title: ");
    // console.log("User Title input:", temp_title);
    const istitleValid = is_title_valid(temp_title);
    if (!istitleValid.status) {
      console.log(istitleValid.message);
      continue addEntry;
    }

    const istitleexist = is_title_exist(List_length, temp_title);
    if (istitleexist.status) {
      console.log(istitleexist.message);
      continue addEntry;
    }
    local_storage.title = temp_title.trim();
    return local_storage;
  }
}

function update_Index_finder(List_todo) {
  Initial_update_loop: while (true) {
    console.log("===============================================")
    console.log('1.Update\t2.Exit')
    console.log("===============================================")
    let entry_option = prompt("Enter any one option from above:")

    if(entry_option === "2" || entry_option === "1"){
      if(entry_option === "2"){
      break;
      }
    }else{
      console.log("Invalid Option...")
      continue Initial_update_loop;
    }
    let temp_title = prompt("Enter a name of title to update:");
    const IsTitleValid = is_title_valid(temp_title);

    if (!IsTitleValid.status) {
      console.log(IsTitleValid?.message);
      continue Initial_update_loop;
    }

    const istitleexist = is_title_exist(List_todo, temp_title);
    if (istitleexist.status) {
      // console.log(istitleexist?.message);
      let update_data = { update_index: null };
      List_todo.map((todo) => {
        if (todo["title"] === temp_title) update_data.update_index = todo?.id;
      });
      console.log("1.Title\t2.Status");
      let update_key = prompt("Choose Which one to update:");

      if (typeof update_key !== "string" && typeof update_key !== "boolean") {
        console.log("Enter key is invalid. Retry...!");
        continue Initial_update_loop;
      }
      // first choose the key to update then seperate prompt for data entry
      if (update_key.trim() && update_key.toLowerCase() === "status") {
        let update_content = prompt("Is the Task Completed (Yes/No):");
        if (
          update_content.toLowerCase() !== "yes" &&
          update_content.toLowerCase() !== "no"
        ) {
          console.log(update_content.toLowerCase());
          console.log("Incorrect Type: Only accept data Yes/No...");
          continue Initial_update_loop;
        }
        // console.log()
        update_data.update_body = {
          completed: update_content.toLowerCase() === "yes" ? true : false,
        };
      } else if (update_key.trim() && update_key.toLowerCase() === "title") {
        let update_content = prompt("Enter the value of Title:");

        const istitleValid = is_title_valid(update_content);
        if (!istitleValid.status) {
          console.log(istitleValid.message);
          continue Initial_update_loop;
        }

        const istitleexist = is_title_exist(List_todo, update_content);
        if (istitleexist.status) {
          console.log(istitleexist.message);
          continue Initial_update_loop;
        }
        update_data.update_body = { title: update_content };
      } else {
        console.log("Invalid Key value. Try again...");
        continue Initial_update_loop;
      }

      return update_data;
    } else {
      console.log("No Existing Title find...");
      continue Initial_update_loop;
    }
  }
}

function delete_task(List_todo){

  main_loop:while(true){
      console.log("===============================================")
    console.log('1.Delete\t2.Exit')
    console.log("===============================================")
    let entry_option = prompt("Enter any one option from above:")

    if(entry_option === "2" || entry_option === "1"){
      if(entry_option === "2"){
      break;
      }
    }else{
      console.log("Invalid Option...")
      continue main_loop;
    }

     let temp_title = prompt("Enter a name of title to delete:");
    const IsTitleValid = is_title_valid(temp_title);
    var todo_delete = {delete_index:null, delete_id:null};

    if (!IsTitleValid.status) {
      console.log(IsTitleValid?.message);
      continue main_loop;
    }

     const istitleexist = is_title_exist(List_todo, temp_title);

      if (!istitleexist.status) {
          console.log("Data not found");
          continue main_loop;
        }

      List_todo.map((todo, index) => {
        if (todo["title"] === temp_title){todo_delete.delete_id = todo?.id; todo_delete.delete_index = index};
      });
      
      return todo_delete;
  }

}



function is_title_valid(title) {
  let result = { message: "", status: true };
  if (typeof title === "string") {
    if (!title.trim()) {
      result.message = "Give Atleast one input";
      result.status = false;
      return result;
    }
  } else {
    result.message = "Invalid Error: Enter Texts only...";
    result.status = false;
    return result;
  }

  return result;
}

function is_title_exist(todo_list, title) {
  let result = { message: "", status: false };

  let isTitleExist = false
  todo_list.map((todo) => {if(todo["title"] === title) {
    isTitleExist = true
    console.log(`Compare data Title: ${title}`)
    console.log("Compared with:")
    console.log(todo_list);
  };});
  if (isTitleExist) {
    result.message = "Title Already Exist. Use new One";
    result.status = true;
    return result;
  }
  return result;
}

function show_all_list(List_Todo) {
  console.log("Todo List");
  console.log("=================================");
  List_Todo.map((todo) =>
    console.log(
      `TodoId: ${todo?.id} | Title: ${todo?.title} | Status: ${
        todo?.completed ? "Completed" : "Pending"
      }`
    )
  );
  console.log("=================================");
}

main_controller_todolist();
