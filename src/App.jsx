import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import * as API from './services/images-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState({ url: null, alt: '' });

  useEffect(() => {
    if (!query) {
      return;
    }
    (async () => {
      setStatus(Status.PENDING);
      API.searchParams.q = query;
      API.searchParams.page = page;
      try {
        const { totalHits, hits } = await API.getImages(API.searchParams);
        if (page === 1) {
          toast.success(`We found ${totalHits} pictures for you!`);
        }
        if (totalHits) {
          setImages(images => [...images, ...hits]);
          setTotalHits(totalHits);
          setStatus(Status.RESOLVED);
        } else {
          setImages([]);
          setTotalHits(0);
          setStatus(Status.REJECTED);
          toast.error('Sorry, no images for your request.');
        }
      } catch (error) {
        setImages([]);
        setTotalHits(0);
        setStatus(Status.REJECTED);
        toast.error(`${error}`);
      }
    })();
  }, [query, page]);

  useEffect(() => {
    window.scrollBy({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  const handleFormSearch = query => {
    if (!query) {
      setImages([]);
      setStatus(Status.REJECTED);
      setTotalHits(0);
      toast.warning('Please enter your request!');
    }
    setQuery(query);
    setPage(1);
    setTotalHits(0);
    setImages([]);
  };

  const handleClickLoadMore = () => setPage(page => page + 1);

  const handleToggleModal = e => {
    setShowModal(prevState => !showModal);
    if (!showModal) {
      setImageData({ url: e.target.dataset.source, alt: e.target.alt });
    }
  };
  return (
    <>
      <Searchbar onSearch={handleFormSearch} totalHits={totalHits} />
      <ToastContainer autoClose={3000} />
      {status === 'pending' && <Loader />}
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={handleToggleModal} />
      )}
      {images.length >= API.searchParams.per_page && (
        <Button onClick={handleClickLoadMore} />
      )}
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <img src={imageData.url} alt={imageData.alt} />
        </Modal>
      )}
    </>
  );
};
