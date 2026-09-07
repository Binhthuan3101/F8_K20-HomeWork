import React from "react";
const FaqAccordion = ({ faqData, onSelectFaq }) => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      {faqData && faqData.length > 0 ? (
        faqData.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded font-semibold">
                {item.category}
              </span>
              {item.isHot && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-semibold">
                  <i className="fa-solid fa-fire"></i> Hot
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              {item.question}
            </h4>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {item.answer}
            </p>
            <button onClick={()=>onSelectFaq(item.id)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors">
              Xem chi tiết
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">Không có câu hỏi FAQ nào.</p>
      )}
    </div>
  );
};

export default FaqAccordion;
