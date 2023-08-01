import Carousel from "@/components/Carousel";
import { MovieData } from "@/types/types";

type Props = {
  trending : MovieData
};

const Trending = ({ trending }: Props) => {
  return (
    <section className="w-5/6">
      <h2 className="mb-6 text-2xl font-bold">Trending</h2>
      <Carousel movieData={trending} />
    </section>
  );
};

export default Trending;
