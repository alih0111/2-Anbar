import Storage from "./storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn=document.getElementById('toggle-add-category')
const categoryWrapper=document.querySelector('#category-wrapper')

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener('click',e=>this.toggleAddCategory(e))
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    console.log(title);
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.savedCategories({ title, description });
    this.categories = Storage.getAllCategories();
    // update DOM
    this.createCategoriesList();
    categoryDescription.value = "";
    categoryTitle.value = "";
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option value="" class="bg-slate-500 text-slate-300">
    select a category
  </option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>
    ${element.title}
  </option>`;
  console.log(element.id);
    });
    const categoryDom = document.getElementById("product-category");
    categoryDom.innerHTML = result;
  }
  toggleAddCategory(e){
    categoryWrapper.classList.remove('hidden')
    toggleAddCategoryBtn.classList.add('hidden')
  }
}

export default new CategoryView();
