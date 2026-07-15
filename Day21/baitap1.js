const members = [
  { id: 1, name: "Minh Tran", email: "minh@example.com" },
  { id: 2, name: "Lan Pham", email: "lan@example.com" },
  { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
  { id: 4, name: "Trang Le", email: "trang@example.com" },
  { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
  { id: 201, title: "Clean Code", finePerDay: 5000 },
  { id: 202, title: "Atomic Habits", finePerDay: 3000 },
  { id: 203, title: "Sapiens", finePerDay: 4000 },
  { id: 204, title: "Deep Work", finePerDay: 2000 },
  { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
  {
    id: 3001,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 2 },
      { bookId: 202, lateDays: 0 },
    ],
  },
  {
    id: 3002,
    memberId: 2,
    lines: [
      { bookId: 202, lateDays: 1 },
      { bookId: 203, lateDays: 3 },
    ],
  },
  {
    id: 3003,
    memberId: 3,
    lines: [
      { bookId: 204, lateDays: 5 },
      { bookId: 205, lateDays: 2 },
    ],
  },
  {
    id: 3004,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 203, lateDays: 2 },
    ],
  },
  {
    id: 3005,
    memberId: 5,
    lines: [{ bookId: 205, lateDays: 10 }],
  },
  {
    id: 3006,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 205, lateDays: 3 },
    ],
  },
  {
    id: 3007,
    memberId: 2,
    lines: [
      { bookId: 204, lateDays: 2 },
      { bookId: 203, lateDays: 1 },
    ],
  },
  {
    id: 3008,
    memberId: 3,
    lines: [{ bookId: 202, lateDays: 2 }],
  },
  {
    id: 3009,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 202, lateDays: 1 },
    ],
  },
  {
    id: 3010,
    memberId: 5,
    lines: [
      { bookId: 203, lateDays: 4 },
      { bookId: 204, lateDays: 3 },
    ],
  },
];

function calculateTotalFine(borrow) {
  return borrow.lines.reduce((sum, line) => {
    const book = books.find((book) => line.bookId === book.id);
    return book ? sum + book.finePerDay * line.lateDays : sum;
  }, 0);
}

function combineBook(...lineArr) {
  const newArr = [];
  lineArr.forEach((lines) => {
    if (!books) return;
    lines.forEach((line) => {
      const existingBook = newArr.find((newLine) => {
        return line.bookId === newLine.bookId;
      });
      if (!existingBook) {
        newArr.push({
          bookId: line.bookId,
          lateDays: line.lateDays,
        });
      } else {
        existingBook.lateDays += line.lateDays;
      }
    });
  });
  return newArr
    .map((line) => {
      const book = books.find((b) => b.id === line.bookId);
      return {
        title: book ? book.title : "Unknown",
        lateDays: line.lateDays,
        fine: book ? line.lateDays * book.finePerDay : 0,
      };
    })
    .sort((a, b) => b.fine - a.fine);
}

function filterBorrowByMemberId(memberId) {
  return borrowRecords.filter(
    (borrow) =>
      borrow &&
      borrow.memberId === memberId &&
      Object.prototype.hasOwnProperty.call(borrow, "lines"),
  );
}
function getMemberFineStatistics(members, books, borrowRecords) {
  const result = members.map((member) => {
    const memberObj = {
      id: member.id,
      name: member.name,
      totalFine: filterBorrowByMemberId(member.id).reduce(
        (total, borrow) => total + calculateTotalFine(borrow),
        0,
      ),
      books: combineBook(
        ...filterBorrowByMemberId(member.id).map((borrow) => borrow.lines),
      ),
    };
    return Object.freeze(memberObj);
  });
  result.sort((a, b) => b.totalFine - a.totalFine);
  return Object.freeze(result);
}

function MemberPaginator(resultList, soLuongMoiTrang) {
  const pageSize = soLuongMoiTrang <= 0 ? 1 : soLuongMoiTrang;
  return {
    [Symbol.iterator]() {
      let index = 0;
      return {
        next() {
          if (index < resultList.length) {
            const pageData = resultList.slice(index, index + pageSize);
            index += pageSize;
            return {
              value: pageData,
              done: false,
            };
          }
          return {
            value: undefined,
            done: true,
          };
        },
      };
    },
  };
}

console.log("--- KẾT QUẢ THỐNG KÊ CHI TIẾT ---");
const result = getMemberFineStatistics(members, books, borrowRecords);
console.log(JSON.stringify(result, null, 2));


console.log("\n--- TEST CASE 9: KIỂM TRA ĐÓNG BĂNG KẾT QUẢ (TÍNH BẤT BIẾN) ---");
try {
  result[0].totalFine = 999999; // Cố tình thay đổi giá trị
  result[0].extraField = "hack"; // Cố tình thêm thuộc tính mới
  console.log("Giá trị totalFine sau khi sửa:", result[0].totalFine); // Giữ nguyên giá trị ban đầu
  console.log("Thuộc tính extraField thêm mới:", result[0].extraField); // Trả về undefined (Không thêm được)
} catch (error) {
  console.log("Thông báo lỗi hệ thống (strict mode):", error.message);
}


console.log("\n--- TEST CASE 10: BORROW RECORD THIẾU THUỘC TÍNH LINES RIÊNG (PROTOTYPE LẬU) ---");
const brokenRecord = Object.create({ lines: [{ bookId: 201, lateDays: 5 }] }); // 'lines' nằm ở Prototype
brokenRecord.id = 3099;
brokenRecord.memberId = 1;

// Đưa bản ghi lỗi vào hệ thống xem Minh Tran có bị cộng dồn phạt oan hay không
const testRecordsWithBroken = [...borrowRecords, brokenRecord];
const finalWithBroken = getMemberFineStatistics(members, books, testRecordsWithBroken);
console.log("Phạt của Minh Tran khi dính lỗi:", finalWithBroken.find(m => m.id === 1).totalFine); // Vẫn giữ nguyên 34000 (An toàn)


console.log("\n--- TEST CASE 11: DUYỆT PHÂN TRANG KẾT QUẢ VỚI VÒNG LẶP FOR...OF ---");
const paginator = MemberPaginator(result, 2); // Mỗi trang chứa tối đa 2 thành viên
let pageNum = 1;
console.log(paginator);


for (const page of paginator) {
  console.log(`Trang ${pageNum}:`, page.map(m => m.name));
  pageNum++;
}
