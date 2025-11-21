class JS_Validator{


   expense_validator(validate_expense) {

    function sample_debugger(flow, content, data) {
  return ` Debug: [${flow}] ${content} :- ${data}`;
}

  const validation_expense = [
    {
      key: "title",
      type: "string",
    },
    {
      key: "category",
      type: "string",
    },
    {
      key: "amount",
      type: "number",
    },
    {
      key: "date",
      type: "string",
    },
  ];

  const validate_result = {
    isvalid: null,
    message: "",
  };
  function is_correct_type_match(field, validator, validate) {
    if (validator !== validate) {
      validate_result.isvalid = false;
      validate_result.message = `Mismatch type ${field}`;
      console.log(
        sample_debugger(
          "Expense Validation flow",
          " check expense mismatch check",
          `${field} of type : ${validator} for type : ${validate}`
        )
      );
    }else{
        console.log(`Field ${field} match ${validator} == ${validate}`)
    }
  }

  console.log(
    sample_debugger(
      "Expense Validation flow",
      " check expense data entered ",
      JSON.stringify(validate_expense)
    )
  );
  main_expense_valid_loop: for (let expense in validate_expense) {
    validation_expense.map((local_data) => {

      sub_main_loop: if (local_data.key === expense) {
        console.log(
          sample_debugger(
            "Expense Validation flow",
            " check expense object return data",
            JSON.stringify(validate_expense[expense])
          )
        );


        const temp_type = typeof validate_expense[expense];
        const locat_type = local_data.type;

        switch_loop:switch (temp_type) {
          case "string":
            const is_valid_string = validate_expense[expense].trim();
            if (!is_valid_string) {
              validate_result.isvalid = false;
              validate_result.message = `Required field ${expense}, No empty field allowed...`;
              break switch_loop;
            }
            is_correct_type_match(expense, temp_type, locat_type);
            break switch_loop;
          case "number":
             const is_valid_nubmer = validate_expense[expense];
            if (!is_valid_nubmer){
              validate_result.isvalid = false;
              validate_result.message = `Required field ${expense}, No empty field allowed...`;
              break switch_loop;
            }
            is_correct_type_match(expense, temp_type, locat_type);
            break switch_loop;
          default:
            console.log(`Invalid Field type : ${expense}`);
            break switch_loop;
        }

        if(validate_result.status !== null && validate_result.status === false) return validate_result; // terminate the loop
      }
    });
  }
  console.log(
    sample_debugger(
      "Expense Validation flow",
      " Final result check",
      JSON.stringify(validate_result)
    )
  );
  return validate_result;
}

}

module.exports = JS_Validator;