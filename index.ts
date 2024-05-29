#! /usr/bin/env node
import inquirer from "inquirer";


// bank account interface
interface bank_account_interface{
    Balance: number;
    account_Number: number;
    withdraw_Balance(amount:number) :void;
    check_Balance (amount:number):void ;
    deposit_Balance (amount:number):void;
}



class bank_account_class implements bank_account_class{
    // debit var declaration
    public Balance:number;
    public account_Number:number;
    // constructor initializing
    constructor (Balance:number,account_Number:number){
        this.Balance = Balance;
        this.account_Number = account_Number;
    }

    // condition debit/withdraw
    withdraw_Balance (amount:number):void {
        if(this.Balance >= amount){
            this.Balance -= amount;
            console.log(`Withdrwal of $${amount} successful.
            your remaing balance is $${this.Balance}.`)
        }
        else{
            console.log(`Insufficient Balance.`)
        }
    }
    //  debit condition end



    // credit/deposit start  withdraw money
    deposit_Balance (amount:number):void {
        if(amount > 100){
            amount -= 1; // 1 doller fee charged if 100 + deposited
            this.account_Number == amount;
            console.log(`Deposit of $${amount} successfull. Remaing balance : $${this.Balance}`)
        }else if (amount <= 0){
            console.log(`insifficient balance`)
        }
    }
     

    // credit/ withdraw money end



    // check balance
    check_Balance ():void {
        console.log(`Current Balance $${this.Balance}`)
    }
    // check balance end

}


// creating  customers
// start
class Customer{
    public first_Name: string;
    public last_Name: string;
    public gender: string;
    public age: number;
    public mobile_Number: number;
    account: bank_account_class;

    // constructor
    constructor(first_Name: string, last_Name: string, gender: string ,age: number,mobile_Number: number,account: bank_account_class){
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.gender =  gender;
        this.age = age;
        this.mobile_Number = mobile_Number;
        this.account = account
    }
  
}

// create bank accounts
const accounts:bank_account_class[] = [
    new bank_account_class (500, 1001),
    new bank_account_class (1000, 1002),
    new bank_account_class (1500, 1003),
];
 
//customer var creating
const customers: Customer[] = [
    new Customer("Izma","Ikhlaque","Female",16,3105482613,accounts[0]),
    new Customer("Arham","Ikhlaque","male",16,3166546686,accounts[1]),
    new Customer("Arish","Ikhlaque","Female",16,3003246478,accounts[2]),
]


// function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name:"accountNumber",
                type:"number",
                message:"Enter your account number"
            }
        ]);

        // finding
        const customerr = customers.find(customer => customer.account.account_Number === accountNumberInput.accountNumber);
        if(customerr){
            console.log(`welcome, ${customerr.first_Name} ${customerr.last_Name}! \n`)
            const ans = await inquirer.prompt([
                {
                    name:"select",
                    type:"list",
                    message:"select an operation",
                    choices:["Deposit","Withdraw","Check Balance","Exit"]
                }
            ]);

            switch(ans.select){
                case "Deposit":
                    const depositammount = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"enter the amount to deposit"
                        }
                    ]);
                    customerr.account.deposit_Balance(depositammount.amount)
                    
                break;
                case "Withdraw":
                    const withdrawammount = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"enter the amount to withdraw"
                        }
                    ]);
                    customerr.account.withdraw_Balance(withdrawammount.amount)
                break;

                case "Check Balance":
                    customerr.account.check_Balance();
                break;

                case "Exit":
                    console.log("Exiting bank program...")
                    console.log("\n Thank you for using our bank services. Have a great day.")
                    return;
                break;

                }    

        }
        else {
            console.log("invalid account number. please try again.")
        }    

    } while (true)
}

service();


