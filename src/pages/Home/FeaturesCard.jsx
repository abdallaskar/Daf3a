function FeaturesCard({ icon, title, description }) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full icon-container ">
          {icon}
        </div>
        <h3 className="font-poppins text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-base text-secondary">{description}</p>
      </div>
    </>
  );
}

export default FeaturesCard;
