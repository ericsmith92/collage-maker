const searchForm = document.getElementById('search-handle');
import { addLoader } from './loader';
import unsplash from '../api/unsplash';

const submitSearch = (e) => {

    e.preventDefault();
    const term = document.getElementById('search').value;
      
      unsplash.get(`/search/photos`, {
        params: { 
          query: term, 
          orientation: 'squarish', 
          per_page: 12
        }
      })
      .then(res => {
        if(res.data.results.length === 12){
          addLoader();
          const encodedImageSources = res.data.results.map( result => encodeURIComponent(result.urls.regular)).join();
          window.location.assign(`/preview?term=${term}&srcs=${encodedImageSources}`);
          console.log(res.data.results);
        }else{
          const searchError = document.querySelector('.search-error');
          searchError.innerText = 'insufficient results, try another term';
        }
      })
      .catch(error => {
        console.error(error);
      });
     
}

export { searchForm, submitSearch };
