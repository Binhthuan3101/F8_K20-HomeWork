import { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Điều khoản sử dụng
        </h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Bằng việc nhấn nút "Đồng ý", bạn cam kết tuân thủ các quy định về bảo
          mật thông tin chính sách người dùng và quy tác dịch vụ của hệ thống.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Đóng
          </button>
          <button
            onClick={() => {
              alert("Cảm ơn bạn đã đồng ý điều khoản!");
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = "Modal";
export default Modal;
