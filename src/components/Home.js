import TodayCoin from "./TodayCoin";

const Home = ({ openModal }) => {
  return (
    <div>
      <TodayCoin openModal={openModal}></TodayCoin>
    </div>
  );
};

export default Home;
