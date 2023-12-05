import Card from "../components/Card";

const NoPage = () => {
  const numberCards = 6; // jumlah kartu muncul

  return (
    <>
      <h1>404</h1>;
      {/* <h1 className="text-6xl mb-4 font-public-sans font-semibold text-slate-950">Anymelist</h1> */}
      <div className="grid grid-rows-2 grid-flow-col gap-4 mb-4">
        {Array.from({ length: numberCards }).map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </>
  );
};

export default NoPage;
