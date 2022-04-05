import useImage from "use-image";
import { Image } from "react-konva";

function Map({ url }) {
  const [image] = useImage(url);

  return <Image image={image} width={590} height={280} />;
}

export default Map;
