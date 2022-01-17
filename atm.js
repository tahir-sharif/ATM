// HTML Elements (INPUT)
let inputAmount = document.querySelector('.amount')
let inputPreferredChoice = document.querySelector('.preferredChoice')
let inputchoicedNoteQuantity = document.querySelector('.choicedNoteQuantity')
// HTML Elements (OUTPUT)
let totalAmount = document.querySelector('.totalAmount')
let outputAmounts = document.querySelector('.outputQuantity')
// Basic Settings
let withdrawLimit = 100000;
let money = [5000, 1000, 500, 100, 50, 20, 10, 5, 2, 1]
// Money Object which Available in Machine
let notesInObj = {
    fiveThousands: 0, thousand: 0, fivehundreds: 0, hundred: 0, fifty: 0, twenty: 0, ten: 0, fiveRupeesCoin: 0, twoRupeesCoin: 0, oneRupeesCoin: 0,
}
// Above Object used in this object , it also contains ADD & DELETE function()
let moneyToWithdraw = {
    ...notesInObj,
    add: function (amountToAdd) {
        switch (+amountToAdd) {
            case 5000:
                this.fiveThousands += 1; break;
            case 1000:
                this.thousand += 1; break;
            case 500:
                this.fivehundreds += 1; break;
            case 100:
                this.hundred += 1; break;
            case 50:
                this.fifty += 1; break;
            case 20:
                this.twenty += 1; break;
            case 10:
                this.ten += 1; break;
            case 5:
                this.fiveRupeesCoin += 1; break;
            case 2:
                this.twoRupeesCoin += 1; break;
            case 1:
                this.oneRupeesCoin += 1; break;
            default: break;
        }
    },
    reset: function () { moneyToWithdraw = { ...moneyToWithdraw, ...notesInObj } }
}
// MAIN DISTRIBUTING FUNCTION
let moneyDistributor = (amount) => {
    let remainingAmount = amount;
    let choicedNote = +inputPreferredChoice.value
    let choicedNoteQuantity = choicedNote ?
        +inputchoicedNoteQuantity.value <= 200 ? +inputchoicedNoteQuantity.value : 200
        : 0

    while (remainingAmount !== 0) { //while amount not equal to 0 do subtract
        pickedMoneyToThrow = money.filter(note => {
            if (choicedNote && choicedNote <= amount && (choicedNote - remainingAmount) < !0 && choicedNoteQuantity) {
                return note === choicedNote
            } else { return note <= remainingAmount }
        });
        pickedMoneyToThrow = Math.max(...pickedMoneyToThrow);
        remainingAmount -= pickedMoneyToThrow; // subtract largest note from Avialable Notes
        moneyToWithdraw.add(pickedMoneyToThrow);
        choicedNoteQuantity && choicedNoteQuantity--
    }
    renderOnPage(amount); // Render Result on Page
};
// Main FunctionsController !
let doDistribute = () => {
    const amount = Math.round(+inputAmount.value)
    amount > 0 ?
        amount <= withdrawLimit ? moneyDistributor(amount) : alert(`you Can't withDraw upto ${limit.toLocaleString()} Rupees !`)
        : alert('Not a Valid Amount')
}
// Renders Output On Page
let renderOnPage = (amount) => {
    outputAmounts.innerHTML = ''
    totalAmount.innerText = amount.toLocaleString();
    const arr = []
    const { fiveThousands, thousand, fivehundreds, hundred, fifty, twenty, ten, fiveRupeesCoin, twoRupeesCoin, oneRupeesCoin } = moneyToWithdraw;
    arr.push(fiveThousands, thousand, fivehundreds, hundred, fifty, twenty, ten, fiveRupeesCoin, twoRupeesCoin, oneRupeesCoin)
    arr.forEach((amount, i) => {
        if (+amount) {
            const p = document.createElement('p')
            p.innerText = `${money[i]} : ${amount} => ${money[i] * amount}/=`
            outputAmounts.appendChild(p)
        }
    })
    moneyToWithdraw.reset();
}