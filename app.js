// nav bar first page 
const navIconFirstPage = document.querySelector('.first-page__nav-catalogue-button-img');
const navFirstPage = document.querySelector('.first-page__nav-catalogue-list'); 
const iconXNavFirstPage = document.querySelector('.first-page__nav-catalogue-item-link-icon');
iconXNavFirstPage.addEventListener('click', function(){
  navFirstPage.classList.remove('first-page__nav-catalogue-list-active');
})
document.onclick = function(e) {
  if (navIconFirstPage.contains(e.target)) {
    navFirstPage.classList.add('first-page__nav-catalogue-list-active');
  } else if (!navFirstPage.contains(e.target)) {
    navFirstPage.classList.remove('first-page__nav-catalogue-list-active');
  }
};


// slide first page
document.addEventListener('DOMContentLoaded', function() {
    const firstPageSlides = document.querySelectorAll('.first-page__slider-item');
    const firstPreButton = document.querySelector('.second-page__header-button-left');
    const firstNextButton = document.querySelector('.second-page__header-button-right');
    const firstPageNumber = document.querySelector('.second-page__header-button-pagination-page-number');
    const firstPageTotalSlides = document.querySelector('.second-page__header-button-pagination-total-page-number');
    let isFirstPageShowSlide = true;
    let firstPageCurrentIndex = 0;

    firstPageShowSlide(firstPageCurrentIndex);

    firstPreButton.addEventListener('click', function() {
      firstPageCurrentIndex--;
      if (firstPageCurrentIndex < 0) {
        firstPageCurrentIndex = firstPageSlides.length - 1;
      }
      firstPageShowSlide(firstPageCurrentIndex);
    });
  
    firstNextButton.addEventListener('click', function() {
      firstPageCurrentIndex++;
      if (firstPageCurrentIndex >= firstPageSlides.length) {
        firstPageCurrentIndex = 0;
      }
      firstPageShowSlide(firstPageCurrentIndex);
    });
  
    function firstPageShowSlide(index) {
      for (let i = 0; i < firstPageSlides.length; i++) {
        firstPageSlides[i].style.display = 'none';
      }
      firstPageNumber.textContent = index + 1;
      firstPageTotalSlides.textContent = firstPageSlides.length;
      if (isFirstPageShowSlide) {
        firstPageSlides[index].style.display = 'block';
        isFirstPageShowSlide = false;
      } else {
        
        firstPageSlides[index].style.display = 'block';
        firstPageSlides[index].style.animation = 'fadeInAnimation 2s linear';
      }
    }
});


// run video second page
document.addEventListener('DOMContentLoaded', function() {
  const secondPageBackground = document.querySelector('.second-page___body-video-background');
  const secondPageVideo = document.querySelector('.second-page___body-video-src');
  secondPageBackground.addEventListener('click', function() {
    secondPageBackground.style.display = 'none';
    secondPageVideo.style.zIndex = '4';
    secondPageVideo.src = 'https://www.youtube.com/embed/h4Bq69HfR0Y?autoplay=1&loop=1&autopause=0&muted=1';
  });
});


// slick slide third page
$(document).ready(function(){
  $('.third-page__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      draggable: true,
      dots: true,
      autoplay: true,
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        }
        
      ]
  });
});


///  *** load more four page
let fourPagePortfolioData;
let fourPageVisibleItems = 2;
// lấy dữ liệu
async function fourPageFetchData() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    fourPagePortfolioData = data;
    fourPageRenderProjects(data.slice(0, fourPageVisibleItems));
  } catch (error) {
    console.log('Error:', error);
  }
}
fourPageFetchData();
// Lấy danh sách các danh mục
const fourPageCategoryLinks = document.querySelectorAll('.four-page__body-category-link');
fourPageCategoryLinks.forEach((link) => {
  link.addEventListener('click', fourPageHandleCategoryClick);
});
// Hàm xử lý khi click vào danh mục
function fourPageHandleCategoryClick(event) {
  fourPageCategoryLinks.forEach((link) => {
    link.classList.remove('four-page__body-category-item-active');
  });
  event.target.classList.add('four-page__body-category-item-active');
  const fourPageDataCategory = event.target.getAttribute('data-category');
  fourPageFilterData(fourPageDataCategory);
}
// lọc danh sách item
function fourPageFilterData(category) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; 
  container.setAttribute('data-category', category); 
  const filteredItems = fourPagePortfolioData.filter(item => {
    if (category === 'All') {
      return true; 
    } else {
      return item.portfolio === category; 
    }
  });
  fourPageVisibleItems = 2; 
  fourPageRenderProjects(filteredItems.slice(0, fourPageVisibleItems)); 
  updateLoadMoreButton(filteredItems.length, category); 
}
// render dữ liệu
function fourPageRenderProjects(items) {
  const container = document.getElementById('data-container');
  items.forEach(
    item => {
    console.log(item.portfolio);
    const projectDiv = document.createElement('div');
    projectDiv.className = 'four-page__body-panner-design';
    projectDiv.style.backgroundColor = item.color;
  
    const portfolioDiv = document.createElement('div');
    portfolioDiv.className = 'four-page__body-panner-design-tag';
    portfolioDiv.textContent = item.portfolio;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'four-page__body-panner-design-content';
    descriptionDiv.textContent = item.description;

    let contentDiv =""; 
    if (item.portfolio == "DESIGN" || item.portfolio == "DEVELOPMENT") {
      contentDiv = document.createElement('img');
      contentDiv.className = "four-page__body-panner-design-img-dog";
      contentDiv.src = item.content;
    } else {
      contentDiv = document.createElement('img');
      contentDiv.className = "four-page__body-panner-design-img";
      contentDiv.src = item.content;
    }
    

    projectDiv.appendChild(portfolioDiv);
    projectDiv.appendChild(descriptionDiv);
    projectDiv.appendChild(contentDiv);
    container.appendChild(projectDiv);
    }
  );
}
// load more item
function updateLoadMoreButton(totalItems, category) {
  const fourPageLoadMoreContainer = document.getElementById('load-more-container');
  if (fourPageVisibleItems >= totalItems || (category !== 'All' && fourPageVisibleItems >= fourPagePortfolioData.filter(item => item.portfolio === category).length)) {
    fourPageLoadMoreContainer.style.display = 'none';
  } else {
    fourPageLoadMoreContainer.style.display = 'block';
  }
}
document.getElementById('load-more-container').addEventListener('click', function() {
  const container = document.getElementById('data-container');
  const category = container.getAttribute('data-category');
  let filteredItems;
  if (category === 'All') {
    filteredItems = fourPagePortfolioData.slice(fourPageVisibleItems, fourPageVisibleItems + 2);
  } else {
    const filteredCategoryItems = fourPagePortfolioData.filter(item => item.portfolio === category);
    filteredItems = filteredCategoryItems.slice(fourPageVisibleItems, fourPageVisibleItems + 2);
  }
  fourPageRenderProjects(filteredItems);
  fourPageVisibleItems += 2;
  updateLoadMoreButton(fourPagePortfolioData.length, category);
});
// select responsive
let fourPageCategorySelect = document.getElementById("categorySelect");
fourPageCategorySelect.addEventListener("change", function() {
    let selectedCategory = fourPageCategorySelect.value;
    fourPageFilterData(selectedCategory);
});
window.addEventListener('DOMContentLoaded', function() {
  fourPageFilterData('All');
});


// slide five page
document.querySelector('.five-page__body-button-click-left').onclick = function(){
  const fivePageSlide = document.querySelector('.five-page__header-slider');
  const fivePageFirstItem = fivePageSlide.querySelector('.five-page__header-slider-article:first-child');
  fivePageSlide.appendChild(fivePageFirstItem);
}
document.querySelector('.five-page__body-button-click-right').onclick = function(){
  const fivePageSlide = document.querySelector('.five-page__header-slider');
  const fivePageLastItem = fivePageSlide.querySelector('.five-page__header-slider-article:last-child');
  fivePageSlide.prepend(fivePageLastItem);
}


//scroll to top
document.querySelector('.scroll-to-top').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});
window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  var scrollToTop = document.querySelector('.scroll-to-top');
  if (window.scrollY > header.offsetHeight) {
    scrollToTop.classList.add('scroll-to-top-show');
  } else {
    scrollToTop.classList.remove('scroll-to-top-show');
  }
});




