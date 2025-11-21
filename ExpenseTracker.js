const prompt = require("prompt-sync")();
const Validtor = require('./validators.js');


function Expense_Entity(title,category,amount){


          Date_Extract = new Date();
          
            this.title = title;
            this.date = `${Date_Extract.getFullYear()}-${Date_Extract.getMonth()}-${Date_Extract.getDate()}`;;
            this.category = category;
            this.amount = amount;
          
  
}

function show_Expenses(expenses){

  console.log(` S.No | Title | Category | amount | Date`);
  console.log('------------------------------------------');
  expenses.forEach((expense, index)=>{
    console.log(`${index} | ${expense.title} | ${expense.category} | ${expense.amount} | ${expense.date}`);
  })
  console.log('------------------------------------------');

}


function sample_debugger(flow, content, data) {
  return ` Debug: [${flow}] ${content} :- ${data}`;
}
// Expanse tracker with category , amont and date

function isvalid_number(validate_number) {
  const regex_valid_number = /^[0-9]+$/;

  const result = { status: false, message: "" };

  if (!validate_number.trim()) {
    result.status = false;
    result.message = "Invalid Entry...";
    return result;
  }

  const isvalid = regex_valid_number.test(validate_number);
  result.status = isvalid;
  result.message = !isvalid ? "Type Error: Accept number type only..." : "";

  console.log(
    `Debug: [Choice Validation flow] choice validation return result : {${JSON.stringify(
      result
    )}} `
  );
  return result;
}

function is_valid_inputs(user_input){

  console.log('Validate expense input passed data : '+ JSON.stringify(user_input));
  
  for (const key in JSON.stringify(user_input)) {
     if ((typeof key === 'string' && user_input[key]?.trim()?.length > 0) || (typeof key === "number" && user_input[key] > 0)){
      result =  true
     }else{
      result = false;
     }
    
  }
  return result;
}


function create_expense() {
  const user_input = {
    title:'',
    category:'',
    amount:0
  }
  
  main_loop:while(true){
    for (const key in user_input) {
      console.log(`Current key(${key}) : value(${user_input[key]})`);
      
      if ((typeof key === 'string' && !user_input[key]) || (typeof key === "number" && user_input[key] < 0)){ 
      const prompt_input = prompt(`Enter ${key} :`)
      user_input[key] = typeof key === "number" ? Number(prompt_input) : prompt_input;
      }
    }

    const terminator = is_valid_inputs(user_input)
    if(terminator) break main_loop;
  }

  const new_expense = new Expense_Entity(...user_input)
    console.log('Created Expense Object:'+ JSON.stringify(new_expense));
    const Js_validator = new Validtor()
   const is_valid_expense =  Js_validator.expense_validator(JSON.stringify(new_expense))
   if(is_valid_expense.isvalid === false){
    sample_debugger("Create Expense Validation",'Invalid Expense Data',is_valid_expense.message)
    return null
   }
    return new_expense;
    
}

function main_controller() {
  const expense_data = [];


  // run the application state in loop until close
  main_loop: while (true) {
    // Features in Expanse tracker application
    console.log("============================================================");
    console.log(
      "1.Added Expense\t2.ShowAll Expenses\t3.Search Expense\t4.Update Expense\t5.Delete Expense\t6.Exit"
    );

    let selected_feature = prompt("Choose any one option from above");

    // validate for only number
    const isvalid_choice = isvalid_number(selected_feature);

    if (!isvalid_choice.status) {
      console.log(
        sample_debugger(
          "Main Controller",
          " choice validation status valid entry check",
          isvalid_choice
        )
      );
      console.log(isvalid_choice.message);
      continue main_loop;
    }
    console.log(
      sample_debugger(
        "Main Controller",
        " selected choice type check",
        typeof Number(selected_feature)
      )
    );
    switch (Number(selected_feature)) {
      case 1:
        
        const create_expense_response = create_expense();
        if(create_expense_response !== null){
          expense_data.push(create_expense_response);
          sample_debugger('Add Expense',"Expense added Successfully", create_expense_response);
          console.log(expense_data);
        }
        continue main_loop;
      case 2:
        console.log('Expense Record:');
        show_Expenses(expense_data);
        continue main_loop;
      case 6:
        console.log("Existing App");
        break main_loop;
      default:
        console.log("Invalid Choice...");
        continue main_loop;
    }
  }
}

// start Application
main_controller();
