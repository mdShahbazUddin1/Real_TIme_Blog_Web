const mainBlogContainer = document.querySelector(".main-blog-container");
 const drawer = document.querySelector(".right-drawer");
 const closeBtn = document.querySelector(".fa-x");
 const responseCount  = document.querySelector(".res");
 const userImage  = document.querySelector(".main-image");
 const userFullname = document.querySelector(".comment-username");
 const commentInput = document.querySelector(".write-thought");
 const commentBtn = document.getElementById("res-btn");

//  ------------------------------------------
const BASEURL = `http://localhost:8080`
// ----------------------------------------------

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");


closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});

const getBlogById = async()=>{
    try {
        const response = await fetch(`${BASEURL}/blog/getblog/${blogId}`,{
            method:"GET",
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        const data = await response.json()
        displayBlog(data);
     
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

getBlogById()

const displayBlog = async (data)=>{
     mainBlogContainer.innerHTML = null;
       userImage.src = data.author.personal_info.profile_img;
    userFullname.textContent = `${data.author.personal_info.fullname}@${data.author.personal_info.username}`
    responseCount.textContent = `Response ${data.activity.total_likes}`
   
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
        likeIcon.setAttribute("class","fa-solid fa-hands-clapping");

        // Create span for like count
        const likeCountSpan = document.createElement("span");
        likeCountSpan.textContent = data.activity.total_likes;

        likeDiv.append(likeIcon,likeCountSpan)

        // Create comment icon
        const commentDiv = document.createElement("div");
        const commentIcon = document.createElement("i");
        commentIcon.setAttribute( "class","fa-regular fa-comments");

        // Create span for comment count
        const commentCountSpan = document.createElement("span");
        commentCountSpan.textContent = data.activity.total_comments;
        commentDiv.addEventListener("click",()=>{
           
              drawer.classList.toggle("open");
             
        })

        commentDiv.append(commentIcon,commentCountSpan)

        // Append like and comment elements to like-comment
  
        likeComment.append(likeDiv,commentDiv);
     

        // Create share-listen
        const shareListen = document.createElement("div");
        shareListen.classList.add("share-listen");

        // Create listen icon
        const listeinDiv = document.createElement("div");
        const listenIcon = document.createElement("i");
        listenIcon.classList.add("fa-regular", "fa-circle-play");
        listeinDiv.append(listenIcon)

        // Create share icon
        const shareDiv = document.createElement("div");
        const shareIcon = document.createElement("i");
        shareIcon.classList.add("fa-solid", "fa-share-nodes");
        shareDiv.append(shareIcon)

        // Append listen and share icons to share-listen
        shareListen.append(listeinDiv,shareDiv);
     

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
        blogImageElement.src =data.banner
        blogImageElement.alt = "";

        // Append blog image element to blogImage
        blogImage.appendChild(blogImageElement);

        // Create blog-content
        const blogContent = document.createElement("div");
        blogContent.classList.add("blog-content");

        // Create p element for blog content
        const blogContentP = document.createElement("p");
        blogContentP.textContent =data.content[0]

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
    console.log(error)
}
}

const createComment = async(data)=>{
    try {
        const response = await fetch(`${BASEURL}/comment/create/${blogId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            const data = await response.json()
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

commentBtn.addEventListener("click",(e)=>{
    e.preventDefault()

    let commentValue = commentInput.textContent
    let userComment = {
       comment:commentValue 
    }
    createComment(userComment)
    
})






