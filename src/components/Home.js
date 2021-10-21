import TodayCoin from "./TodayCoin";

const Home = ({ openModal, user }) => {
  return (
    <div>
      <TodayCoin openModal={openModal} user={user}></TodayCoin>
    </div>
  );
};

export default Home;
