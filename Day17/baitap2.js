const comments = [
  {
    id: 1,
    user: "An",
    content: "Sản phẩm rất tốt!",
    rating: 5,
    verified: true,
    likes: 12,
  },
  { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
  {
    id: 3,
    user: "Bình",
    content: "Mua lần 2 rồi, vẫn chất lượng",
    rating: 4,
    verified: true,
    likes: 8,
  },
  {
    id: 4,
    user: "Chi",
    content: "   ",
    rating: null,
    verified: false,
    likes: 2,
  },
  {
    id: 5,
    user: "Duy",
    content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!",
    rating: 5,
    verified: true,
    likes: 20,
  },
  {
    id: 6,
    user: null,
    content: "Tệ quá",
    rating: 1,
    verified: false,
    likes: 0,
  },
  {
    id: 7,
    user: "Em",
    content: "Bình thường",
    rating: 3,
    verified: true,
    likes: 1,
  },
];

function isValidComment(comment) {
  if (
    comment.user !== "" &&
    comment.user !== null &&
    comment.user !== undefined &&
    comment.content.trim().length >= 5 &&
    comment.rating >= 1 &&
    comment.rating <= 5
  ) {
    return true;
  }
  return false;
}

console.log(isValidComment(comments[0])); // true
console.log(isValidComment(comments[1])); // false  (user rỗng, content quá ngắn)
console.log(isValidComment(comments[3])); // false  (content chỉ có khoảng trắng, rating null)
console.log(isValidComment(comments[5])); // false (user null)

function filterValidComments(comments) {
  return comments.filter(isValidComment);
}

console.log(filterValidComments(comments));
// [comments[0], comments[2], comments[4], comments[6]]
// id: 1, 3, 5, 7

function getCommentStats(validComments) {
  if (!validComments || validComments.length === 0) {
    return {
      total: 0,
      avgRating: 0,
      totalLikes: 0,
      verifiedCount: 0,
      topComment: null,
    };
  }
  let total = validComments.length;
  let totalRating = 0;
  let totalLikes = 0;
  let verifiedCount = 0;
  let topComment = validComments[0];
  for (const comment of validComments) {
    totalRating += comment.rating;
    totalLikes += comment.likes;

    if (comment.verified === true) {
      verifiedCount++;
    }
    if (comment.likes > topComment.likes) {
      topComment = comment;
    }
  }
  const avgRating = Number((totalRating / total).toFixed(1));

  return {
    total: total,
    avgRating: avgRating,
    totalLikes: totalLikes,
    verifiedCount: verifiedCount,
    topComment: topComment,
  };
}

console.log(getCommentStats(filterValidComments(comments)));

function formatComment(comment) {
  let rating = "";
    let checkMark = comment.verified === true ? "✓" : "";
    let userName = comment.user ?? "Ẩn danh";
    for (let i = 0; i < comment.rating; i++) {
      rating += "⭐";
    }
  return rating.concat(` | ${userName}  ${checkMark} | ${comment.content} | 👍 ${comment.likes}`);
}
console.log(formatComment(comments[0]));
console.log(formatComment(comments[2]));
console.log(formatComment(comments[6]));
