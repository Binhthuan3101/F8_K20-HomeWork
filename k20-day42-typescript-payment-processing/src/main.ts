import { createPaymentProcessor, type PaymentProcessor } from "./processors";
import "./style.css";
import { findById, isPaymentRequest, type PaymentReceipt } from "./types";

const receiptsList: PaymentReceipt[] = [];

const paymentForm = document.querySelector<HTMLFormElement>("#payment-form");
const orderIdInput = document.querySelector<HTMLInputElement>("#order-id");
const amountInput = document.querySelector<HTMLInputElement>("#amount");
const methodSelect =
  document.querySelector<HTMLSelectElement>("#payment-method");

const formError = document.querySelector<HTMLDivElement>("#form-error");
const paymentResult = document.querySelector<HTMLDivElement>("#payment-result");
const receiptsContainer =
  document.querySelector<HTMLDivElement>("#receipts-list");

const searchForm = document.querySelector<HTMLFormElement>("#search-form");
const searchIdInput =
  document.querySelector<HTMLInputElement>("#search-receipt-id");
const searchResult = document.querySelector<HTMLDivElement>("#search-result");

if (
  !paymentForm ||
  !orderIdInput ||
  !amountInput ||
  !methodSelect ||
  !formError ||
  !paymentResult ||
  !receiptsContainer ||
  !searchForm ||
  !searchIdInput ||
  !searchResult
) {
  throw new Error("Không tìm thấy các phần tử DOM cần thiết trên trang");
}

function clearMessages() {
  formError.classList.add("hidden");
  formError.textContent = "";
  paymentResult.classList.add("hidden");
  paymentResult.innerHTML = "";
}

function getBadgeStyle(method: PaymentReceipt["method"]): string {
  switch (method) {
    case "COD":
      return "bg-amber-950 text-amber-300 border border-amber-800/60";
    case "BANK_TRANSFER":
      return "bg-blue-950 text-blue-300 border border-blue-800/60";
    case "E_WALLET":
      return "bg-purple-950 text-purple-300 border border-purple-800/60";
    default:
      return "bg-slate-800 text-slate-300 border border-slate-700";
  }
}

function renderReceipts() {
  if (receiptsList.length === 0) {
    receiptsContainer.innerHTML = `<p class="text-slate-500 italic text-center py-4">Chưa có biên nhận nào được tạo.</p>`;
    return;
  }
  receiptsContainer.innerHTML = receiptsList
    .map(
      (r) => `
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 transition hover:border-slate-700">
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold text-blue-400">Biên nhận #${r.id}</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeStyle(r.method)}">
          ${r.method}
        </span>
      </div>
      <div class="text-sm space-y-1 text-slate-300">
        <p><strong>Mã đơn hàng:</strong> #${r.orderId}</p>
        <p><strong>Số tiền:</strong> ${r.amount.toLocaleString("vi-VN")} VNĐ</p>
        <p class="text-slate-400 italic mt-2 text-xs border-t border-slate-900 pt-2">${r.message}</p>
      </div>
    </div>`,
    )
    .join("");
}

paymentForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  clearMessages();
  if (!(e.target instanceof HTMLFormElement)) return;

  const rawOrderId =
    orderIdInput.value.trim() === "" ? NaN : Number(orderIdInput.value);
  const rawAmount =
    amountInput.value.trim() === "" ? NaN : Number(amountInput.value);
  const rawMethod = methodSelect.value;

  const rawData: unknown = {
    orderId: rawOrderId,
    amount: rawAmount,
    method: rawMethod,
  };

  if (!isPaymentRequest(rawData)) {
    formError.classList.remove("hidden");
    formError.classList.add("block");
    formError.textContent =
      "Dữ liệu đơn hàng không hợp lệ! Mã đơn hàng phải là số nguyên dương, số tiền phải >0 và chọn phương thức thanh toán hợp lệ.";
    return;
  }
  try {
    const processor: PaymentProcessor = createPaymentProcessor(
      rawOrderId,
      rawAmount,
      rawMethod,
    );
    const result = processor.pay();

    if (result.status === "success") {
      paymentResult.classList.remove("hidden");
      paymentResult.classList.add("block");
      paymentResult.className =
        "p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-lg text-emerald-300 text-sm space-y-1 shadow-md block";
      paymentResult.innerHTML = `
        <div class="font-bold text-emerald-200 flex items-center gap-1.5">
            Thanh toán thành công!
        </div>
        <div>Mã biên nhận : <strong class="text-white">#${result.data.id}</strong></div>
        <div class="text-emerald-400/90 text-xs italic mt-1">${result.data.message}</div>
        `;
      receiptsList.unshift(result.data);
      renderReceipts();
      paymentForm.reset();
    } else {
      paymentResult.classList.remove("hidden");
      paymentResult.classList.add("block");
      paymentResult.className =
        "p-4 bg-red-950/80 border border-red-800/60 block rounded-lg text-red-300 text-sm shadow-md";
      paymentResult.textContent = `Lỗi: ${result.message}`;
    }
  } catch (error: unknown) {
    formError.classList.remove("hidden");
    formError.classList.add("block");
    formError.textContent =
      error instanceof Error ? error.message : "Đã có lỗi xảy ra.";
  }
});

searchForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  searchResult.classList.add("hidden");
  searchResult.classList.remove("block");
  searchResult.innerHTML = "";
  const searchId = Number(searchIdInput.value);
  if (isNaN(searchId) || searchId <= 0) {
    searchResult.classList.remove("hidden");
    searchResult.classList.add("block");
    searchResult.className =
      "p-4 bg-red-950/80 border block border-red-800/60 rounded-lg text-red-300 text-sm";
    searchResult.textContent = "Vui lòng nhập mã biên nhận là số nguyên dương.";
    return;
  }

  const found = findById<PaymentReceipt>(receiptsList, searchId);

  searchResult.classList.remove("hidden");
  searchResult.classList.add("block");

  if (found) {
    searchResult.className =
      "p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-lg text-emerald-300 text-sm space-y-1 shadow-md block";
    searchResult.innerHTML = `<div class="font-bold text-emerald-200">🔍 Tìm thấy biên nhận #${found.id}:</div>
      <div>• Đơn hàng: <strong class="text-white">#${found.orderId}</strong></div>
      <div>• Phương thức: <strong class="text-white">${found.method}</strong></div>
      <div>• Số tiền: <strong class="text-white">${found.amount.toLocaleString("vi-VN")} VNĐ</strong></div>
      <div class="text-emerald-400/90 text-xs italic mt-1">${found.message}</div>`;
  } else {
    searchResult.className =
      "p-4 bg-red-950/80 border border-red-800/60 rounded-lg text-red-300 text-sm block";
    searchResult.textContent = `Không tìm thấy biên nhận nào với mã ID ${searchId}.`;
  }
});

renderReceipts();
