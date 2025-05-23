
import AllRooms from "./componets/AllRooms";
import BannerSection from "./componets/BannerSection";
import NumberTicker from "./componets/NumberTicker";
import Section1 from "./componets/Section1";
import Section2 from "./componets/Section2";
import Section3 from "./componets/Section3";
import Section4 from "./componets/Section4";

export default function Home() {
  return (
    <div className=" <BannerSection></BannerSection>">
      <BannerSection></BannerSection>
      <Section4></Section4>
      <AllRooms></AllRooms>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <NumberTicker></NumberTicker>
    </div>
  );
}
