const mainBlogContainer = document.querySelector(".main-blog-container");
const drawer = document.querySelector(".right-drawer");
const closeBtn = document.querySelector(".fa-x");
const responseCount = document.querySelector(".res");
const userImage = document.querySelector(".main-image");
const userFullname = document.querySelector(".comment-username");
const commentInput = document.querySelector(".write-thought");
const commentBtn = document.getElementById("res-btn");

//  ------------------------------------------
const BASEURL = `http://localhost:8080`;
// ----------------------------------------------

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});

const displayBlog = async (data) => {
  mainBlogContainer.innerHTML = null;
  responseCount.textContent = `Comment ${data.activity.total_comments}`;
  try {
    const blogSections = document.createElement("div");
    blogSections.classList.add("blog-sections");

    // Create blog-user-info
    const blogUserInfo = document.createElement("div");
    blogUserInfo.classList.add("blog-user-info");

    // Create blog-user
    const blogUser = document.createElement("div");
    blogUser.classList.add("blog-user");

    // Create h1 element
    const h1Element = document.createElement("h1");
    h1Element.textContent = data.title;

    // Create blog-user-section
    const blogUserSection = document.createElement("div");
    blogUserSection.classList.add("blog-user-section");

    // Create blog-user-image
    const blogUserImage = document.createElement("div");
    blogUserImage.classList.add("blog-user-image");

    // Create img element for the user image
    const userImage = document.createElement("img");
    userImage.src = data.author.personal_info.profile_img;
    userImage.alt = "user-image";

    // Create blog-user-details
    const blogUserDetails = document.createElement("div");
    blogUserDetails.classList.add("blog-user-details");

    // Create p elements for Username and Date
    const usernameP = document.createElement("p");
    usernameP.textContent = data.author.personal_info.username;

    const dateP = document.createElement("p");
    const publishedAt = "2023-11-08T15:43:21.247Z";
    const date = new Date(publishedAt);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    dateP.textContent = formattedDate;

    // Append elements to their respective parents
    blogUserImage.appendChild(userImage);
    blogUserDetails.appendChild(usernameP);
    blogUserDetails.appendChild(dateP);
    blogUserSection.appendChild(blogUserImage);
    blogUserSection.appendChild(blogUserDetails);
    blogUser.appendChild(h1Element);
    blogUser.appendChild(blogUserSection);
    blogUserInfo.appendChild(blogUser);

    // Create share-details
    const shareDetails = document.createElement("div");
    shareDetails.classList.add("share-details");

    // Create like-comment
    const likeComment = document.createElement("div");
    likeComment.classList.add("like-comment");

    // Create like icon
    const likeDiv = document.createElement("div");
    const likeIcon = document.createElement("i");
    likeIcon.setAttribute("class", "fa-solid fa-hands-clapping");

    // Create span for like count
    const likeCountSpan = document.createElement("span");
    likeCountSpan.textContent = data.activity.total_likes;

    likeDiv.append(likeIcon, likeCountSpan);

    // Create comment icon
    const commentDiv = document.createElement("div");
    const commentIcon = document.createElement("i");
    commentIcon.setAttribute("class", "fa-regular fa-comments");

    // Create span for comment count
    const commentCountSpan = document.createElement("span");
    commentCountSpan.textContent = data.activity.total_comments;
    commentDiv.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });

    commentDiv.append(commentIcon, commentCountSpan);

    // Append like and comment elements to like-comment

    likeComment.append(likeDiv, commentDiv);

    // Create share-listen
    const shareListen = document.createElement("div");
    shareListen.classList.add("share-listen");

    // Create listen icon
    const listeinDiv = document.createElement("div");
    const listenIcon = document.createElement("i");
    listenIcon.classList.add("fa-regular", "fa-circle-play");
    listeinDiv.append(listenIcon);

    // Create share icon
    const shareDiv = document.createElement("div");
    const shareIcon = document.createElement("i");
    shareIcon.classList.add("fa-solid", "fa-share-nodes");
    // shareListen.style.border = "1px solid black";
    shareListen.style.width = "10%";
    shareListen.style.display = "flex";
    shareListen.style.alignItems = "center";
    shareListen.style.justifyContent = "space-between";
    shareDiv.append(shareIcon);

    // Append listen and share icons to share-listen
    shareListen.append(listeinDiv, shareDiv);

    // Append like-comment and share-listen to share-details
    shareDetails.append(likeComment);
    shareDetails.append(shareListen);

    // Create user-blog
    const userBlog = document.createElement("div");
    userBlog.classList.add("user-blog");

    // Create blogImage
    const blogImage = document.createElement("div");
    blogImage.classList.add("blogImage");

    // Create img element for the blog image
    const blogImageElement = document.createElement("img");
    blogImageElement.src = data.banner;
    blogImageElement.alt = "";

    // Append blog image element to blogImage
    blogImage.appendChild(blogImageElement);

    // Create blog-content
    const blogContent = document.createElement("div");
    blogContent.classList.add("blog-content");

    // Create p element for blog content
    const blogContentP = document.createElement("p");
    blogContentP.textContent = data.content;

    listenIcon.addEventListener("click", () => {
      const contentToRead = data.content.join(" ");
      blogContent.innerHTML = ""; // Clear existing content
      blogContent.appendChild(blogContentP);

      // Read out loud
      readOutLoud(contentToRead);
    });

    function readOutLoud(text) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }

    // Append blog content to blogContent
    blogContent.appendChild(blogContentP);

    // Append blogImage and blogContent to user-blog
    userBlog.appendChild(blogImage);
    userBlog.appendChild(blogContent);

    // Append blogUserInfo, shareDetails, and userBlog to blogSections
    blogSections.appendChild(blogUserInfo);
    blogSections.appendChild(shareDetails);
    blogSections.appendChild(userBlog);
    mainBlogContainer.append(blogSections);
  } catch (error) {
    console.log(error);
  }
};

const getBlogById = async () => {
  try {
    const response = await fetch(`${BASEURL}/blog/getblog/${blogId}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    displayBlog(data);
  } catch (error) {
    console.log(error);
  }
};

getBlogById();

async function createComment(data) {
  try {
    const response = await fetch(`${BASEURL}/comment/create/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      getAllComment();
      getBlogById();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

commentBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let commentValue = commentInput.textContent;
  let userComment = {
    comment: commentValue,
  };
  createComment(userComment);
});

const displayBlogComment = async (data, authorId, blogId) => {
  try {
    const commentContainer = document.querySelector(".user-comment");
    commentContainer.addEventListener("click", (event) => {
      // Check if the clicked element is the "Reply" text
      if (event.target.classList.contains("reply-text")) {
        // Find the corresponding "Leave reply" section
        const leaveReplySection = event.target
          .closest(".comment-card")
          .querySelector(".leave-comment");

        // Toggle the display of the "Leave reply" section
        leaveReplySection.style.display =
          leaveReplySection.style.display === "none" ? "block" : "none";
      }
    });

    const blogComments = data.filter((comment) => comment.blog_id === blogId);

    commentContainer.innerHTML = null;
    blogComments.forEach(async (comment, index) => {
      const commentcard = document.createElement("div");
      commentcard.setAttribute("class", "comment-card");
      const commentdiv = document.createElement("div");
      commentdiv.setAttribute("class", "comment-user-image");
      const commentdivimg = document.createElement("div");
      const userProImg = document.createElement("img");
      userProImg.src = comment.commented_by.personal_info.profile_img;

      commentdivimg.append(userProImg);
      const commentUserName = document.createElement("div");
      commentUserName.setAttribute("class", "userName");
      const commentUser = document.createElement("p");
      commentUser.textContent = `${comment.commented_by.personal_info.fullname}@${comment.commented_by.personal_info.username}`;
      commentUserName.append(commentUser);
      const userCommnetDiv = document.createElement("div");
      userCommnetDiv.setAttribute("class", "user-comment-text");
      const userCommnetText = document.createElement("p");
      userCommnetText.textContent = comment.comment;
      userCommnetDiv.append(userCommnetText);

      const userReplyDiv = document.createElement("div");
      userReplyDiv.setAttribute("class", "reply");
      const iconReplyDiv = document.createElement("div");
      const replyCountDiv = document.createElement("div");
      const replyIcon = document.createElement("i");
      replyIcon.setAttribute("class", "fa-regular fa-comment-dots");
      const replyCount = document.createElement("span");
      replyCount.textContent = `0 reply`;
      const replyCont = document.createElement("div");
      const replyText = document.createElement("p");
      replyText.textContent = `Reply`;

      const deleteDiv = document.createElement("div");
      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "fa-solid fa-trash");

      if (authorId === comment.commented_by._id) {
        deleteIcon.style.display = "block";
      }

      deleteDiv.append(deleteIcon);
      replyCont.append(replyText);
      replyCountDiv.append(replyIcon, replyCount);
      iconReplyDiv.append(replyCountDiv, replyCont);

      const leaveCommentDiv = document.createElement("div");
      leaveCommentDiv.setAttribute("class", "leave-comment");
      const leaveCommentText = document.createElement("p");
      leaveCommentText.textContent = `Leave Reply ...`;
      leaveCommentText.contentEditable = true;
      replyText.addEventListener("click", () => {
        // Find the corresponding "Leave reply" section
        const leaveReplySection = replyText
          .closest(".comment-card")
          .querySelector(".leave-comment");

        // Toggle the display of the "Leave reply" section
        leaveReplySection.style.display =
          leaveReplySection.style.display === "none" ? "block" : "none";
      });
      const replyBtnDiv = document.createElement("div");
      const replyBtn = document.createElement("button");
      replyBtn.textContent = `Reply`;
      replyBtn.setAttribute("id", "reply-btn");

      replyBtn.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `${BASEURL}/comment/reply/${blogId}/comment/${comment._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({ comment: leaveCommentText.textContent }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const updatedReplies = await fetchRepliesForComment(comment._id);
            renderReplies(updatedReplies);
            console.log(data, "success");
          }
        } catch (error) {
          console.log(error);
        }
      });

      const replies = await fetchRepliesForComment(comment._id);
      const allRepliesDiv = document.createElement("div");
      allRepliesDiv.setAttribute("class", "main-reply");

      async function renderReplies(replies) {
        if (Array.isArray(replies) && replies.length > 0) {
          replyCount.textContent = `${replies.length} replies`;
          allRepliesDiv.style.display = "block";
          allRepliesDiv.innerHTML = null;
          replies.forEach((reply) => {
            const replyuserDetailsCont = document.createElement("div");
            const replyuserDetails = document.createElement("div");
            const replyUser = document.createElement("div");
            const replyuserimg = document.createElement("img");
            replyuserimg.src = reply.commented_by.personal_info.profile_img;
            const replyUserName = document.createElement("span");
            replyUserName.textContent = `${reply.commented_by.personal_info.fullname}@${reply.commented_by.personal_info.username}`;
            const replyUserReplyText = document.createElement("p");

            replyUserReplyText.textContent = reply.comment;
            replyUser.append(replyuserimg);
            replyuserDetails.append(replyUser, replyUserName);
            replyuserDetailsCont.append(replyuserDetails, replyUserReplyText);
            allRepliesDiv.append(replyuserDetailsCont);
          });
        } else {
          allRepliesDiv.style.display = "none";
        }
      }

      renderReplies(replies);

      replyBtnDiv.append(replyBtn);
      leaveCommentDiv.append(leaveCommentText);
      userReplyDiv.append(iconReplyDiv, deleteDiv);
      commentdiv.append(commentdivimg, commentUserName);
      commentcard.append(
        commentdiv,
        userCommnetDiv,
        userReplyDiv,
        leaveCommentDiv,
        replyBtnDiv,
        allRepliesDiv
      );

      commentContainer.append(commentcard);
    });
  } catch (error) {
    console.log(error);
  }
};

async function getAllComment() {
  try {
    const response = await fetch(`${BASEURL}/comment/getallcomment/${blogId}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    const sortedComments = data.comments.sort(
      (a, b) => new Date(b.commentedAt) - new Date(a.commentedAt)
    );
    displayBlogComment(sortedComments, data.authorId, blogId);
    // console.log(sortedComments);
  } catch (error) {
    console.log(error);
  }
}
getAllComment();

const fetchRepliesForComment = async (commentId) => {
  try {
    const response = await fetch(
      `${BASEURL}/comment/getallreplies/${commentId}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      return data.replies; // Assuming your server returns an array of replies
    } else {
      console.error("Failed to fetch replies");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
