

class InvalidTypeError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = "InvalidTypeError";
    this.field = field;
  }
}

class OutOfRangeError extends Error {
  constructor(message, value = null) {
    super(message);
    this.name = "OutOfRangeError";
    this.value = value;
  }
}

class InvalidEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidEmailError";
  }
}

class WeakPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "WeakPasswordError";
  }
}

function registerUser(userData) {
  // kiểm tra tham số truyền vào có phải 1 Object không
  if (!userData || typeof userData !== "object" || Array.isArray(userData)) {
    throw new InvalidTypeError("Tham số truyền vào bắt buộc là một Object.");
  }
  const { username, age, email, password } = userData;
  // 2. Kiểm tra kiểu dữ liệu
  if (typeof username !== "string") {
    throw new InvalidTypeError(
      "Tên người dùng (username) phải là kiểu string",
      "username",
    );
  }
  if (typeof age !== "number") {
    throw new InvalidTypeError("Số tuổi(age) phải là kiểu number.", "age");
  }
  //Kiểm tra age có nằm ngoài khoảng hợp lệ
  if (age < 13 || age > 120) {
    throw new OutOfRangeError(
      `Độ tuổi ${age} vượt quá giới hạn đăng ký quy định.`,
      age,
    );
  }
  // kiểm tra email đúng chưa
  if (!email.includes("@")) {
    throw new InvalidEmailError(
      "Địa chỉ email đăng ký không hợp lệ (Thiếu ký tự '@)'.",
    );
  }
  // kiểm tra password ít tối thiếu 8 ký tự không
  if (password.length < 8) {
    throw new WeakPasswordError(
      "Mật khẩu quá yếu (Độ dài tối thiểu là 8 ký tự).",
    );
  }
  return {
    success: true,
    message: "Đăng ký thành công",
  };
}

// Khối lệnh chạy thử và bắt lỗi
function runTest(testId, action) {
  console.log("========Test Case=======");
  try {
    const response = action();
    if (response) {
      console.log("Kết quả:", response);
    }
  } catch (error) {
      if (error instanceof InvalidTypeError) {
          console.error(`[Bắt được lỗi]: Lỗi sai kiểu dữ liệu | Nội dung: ${error.message}`);
      } else if (error instanceof OutOfRangeError) {
          console.error(`[Bắt được lỗi]: Lỗi sai vượt phạm vi | Nội dung: ${error.message}`);
          
      } else if (error instanceof InvalidEmailError) {
          console.error(`[Bắt được lỗi]: Lỗi email không hợp lệ | Nội dung: ${error.message} `);
          
      } else if (error instanceof WeakPasswordError) {
          console.error(`[Bắt được lỗi]: Lỗi mật khẩu quá ngắn | Nội dung: ${error.message}`);
          
      } else {
          console.error(`[Bắt được lỗi]: Lỗi không xác định | Nội dung: ${Error.message}`);
          
      }
  } finally {
    console.log("Quá trình xử lý đăng ký đã kết thúc.");
  }
}

// Test case 1: Không truyền dữ liệu
runTest(1, () => registerUser());

// Test case 2: Sai kiểu dữ liệu username
runTest(2, () => registerUser({ username: 123, age: 20, email: "a@b.com", password: "12345678" }));

// Test case 3: Tuổi nhỏ hơn 13
runTest(3, () => registerUser({ username: "an", age: 8, email: "a@b.com", password: "12345678" }));

// Test case 4: Email thiếu ký tự @
runTest(4, () => registerUser({ username: "an", age: 20, email: "abgmail.com", password: "12345678" }));

// Test case 5: Mật khẩu dưới 8 ký tự
runTest(5, () => registerUser({ username: "an", age: 20, email: "a@b.com", password: "123" }));

// Test case 6: Đăng ký thành công dữ liệu chuẩn
runTest(6, () => registerUser({ username: "an", age: 20, email: "a@b.com", password: "12345678" }));