// Banking Managing System
// Features:
// 1.Deposite
// 2.WithDrawal
// 3.Check Balance


// 1. Create a User Bank Account Object
function UserAccount(user_name,Balance=0){ // Constructor function
    this.user_name = user_name;
    this.Balance = Number(Balance?.toFixed(2));
}

 // get user index
    function Identify_user(user_detail,user_accounts){
        let result = user_accounts?.findIndex(user => user['user_name'] === user_detail)
        if(result !== null){
            return {result}
        }else{
            return null;
        }
    }

class Banking_Service{

    Accounts_Management = [];
    user_identification = null;

    // 1.Add Accoount
    add_account(...account_details){
        // console.log(`Passed User Details: ${account_details}`);
        
        const user_account = new UserAccount(...account_details)
        this.user_identification = new Identify_user(user_account.user_name,  this.Accounts_Management);
        if(this.user_identification.result >= 0){ console.log("User name already Exist. Try Different one..."); 
            return;
        }
        this.Accounts_Management.push({id:this.Accounts_Management.length + 1,...user_account})
        console.log(`User Account ${JSON.stringify(user_account.user_name)} created!.`);
    }

    // 2.Deposite Amount
    Deposite(user_detail,Deposite_amount) {
        this.user_identification = new Identify_user(user_detail,this.Accounts_Management);
        //   console.log(`user Search result: ${ JSON.stringify(this.user_identification)}`);
          if(this.user_identification.result === -1){ console.log("user Not found"); 
            return;
        }
        this.Accounts_Management[this.user_identification.result].Balance +=  Deposite_amount;

        console.log(`Deposited Amount: ${Deposite_amount}`);
        console.log(`Balance Amount: ${this.Accounts_Management[this.user_identification.result].Balance}`);
        console.log(`Updated User details :`);
        console.log('==========================================================================================');
        console.log(this.Accounts_Management[this.user_identification.result]);
    }

    // 3.WithDraw Amount
    WithDraw_Amount(user_detail,withDraw_amount){
        this.user_identification = new Identify_user(user_detail,  this.Accounts_Management);
        if(this.user_identification.result === -1){ console.log("user Not found"); 
            return;
        }
        this.Accounts_Management[this.user_identification.result].Balance -=  withDraw_amount;

        console.log(`Withdrawn Amount: ${withDraw_amount}`);
        console.log(`Balance Amount: ${this.Accounts_Management[this.user_identification.result].Balance}`);
        console.log(`Updated User details :`);
        console.log('==========================================================================================');
        console.log(this.Accounts_Management[this.user_identification.result]);
        
    }

    // 4. Check Balanace 
    check_Balance(user_detail){
        this.user_identification = new Identify_user(user_detail,  this.Accounts_Management);
          if(this.user_identification.result === -1){ console.log("user Not found"); 
            return;
        }
        console.log(`Balance Amount: ${this.Accounts_Management[this.user_identification.result].Balance}`);
    }

    // See all users 
    get_all_users(){
        console.log('Users table:');
        console.log("---------------------------------------------------------------------------------------------");
        console.log('S/No : Name : Balance');
        console.log("---------------------------------------------------------------------------------------------");
        this.Accounts_Management.forEach(user=> console.log(`${user.id} : ${user.user_name} : ${user.Balance}`))
        console.log("---------------------------------------------------------------------------------------------");
        return;
    }
    
    
}

const MyBank = new Banking_Service()
MyBank.add_account("Pandi",2000)
MyBank.add_account("Esakki",30)
MyBank.Deposite("Pandi",200)
MyBank.WithDraw_Amount("Pandi",1000)
MyBank.Deposite("Praveen",1000)
MyBank.add_account("Esakki",30)
MyBank.get_all_users()