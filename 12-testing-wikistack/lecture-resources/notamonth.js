function NotAMonth(message) {
   this.message = message;
   this.name = "NotAMonth";
}

function NotAMonth(message) {
   this.message = message;
   this.name = "NotAMonth";
}

function NotEvenANumber(message) {
   this.message = message;
   this.name = "NotANumber";
}

function intToMonth(n) {
   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (n >= 1 && n <= 12) {
    return months[n-1]; // offset by 1 to account for 0 indexing
  } else if (parseInt(n, 10)) {
    throw new NotAMonth("Not a month, you serious bozo");
  } else {
    throw new NotEvenANumber("cmon son");
  }
}

module.exports = intToMonth;

// try something that might fail
var monthName;

try {
   var myMonth = 'a';
   monthName = intToMonth(myMonth);
} catch (e) {
  // recover inside catch!   
   if (e.name === "NotAMonth") {
     monthName = "unknown";
     console.error(e.message, e.name); // pass exception object to err handler
   } else {
      throw new Error(e);
   }
}
// contine with program if no exception or exception was caught
console.log(monthName);