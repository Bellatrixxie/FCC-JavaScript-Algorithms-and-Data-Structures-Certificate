// 
// *FREECODECAMP JAVASCRIPT ALGORITHMS AND DATA STRUCTURES CERTIFICATE - PROJECT 5*
//
// *CASH REGISTER*
//
// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
//payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
//or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, 
//sorted in highest to lowest order, as the value of the change key.

// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (ONE)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)
// See below for an example of a cash-in-drawer array:

// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]


function checkCashRegister(price, cash, cid) {

    const conversion = [
        ["ONE HUNDRED", 100], 
        ["TWENTY", 20], 
        ["TEN", 10], 
        ["FIVE", 5], 
        ["ONE", 1], 
        ["QUARTER", 0.25], 
        ["DIME", 0.1], 
        ["NICKEL", 0.05], 
        ["PENNY", 0.01]];
  
    let changeDue = cash - price;
    let totalCid = Math.round(100*(cid.map(z => z[1]).reduce((acc, a) => acc + a)))/100;
    let status;
    let change = [];
    let remainder;
    let unitChange;
    let unitDiff;
    let unitDrawer;
  
    for (let i = 0; i < conversion.length; i++) {
  // Check if changeDue is greater than each unit.
      changeDue = Math.round(100*(changeDue))/100;
      remainder = Math.round(100*(changeDue % conversion[i][1]))/100;
      unitChange = Math.round(100*(changeDue - remainder))/100;
      unitDrawer = cid[cid.length-1-i][1];
      unitDiff = unitChange - unitDrawer;
        console.log(changeDue)
         console.log(remainder)
         console.log(unitChange)
      if (unitChange > 0 && changeDue > remainder) {
  // Check if enough of that unit in drawer.
        if (unitDiff <= 0) {
  // If so, remove from cid and push into change array.
          change.push([conversion[i][0], unitChange])
          changeDue -= unitChange;
        } else if (unitDiff === unitChange) {
        } else {
  // If not, clear the drawer of that unit, push into change array and add the rest to remainder.
          change.push([conversion[i][0], unitDrawer]);
          changeDue -= unitDrawer;
        }
      } 
    }
  
    if (totalCid === (cash - price)) {
      status = "CLOSED";
      change = cid;
    } else if (changeDue === 0 && totalCid > (cash - price)) {
      status = "OPEN";
    } else if (changeDue > 0) {
      status = "INSUFFICIENT_FUNDS";
      change = [];
    }
    return {
      status: status,
      change: change,
    };
  }
  console.log(checkCashRegister(19.5, 20, 
    [
        ["PENNY", 0.01], 
        ["NICKEL", 0], 
        ["DIME", 0], 
        ["QUARTER", 0], 
        ["ONE", 0], 
        ["FIVE", 0], 
        ["TEN", 0], 
        ["TWENTY", 0], 
        ["ONE HUNDRED", 0]
    ])
  );

// Tests:
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//should return an object.
//
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
//
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
//["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], 
//["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
//
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
//["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//should return {status: "INSUFFICIENT_FUNDS", change: []}.
//
// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
//["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//should return {status: "INSUFFICIENT_FUNDS", change: []}.
//
// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
//["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
//should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
//["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
