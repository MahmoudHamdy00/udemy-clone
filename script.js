let courseContainer = document.getElementsByClassName("courses-cards")[0];
let getCourses = async (search) => {
  let response = await fetch("http://localhost:3000/courses");
  let data = await response.json();
  if (search) {
    search = search.toLowerCase();
    let newData = [];
    data.forEach((cur) => {
      title = cur.title.toLowerCase();
      if (title.search(search) != -1) newData.push(cur);
    });
    data = newData;
  }
  return data;
};
function displayCourses(searchWord) {
  getCourses(searchWord).then((courses) => {
    courseContainer.innerHTML = "";

    //why this don't work??
    /* courseContainer.childNodes.forEach((element) => {
    element.remove();
  });*/

    courses.forEach((element) => {
      let course = document.createElement("div");
      course.classList.add("course-card");

      //add image
      let imgDiv = document.createElement("div");
      let img = document.createElement("img");
      img.src = element.img;
      imgDiv.appendChild(img);

      //add details
      let detailsDiv = document.createElement("div");
      //set course title
      let title = document.createElement("h3");
      title.textContent = element.title;
      detailsDiv.appendChild(title);

      //set course creator
      let createdBy = document.createElement("p");
      createdBy.textContent = element.createdBy;
      detailsDiv.appendChild(createdBy);

      //append the image and the details to the course card
      course.appendChild(imgDiv);
      course.appendChild(detailsDiv);

      //add current course to courses container
      courseContainer.appendChild(course);
    });
  });
}
displayCourses();
let searchInput = document.getElementById("searchQuery");
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  displayCourses(searchInput.value);
});
