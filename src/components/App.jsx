import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import LoadMore from 'components/Button/Button';
import { fetchData } from 'components/Services/pixabayAPI';
import css from 'components/App.module.css';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetchData(query, page)
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowLoadMore(page < Math.ceil(data.totalHits / 12));
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [query, page]);

  const getValue = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const onLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={getValue} />
      <ImageGallery data={images} />
      {loading && <Loader />}
      {!loading && showLoadMore && <LoadMore onLoad={onLoad} />}
    </div>
  );
};

export { App };