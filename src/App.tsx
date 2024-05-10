import "./App.css";
import { useState, useEffect } from "react";
import { getPhotos } from "./Services/API";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery, { ImageId } from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

export type ImageSrc = {
  src: string;
  description: string;
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [photos, setPhotos] = useState<ImageId[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageSrc>({
    src: "",
    description: "",
  });

  useEffect(() => {
    if (!query) return;

    async function fetchPhotos() {
      try {
        setIsLoading(true);
        const data = await getPhotos<{
          total_pages: number;
          results: ImageId[];
        }>(query, page);
        setTotalPages(data.total_pages);

        if (data.results.length > 0) setPhotos((p) => [...p, ...data.results]);
        else toast.error("There are no results with such search!");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos();
  }, [page, query]);

  function handleQuery(resQuery: string) {
    setQuery(resQuery);
    setPage(1);
    setError(null);
    setPhotos([]);
    setTotalPages(0);
  }

  function handleLoadMore() {
    setPage((p) => p + 1);
  }

  function handleModal(state: boolean, photo: ImageSrc): void {
    setIsModalOpen(state);
    if (state) setSelectedPhoto(photo);
  }

  return (
    <>
      <SearchBar onSubmit={handleQuery} isLoading={isLoading} />
      <div className="container">
        {photos.length > 0 && !error && (
          <ImageGallery photos={photos} onSelect={handleModal} />
        )}
        {totalPages > page && !isLoading && !error && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={false}>
            Load More
          </LoadMoreBtn>
        )}
        {error && <ErrorMessage />}
        {isLoading && !error && <Loader />}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        photo={selectedPhoto}
        onChange={handleModal}
      />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
