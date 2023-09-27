import ImageCard from "./components/ImageCard";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=39686504-97c695a506efe802194c0a0c8&q=${term}&image_type=photo&pretty=true1`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  let loadingText = (
    <h1 className="mt-64 text-center text-gray-600 text-6xl">Loading</h1>
  );

  const termChange = (text) => {
    setTerm(text);
  };

 let content = '';

  if (images.length === 0) {
    content = (
      <p className="text-2xl text-center mt-72 font-mono">
        No Images Found with your query "{term}"
      </p>
    );
  }





  return (
    <div className="container mx-auto">
      <SearchBar searchText={termChange} />
      {isLoading ? (
        loadingText
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {images.map((image) => (
            <ImageCard image={image} key={image.id} />
            
          ))}
        </div>
      )}
   {!isLoading ? content : ""}
    
    </div>
  );
}

export default App;
