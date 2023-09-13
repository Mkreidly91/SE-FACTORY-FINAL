import companyHero from '../../assets/images/common/company-home.png';
import Button from '../../components/Common/Button';
import Navbar from '../../components/Navbar';

const CompanyHome = () => {
  return (
    <>
      <section className="hero h-[100vh] relative ">
        <Navbar className="absolute top-0  w-full" />
        <img
          src={companyHero}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />
        <div className="hero-text flex flex-col items-center justify-center w-full h-full  gap-10 z-10 text-white relative ">
          <span className=" text-6xl text-center font-semibold max-w-[800px]">
            Showcase Your Construction Projects with Immersive 3D Tours
          </span>
          <Button
            text="Get Started"
            className="button-gradient px-10 py-5 rounded-xl text-xl font-light"
          />
        </div>
      </section>
      <section className="hero h-[100vh] relative p-5 ">
        <div className="clients flex flex-col text-gray-600">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className=" text-3xl font-semibold">Our Clients</span>
            <span className="">
              We have been working with some fortune 500 clients
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyHome;
