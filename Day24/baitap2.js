class BankAccount {
  #balance;
  static totalMoney = 0;
  constructor(ownerName, balance) {
    if (typeof balance !== "number" || balance < 0) {
      throw new Error("Lỗi balance không phải kiểu number hoặc nhỏ hơn 0");
    }
    this.ownerName = ownerName;
    this.#balance = balance;
    BankAccount.totalMoney += balance;
  }

  get balance() {
    return this.#balance;
  }
  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error(`Số tiền nạp phải là một số và lớn hơn 0.`);
    }
    this.#balance += amount;
  }
  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error(`Số tiền rút phải là một số và lớn hơn 0.`);
    }
    if (amount > this.#balance) {
      throw new Error("số tiền rút không được quá số dư");
    }
    this.#balance -= amount;
  }
  toString() {
    return `Chủ tài khoản: ${this.name}
                Số dư: ${this.#balance}`;
  }
}
class SavingsAccount extends BankAccount {
  constructor(ownerName, balance, interestRate) {
    super(ownerName, balance);
    if (typeof interestRate !== "number" || interestRate < 0) {
      throw new Error("Lãi suất phải là kiểu số và phải lớn hơn 0");
    }
    this.interestRate = interestRate;
  }
  addInterest() {
    const interest = this.balance * this.interestRate;
    this.deposit(interest);
  }
  withdraw(amount) {
    if (amount > this.balance * 0.5) {
      throw new Error("Không được rút quá 50% số dư hiện tại trong 1 lần");
    }
    super.withdraw(amount);
  }
}


// --- Test Case 1 ---
console.log("\n[Test Case 1] Input: new BankAccount('An', -100);");
try {
    new BankAccount("An", -100);
} catch (error) {
    console.log("Ket qua thuc te:", error.message);
}

// Khởi tạo tài khoản An hợp lệ phục vụ cho TC2 và TC3
const accountAn = new BankAccount("An", 500000);

// --- Test Case 2 ---
console.log("\n[Test Case 2] Input: account.deposit('100');");
try {
    accountAn.deposit("100");
} catch (error) {
    console.log("Ket qua thuc te:", error.message);
    console.log(`So du hien tai van la: ${accountAn.balance}`);
}

// --- Test Case 3 ---
console.log("\n[Test Case 3] Input: account.withdraw(700000);");
try {
    accountAn.withdraw(700000);
} catch (error) {
    console.log("Ket qua thuc te:", error.message);
}

// --- Test Case 4 ---
console.log("\n[Test Case 4] Khoi tao tai khoan Binh 1,000,000d (Lai 5%) -> account.addInterest();");
const accountBinh4 = new SavingsAccount("Bình", 1000000, 0.05);
accountBinh4.addInterest();
console.log(`Ket qua thuc te -> So du moi: ${accountBinh4.balance}`);

// --- Test Case 5 ---
console.log("\n[Test Case 5] Khoi tao tai khoan Binh moi 1,000,000d -> account.withdraw(600000);");
try {
    const accountBinh5 = new SavingsAccount("Bình", 1000000, 0.05);
    accountBinh5.withdraw(600000);
} catch (error) {
    console.log("Ket qua thuc te:", error.message);
}

// --- Test Case 6 ---
console.log("\n[Test Case 6] Khoi tao tai khoan Binh moi 1,000,000d -> account.withdraw(400000);");
try {
    const accountBinh6 = new SavingsAccount("Bình", 1000000, 0.05);
    accountBinh6.withdraw(400000);
    console.log(`Ket qua thuc te -> Rut thanh cong. So du con: ${accountBinh6.balance}`);
} catch (error) {
    console.log("Loi xay ra:", error.message);
}

// --- Test Case 7 ---
console.log("\n[Test Case 7] Input: console.log(BankAccount.totalMoney);");
console.log(`Ket qua thuc te -> Tong tien he thong: ${BankAccount.totalMoney}`);
console.log("\n==================================================");

console.log(BankAccount.totalMoney);
